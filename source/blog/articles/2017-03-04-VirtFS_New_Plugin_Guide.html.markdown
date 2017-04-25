---
title: VirtFS New Plugin Guide
date: 2017-03-04
tags: virtfs, filesystems
---

Having recently extracted much of the FS interface from <a href="https://github.com/ManageIQ/manageiq/">MiQ</a> into <a href="https://github.com/ManageIQ/virtfs">virtfs</a> plugins, it was a good time to write a <a href="https://github.com/ManageIQ/virtfs/wiki/New-Plugin">guide</a> on how to write a new plugin from scratch. It is attached below.

<hr/>

This document details the process of writing a new VirtFS plugin from scratch.

Plugins may be written for many targets, from traditional filesystems (<a href="https://en.wikipedia.org/wiki/Extended_file_system">EXT</a>, <a href="https://en.wikipedia.org/wiki/File_Allocation_Table">FAT</a>, <a href="https://en.wikipedia.org/wiki/XFS">XFS</a>), to filesystem-like entities, such as databases and object repositories, to things completely unrelated all together. Once written, VirtFS will use the plugin to expose the underlying component via the Ruby Filesystem API. Simply issue File & Dir calls to files under the specified mountpoint, and VirtFS will take care of the remaining details.

This guide assumes basic familiarity with the Ruby language and <a href="http://guides.rubygems.org/specification-reference/">gem</a> project format, in this tutorial we will be creating a new gem called virtfs-hellofs for our 'hello' filesystem, based on a simple <a href="http://jsonlint.com/">JSON</a> map.

Note, the end result can be seen at <a href="https://github.com/movitto/virtfs-hellofs">virtfs-hellofs</a>

<hr/>
<h2>Initial Project Layout</h2>

Create a new working directory with the following contents:

```
  virtfs-hellofs/
                 lib/
                     virtfs-hellofs.rb
                     virtfs/
                            hellofs.rb
                            hellofs/
                                    fs/
                                    version.rb
                 virtfs-hellofs.gemspec
                 Gemfile
```

<b>TODO</b>: a generator [patches are welcome!]

<hr/>
<h2>Required Components</h2>

The following components are required to define a full-fledged filesystem plugin:

- A '<b>mounting</b>' mechanism - Allows VirtFS to load your FS at the specified filesystem path / mountpoint.

- <b>Core File and Dir</b> classes and class methods - VirtFS maps standard Ruby FS operations to their equivalent plugin calls

- FS <b>specific representations</b> - the internal representation of filesystem constructs being implemented so as to satisfy the core class calls


Upon instantiation, a fs-specific 'blocklike device' is often required so as to provide block-level seek/read/write operations (such as from a physical disk, disk image, or other).

Eventually this will be implemented via a separate abstraction hierarchy, but for the time being <a href="https://github.com/ManageIQ/virt_disk">virt-disk</a> provides basic functionality to read simple file-based "devices". Since we are only using a simply in-memory JSON based fs, we do not need to pull in virt_disk here.

<hr/>
<h2>Core functionality</h2>

First we will define the FS class providing our filesystem interface:

<h3>lib/virtfs/hellofs/fs.rb</h3>

```ruby
  module VirtFS::HelloFS
    class FS
      include DirClassMethods
      include FileClassMethods

      attr_accessor :mount_point, :superblock

      # Return bool indicating if device contains
      # a HelloFS instance
      def self.match?(device)
        begin
          Superblock.new(self, device)
          return true
        rescue => err
          return false
        end
      end
  
      # Initialze new HelloFS instance w/ the
      # specified device
      def initialize(device)
        @superblock  = Superblock.new(self, device)
      end
  
      # Return root directory of the filesystem
      def root_dir
        superblock.root_dir
      end
  
      def thin_interface?
        true
      end
  
      def umount
        @mount_point = nil
      end
    end # class FS
  end # module VirtFS::HelloFS
```

Here we see a few things, particularly the inclusion of the Directory and File class methods satisfying the <b>VirtFS API</b> (more on those later) and the instantiation of a HelloFS specific <b>Superblock</b> construct. 

