---
title: BuildError - package foobar is blocked for tag dist-fXX
date: 2010-03-04
---

Quick Fedora tip (thanks to nirik on #fedora-devel). If you are unorphaning a package and you've made it all the way to <a href="http://fedoraproject.org/wiki/PackageMaintainers/Join#Request_Builds">'make build'</a> each CVS branch you want into import into Fedora, just to get the following error from Koji:

2030661 build (dist-f13-updates-candidate, /cvs/pkgs:rpms/joni/F-13:joni-1_1_3-4_fc13): open (x86-01.phx2.fedoraproject.org) -> FAILED: BuildError: package joni is blocked for tag dist-f13-updates-candidate

You need to <a href="https://fedorahosted.org/rel-eng/newticket">file a bug</a> w/ the release engineering trac system to get your package unblocked. Here is my <a href="https://fedorahosted.org/rel-eng/ticket/3480">joni ticket</a> for example

After it is unblocked, 'make build' should work, and you can submit any updates via bodhi.

Happy hacking!
