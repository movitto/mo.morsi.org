---
title: Announcing Snap!
date: 2007-12-19
tags: snap
---

In my spare time over the last few months, I've been working on a project which I dub 'Snap'. Snap is my attempt at replicating the functionality of 'Windows System Restore' on Linux. As the name indicates, Windows System Restore backs up all the important files, libraries, and registry entries on Windows for future restoration. To accomplish this in Linux, the underlying package management system is used. Snap stores which packages have been installed on the machine, and any files not tracked by the package management system or have been modified since installation.

Included is the Snap library, 'snaptool' the console frontend, and 'gsnap' the gnome gui. Currently only the Yum Package Management system is supported, but Snap supports a simple plugin interface, allowing easy support to work with any distro. 

I hope people try it out and give me good feedback (patches are even better :-D), and I look to maintain it as much as I can in the future. I do have other things to work on (namely my master's thesis which I have been pushing off till now) and since Snap already does what I need it to do (save my packages when upgrading between Fedora versions), I'm not sure how many new features I will add. But thats the beauty of open source, and I'm looking forward to anything anyone contributes

<a href="http://morsi.org/projects/snap">Click here</a> to go to the Snap Project page.
<a href="https://sourceforge.net/projects/snapshotter/">Click here</a> to go to the Snap Sourceforge page where you can download and access the code.