In the <b>#match?</b> method, We verify the superblock of the underlying device matches that required by hellofs and we specify various core callbacks needed by VirtFS (particularly the <b>#unmount</b> and <b>#thin_interface?</b> methods, see <a href="https://github.com/ManageIQ/virtfs/blob/master/README.md">this</a> for more details on thin vs. thick interfaces).

The superblock class for HelloFS is simple, we implement our 'filesystem' through a simple json map, passed into virtfs on instantiation

<h3>lib/virtfs/hellofs/superblock.rb</h3>

```ruby
module VirtFS::HelloFS
  # Top level filesystem construct.
  #
  # In our case, we simply create a new
  # root directory from the HelloFS
  # json hash, but in most cases this
  # would parse / read top level metadata
  class Superblock
    attr_accessor :device

    def initialize(fs, device)
      @fs     = fs
      @device = device
    end

    def root_dir
      Dir.new(self, device)
    end
  end # class SuperBlock
end # module VirtFS::Hello
```

<hr/>
<h2>VirtFS API</h2>

In the previous section the core fs class included two mixins, DirClassMethods and FileClassMethods implementing the VirtFS filesystem interface.

<h3>lib/virtfs/hellofs/fs/dir_class_methods.rb</h3>

```ruby
module VirtFS::HelloFS
  class FS
    # VirtFS Dir API implementation, dispatches
    # calls to underlying HelloFS constructs
    module DirClassMethods
      def dir_delete(p)
      end

      def dir_entries(p)
        dir = get_dir(p)
        return nil if dir.nil?
        dir.glob_names
      end

      def dir_exist?(p)
        begin
          !get_dir(p).nil?
        rescue
          false
        end
      end

      def dir_foreach(p, &block)
        r = get_dir(p).try(:glob_names)
                      .try(:each, &block)
        block.nil? ? r : nil
      end

      def dir_mkdir(p, permissions)
      end

      def dir_new(fs_rel_path, hash_args, _open_path, _cwd)
        get_dir(fs_rel_path)
      end

      private

      def get_dir(p)
        names = p.split(/[\\\/]/)
        names.shift

        dir = get_dir_r(names)
        raise "Directory '#{p}' not found" if dir.nil?
        dir
      end

      def get_dir_r(names)
        return root_dir if names.empty?

        # Check for this path in the cache.
        fname = names.join('/')

        name = names.pop
        pdir = get_dir_r(names)
        return nil if pdir.nil?

        de = pdir.find_entry(name)
        return nil if de.nil?

        Directory.new(self, superblock, de.inode)
      end
    end # module DirClassMethods
  end # class FS
end # module VirtFS::HelloFS
```

This module implements the standard Ruby <b>Dir Class</b> operations including retrieving & modifying directory contents, and checking for file existence.

Particularly noteworthy is the <b>get_dir</b> method which returns the FS specific dir instance.

<h3>lib/virtfs/hellofs/fs/file_class_methods.rb</h3>

