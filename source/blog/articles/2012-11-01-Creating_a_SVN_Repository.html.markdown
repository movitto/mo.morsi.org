---
title: Creating a SVN Repository
date: 2012-11-01
tags: svn
---

As a long time SVN user it is the version control system I know the best (though I am not a fan of any version control 
implementations I've used so far, SVN is just the one I've used the most). I've never setup my own repository before and 
looked into doing so today for various code of my own that I develop locally. All in all it is a simple process, but there are
a few gotchya's that you have to look out for.

<u>Guide</u>
I'm installing a svn repo on my local Fedora 8 laptop. Theoretically these instructions can be applied to any distro but you
will probably have to modify some of the commands and file locations.

1. yum install subversion apache mod_dav_svn   # install subversion, the apache server which will host it (there is a very 
basic 'svnserver' that comes with subversion, but this way is more widespread), and the apache module for svn

2. While we will be creating one repository and multiple projects under it, you can create as many repositories as you like and as many projects under each but you will need to tweak the apache configuration below (I will note the changes when we get there). Run the following command, replacing /tmp with the directory you wish to store the repository (this is to be applied from here on out in these instructions)

```
sudo svnadmin create /tmp/repos/
```

NOTE: The single repository in this case is named 'repos'. This is because when clients access a project they will access it 
by checking out from http://serveruri/repos/projectname. Once again it is possible to create and access multiple repositories 
(one for each project if you wish) and that will involve some tweaking of the apache config below.

3. We will need to allow apache to access this directory, to do so change the owner / permissions of the /tmp/repos directory 
to:

```
chown -R apache.apache /tmp/repos/
```

4. Import your source code. Each project imported should have a 'trunk', 'tags', and 'branches' directory under the project 
root. Since this is the initial version, assumably you don't have any branches or tags and simply have a 'project' source root
directory under the trunk. In essence a project (lets call it "foobar") to be imported into a svn repository should have the 
following directory structure:

```
foobar/
foobar/branches/
foobar/tags/
foobar/trunk/
foobar/trunk/foobar/
foobar/trunk/foobar/docs
foobar/trunk/foobar/src
foobar/trunk/foobar/test
foobar/trunk/foobar/Makefile
.....
```

To import this project into the svn repository simply run the following command in the directory containing the top level 
'foobar' directory:
```
svn import foobar file:///tmp/repos/foobar -m 'Initial import'   #  don't forget to replace /tmp again
```

5. By default yum installs a /etc/httpd/conf.d/subversion.conf config file for you to setup web access to the subversion 
repository. All you need to do is uncomment / alter the following lines in the file:

```
<Location /repos>
   DAV svn
   SVNPath /tmp/repos
   # Feel free to add any additional user or host based access restrictions here 
   #  (such as limiting users who can commit, this will not be covered here)
</Location>
```

If you chose to setup multiple repositories, you will need to alter the 'SVNPath /tmp/repos' directive. Instead use 
'SVNParentPath /tmp' to indicate that the /tmp directories contains multiple repositories. You will still need to specify the 
specific repository you are targeting in the url during a checkout (as well as the specific project in that repository less 
you get them all) but it saves you the hassle of setting up an apache directive for every repo.

6. Now you can view your repository by opening up a web browser and navigating to 'http://localhost/repos/' (remember if you 
used SVNParentPath before you will need to specify the specific repository after 'repos'). There you should see the 'foobar' 
directory and under that the various directories setup earlier. You can check out the 'foobar/trunk/foobar/' code base in the 
repository with the following command:
<pre>svn co http://localhost/repos/foobar/trunk/foobar</pre>
From there users with the necessary permissions can check in and perform the various other SVN operations.

<u>Troubleshooting</u>
1. SELinux: If you have SELinux enabled you will need to run the following command to grant additional privileges to httpd

```
chcon -R -t httpd_sys_content_t stuff
```

<i><b>Thanks go to <a href="http://mikey.com/">Michael Pechner</a> for the tip</b></i>

2. Navigating to 'http://localhost/repos' results in a '403 Forbidden' Error. In the apache error logs, you should see this as well:

```
No such file or directory: The URI does not contain the name of a repository.
```

This indicates that you have used 'SVNParentPath' but did not specify the name of the repository. Apache will not allow anyone 
to view all the repositories it is hosting.

3. Navigating to 'http://localhost/repos/foobar' results in xml being returned with the following message:

```
Could not open the requested SVN filesystem
```

And inspecting the apache error log, we see:

```
(20014)Internal error: Can't open file '/tmp/repos/foobar/format': No such file or directory
```

This indicates you miscorrectly used 'SVNParentPath' to specify a single repository. eg. you specified 'SVNParentPath 
/tmp/repos' in the apache configuration. This is what threw me off initially (and caused me to write this guide when I figured
it out) as once again 'repos' is a single repository which we are simply using to store multiple projects. If you have ruled 
this possibility out, make sure apache has r/w access to all the repository files. 


<u>Resources</u><br/>
1. <a href="http://svnbook.red-bean.com/en/1.4/svn-book.html">http://svnbook.red-bean.com/en/1.4/svn-book.html</a>   -  The Bible for Subversion users / admins. Chapter 2, 5, and 6 contain 
the most useful info for setting up your own repo<br/>
2. <a href="https://support.railsmachine.com/index.php?pg=kb.page&id=42">Good guide to getting things setup</a>
