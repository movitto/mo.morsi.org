---
title: Git  n Autobuild
date: 2008-07-14
tags: git
---

So over the last week or so, I've been having a fun time learning all the subtle issues w/ autobuild as I try to setup a nightly build cycle for the oVirt team. Most of the issues stem from the fact that we're primarily developing on a non-master GIT branch and oVirt has quite a few dependencies which makes setting up a consistent build environment tricky. Not only that, but since I'm on a team working on an active project with lots of developers, I can't exactly commit autobuild.sh a million times trying to get it to work (more after the jump). Furthermore, autobuild will refuse to build unless it has checked out source code (regardless of the value of the 'cache' config parameter) thus it was not possible to use autobuild to checkout the source code once, and then modify and build the code without checking out a new copy / overwriting changes. Luckily GIT is a great distributed version control system which allows you to perform clones / pulls from a local filesystem-directory containing a git-repository (eg no setting up httpd or git-daemon needed (not that its hard)). Thus I easily cloned the oVirt repo from where its hosted on git.et.redhat.com, and pointed auto-build to clone and build from my local copy (see the git-clone man page for help with both these tasks). 

After following the <a herf="http://ovirt.org/scmrepo.html">instructions</a> to setup the 'next' branch, I needed to tell auto-build to pull from that branch. This by far was the most subtle annoyance I'd encountered so far, and it took me quite some time to find the solution (which involved digging through the actual auto-build source code). Essentially, you can specify which branch to checkout using the 'path' directive in the 'sources' section under the 'module' you are working on. According to the auto-build.conf man page, the path directive is used to specify the path in the repository from which to perform the checkout, but it does not say that by specifying a colon (':') followed by a branch name it will check out that branch. Thus in my ovirt auto-build.conf I have the repository set to my local ovirt repo directory and the path set to the next branch like so:
 <i>path = :next</i>
(eventually once everything is setup, I'll point the repo server back to git.et.redhat.com and change the path to include the ovirt repo like so <i>path = ovirt:next</i>)

small fix... a few days
Long blog post about it... 15 min
annoying problem solved... priceless :-)