```ruby
module VirtFS::HelloFS
  class FS
    # VirtFS file class implemention, dispatches requests
    # to underlying HelloFS constructs
    module FileClassMethods
      def file_atime(p)
      end

      def file_blockdev?(p)
      end

      def file_chardev?(p)
      end

      def file_chmod(permission, p)
        raise "writes not supported"
      end

      def file_chown(owner, group, p)
        raise "writes not supported"
      end

      def file_ctime(p)
      end

      def file_delete(p)
      end

      def file_directory?(p)
        f = get_file(p)
        !f.nil? && f.dir?
      end

      def file_executable?(p)
      end

      def file_executable_real?(p)
      end

      def file_exist?(p)
        !get_file(p).nil?
      end

      def file_file?(p)
        f = get_file(p)
        !f.nil? && f.file?
      end

      def file_ftype(p)
      end

      def file_grpowned?(p)
      end

      def file_identical?(p1, p2)
      end

      def file_lchmod(permission, p)
      end

      def file_lchown(owner, group, p)
      end

      def file_link(p1, p2)
      end

      def file_lstat(p)
      end

      def file_mtime(p)
      end

      def file_owned?(p)
      end

      def file_pipe?(p)
      end

      def file_readable?(p)
      end

      def file_readable_real?(p)
      end

      def file_readlink(p)
      end

      def file_rename(p1, p2)
      end

      def file_setgid?(p)
      end

      def file_setuid?(p)
      end

      def file_size(p)
      end

      def file_socket?(p)
      end

      def file_stat(p)
      end

      def file_sticky?(p)
      end

      def file_symlink(oname, p)
      end

      def file_symlink?(p)
        get_file(p).try(:symlink?)
      end

      def file_truncate(p, len)
      end

      def file_utime(atime, mtime, p)
      end

      def file_world_readable?(p)
      end

      def file_world_writable?(p)
      end

      def file_writable?(p)
      end

      def file_writable_real?(p)
      end

      def file_new(f, parsed_args, _open_path, _cwd)
        file = get_file(f)
        raise Errno::ENOENT, "No such file or directory" if file.nil?
        File.new(file, superblock)
      end

      private

        def get_file(p)
          dir, fname = VfsRealFile.split(p)

          begin
            dir_obj = get_dir(dir)
            dir_entry = dir_obj.nil? ? nil : dir_obj.find_entry(fname)
          rescue RuntimeError
            nil
          end
        end
    end # module FileClassMethods
  end # class FS
end # module VirtFS::HelloFS
```

The FileClassMethods module provides all the FS-specific funcality needed by Ruby to dispatch <b>File Class</b> calls (which contains a larger footprint than Dir, hence the need for more methods here).

Here we see many <b>methods</b> are <b>not yet implemented</b>. This is <b>OK</b> for the purposes of use in VirtFS but note any <b>calls</b> to the corresponding methods on a mounted filesystem <b>will fail</b>.

<hr/>
<h2>File and Dir classes</h2>

The final missing piece of the puzzle is the File and Dir classes. These provide standard interfaces which VirtFS can extract file and dir information.

<h3>lib/virtfs/hello/file.rb</h3>

```ruby
module VirtFS::HelloFS
  # File class representation, responsible for
  # managing corresponding dir_entry attributes
  # and file content.
  #
  # For HelloFS, files are simple in memory strings
  class File
    attr_accessor :superblock, :dir_entry

    def initialize(superblock, dir_entry)
      @sb        = superblock
      @dir_entry = dir_entry
    end

    def to_h
      { :directory? => dir?,
        :file?      => file?,
        :symlink?   => false }
    end

    def dir?
      dir_entry.is_a?(Hash)
    end

    def file?
      dir_entry.is_a?(String)
    end

    def fs
      @sb.fs
    end

    def size
      dir? ? 0 : dir_entry.size
    end

    def close
    end
  end # class File
end # module VirtFS::HelloFS
```

<h3>lib/virtfs/hello/dir.rb</h3>

```ruby
module VirtFS::HelloFS
  # Dir class representation, responsible
  # for managing corresponding dir_entry
  # attributes
  #
  # For HelloFS, dirs are simply nested
  # json maps
  class Dir
    attr_accessor :sb, :dir_entry

    def initialize(sb, dir_entry)
      @sb        = sb
      @dir_entry = dir_entry
    end

    def close
    end

    def glob_names
      dir_entry.keys
    end

    def find_entry(name, type = nil)
      dir = type == :dir
      fle = type == :file

      return nil unless glob_names.include?(name)
      return nil if (dir && !dir_entry[name].is_a?(Hash)) ||
                    (fle && !dir_entry[name].is_a?(String))
      dir ? Dir.new(sb, dir_entry[name]) :
            File.new(sb, dir_entry[name])
    end
  end # class Directory
end # module VirtFS::HelloFS
```

Again these are fairly straightforward, providing access to the underlying JSON map in a filesystem-like manner.

<hr/>
<h2>Polish</h2>

