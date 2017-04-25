---
title: Messing around with vim
date: 2009-11-06
---

So I've been playing around with vim to try to better my usage of the text editor and have found some very interesting features / plugins and one annoying pitfall which I want to share. 

To start of, I'm no longer using the standard vim app, but rather gvim as I've been looking for better mouse support for a while. I've no need of the toolbar (I like keeping the menus around), and removing it is as simple as adding the following to your ~/.vimrc:

<pre>
set guioptions-=T
</pre>

Using tabs is nice with the gui (albiet also present w/ the regular text version), you can create a new one with :tabnew<CR> and scroll through them with :tabp&lt;CR&gt; and :tabn&lt;CR&gt; also &lt;alt&gt;+&lt;pg up/down&gt; works for scrolling in gvim. 

I've installed the <a href="http://www.vim.org/scripts/script.php?script_id=152">showmarks</a> plugin which is useful for visualizing the line / column markers you have set in the file you are editing. I've just also found the <a href="http://www.vim.org/scripts/script.php?script_id=69">project</a> plugin which I now wonder how I've even lived without it (at one point I was considering writing a standalone app just to do what this plugin does) and makes configuring projects and files like you would in an IDE a cinch (I very much recommend trying it if you use vim, it takes less than an hour to learn / completely setup).

Unfortunately one relatively new feature I wanted to try doesn't work just right in the vim version that currently ships with Fedora. Omni-completion is a very powerful feature of vim that uses ctags to provide code-completion and other functionality to users editing documents. While it comes built in for a wide variety of languages, the Fedora vim version isn't built with the <a href="https://bugzilla.redhat.com/show_bug.cgi?id=503872">necessary flags for ruby support</a> and thus auto-completion doesn't currently work.

If you don't mind building it yourself you can simply follow the following steps:
<ul >
<li style="list-style-type:square;">yum remove vim-common</li>
<li style="list-style-type:square;">yum install rpm-build ruby ruby-devel "perl(ExtUtils::Embed)" libacl-devel gpm-devel libXpm-devel wget # there might be other dependencies, if subsequent steps complain about things missing try to yum install them</li>
<li style="list-style-type:square;">wget http://download.fedora.redhat.com/pub/fedora/linux/development/source/SRPMS/vim-7.2.245-3.fc12.src.rpm</li>
<li style="list-style-type:square;">Add the following line to your .rpmmacros " %_topdir   ~/rpmbuild"</li>
<li style="list-style-type:square;">rpmbuild --rebuild vim-7.2.245-3.fc12.src.rpm</li>
<li style="list-style-type:square;">sudo yum localinstall ~/rpmbuild/RPMS/x86_64/vim-common-7.2.245-3.fc11.x86_64.rpm   ~/rpmbuild/RPMS/x86_64/vim-enhanced-7.2.245-3.fc11.x86_64.rpm   ~/rpmbuild/RPMS/x86_64/vim-X11-7.2.245-3.fc11.x86_64.rpm  --nogpgcheck</li>
</ul>

Now vim / gvim will be installed on your system with ruby omni-completion support.