To finish, we'll populate the project components required by every rubygem:

<h3>lib/virtfs-hellofs.rb</h3>

```ruby
require "virtfs/hellofs.rb"
```

<h3>lib/virtfs/hellofs.rb</h3>

```ruby
require "virtfs/hellofs/version"
require_relative 'hellofs/fs.rb'
require_relative 'hellofs/dir'
require_relative 'hellofs/file'
require_relative 'hellofs/superblock'
```

<h3>lib/virtfs/hellofs/version.rb</h3>

```ruby
module VirtFS
  module HelloFS
    VERSION = "0.1.0"
  end
end
```

<h3>virtfs-hellofs.gemspec:</h3>

```ruby
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'virtfs/hellofs/version'

Gem::Specification.new do |spec|
  spec.name          = "virtfs-hellofs"
  spec.version       = VirtFS::HelloFS::VERSION
  spec.authors       = ["Cool Developers"]

  spec.summary       = %q{An HELLO based filesystem module for VirtFS}
  spec.description   = %q{An HELLO based filesystem module for VirtFS}
  spec.homepage      = "https://github.com/ManageIQ/virtfs-hellofs"
  spec.license       = "Apache 2.0"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "activesupport"
  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "factory_girl"
end
```

<h3>Gemfile:</h3>

```ruby
source 'https://rubygems.org'

gem 'virtfs', "~> 0.0.1",
    :git => "https://github.com/ManageIQ/virtfs.git",
    :branch => "master"

# Specify your gem's dependencies in virtfs-hellofs.gemspec
gemspec

group :test do
  gem 'virt_disk', "~> 0.0.1",
      :git => "https://github.com/ManageIQ/virt_disk.git",
      :branch => "initial"
end
```

<h3>Rakefile:</h3>

```ruby
require "bundler/gem_tasks"
require "rspec/core/rake_task"

RSpec::Core::RakeTask.new(:spec)

task :default => :spec
```

<hr/>
<h2>Packaging It Up</h2>

Building virtfs-hellofs.gem is as simple as running:

```ruby
rake build
```

in the project directory.

The gem will be written to the 'pkg' subdir and is ready for subsequent use / upload to rubygems.

<hr/>
<h2>Verification</h2>

To verify the plugin, create a test module which simply mounts a FS instance and dumps the directory contents:

<h3>test.rb</h3>

```ruby
require 'json'
require 'virtfs'
require 'virtfs/hellofs'

PATH = JSON.parse(File.read('hello.fs'))

exit 1 unless VirtFS::HelloFS::FS.match?(PATH)
fs = VirtFS::HelloFS::FS.new(PATH)

VirtFS.mount fs, '/'
puts VirtFS::VDir.entries('/')
```

We can create a simple JSON filesystem for testing purposes:

<h3>hello.fs</h3>

```
{
  "f1" : "foobar",
  "f2" : "barfoo",
  "d1" : { "sf1" : "fignewton",
           "sd1" : { "t" : "s" } }
}
```

Run the script, and if the directory contents are printed, you verified your FS!

<hr/>
<h2>Testing</h2>

<a href="http://rspec.info/">rspec</a> and <a href="https://github.com/thoughtbot/factory_girl">factory_girl</a> were added as development dependencies to the project and testing the new filesystem is as simple as adding new unit tests.

For 'real' filesystems, the plugin author will need to generate a 'blocklike device' image and populate it w/ the necessary test data.

Because large block image files are not condusive to source repository systems and automated build systems, <a href="https://github.com/ManageIQ/virtfs-camcorderfs">virtfs-camcorderfs</a> can be used to record and playback disk interactions in local dev environment, recording text based 'cassettes' which may be used to replicate disk interactions. See virtfs-camcorderfs for usage details.

<hr/>
<h2>Next Steps</h2>

We added barebones basic VirtFS functionality for our hellofs filesystem backend. From here, we can continue expanding upon this, providing read, write, and query support. Once implemented, VirtFS will use this filesystem like every other, providing seamless interchangeabilty!
