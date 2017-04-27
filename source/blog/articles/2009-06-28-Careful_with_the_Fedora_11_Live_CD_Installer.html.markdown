---
title: Careful with the Fedora 11 Live CD Installer
date: 2009-06-28
tags: fedora
---

Big fan of Fedora, but have to say I've had some major problems with the disk / partition configuration section of the Fedora 11 installer (F11 was just officially released the other week). I don't have alot of details, but attempting to create a custom layout resulted in an error in the middle of the partitioning process, which resulted in a corrupt drive and all the data on it lost. This happened every time I attempted to create my own custom layout, and the only way I was able to get the installer to complete successfully was to leave it with its default settings (I like to keep things simple, with a few partitions right on the drive, but by default logical volumes are setup, a topic which I have yet to explore).

This was for a machine whose data wasn't critically important so I'm not at a major loss, but I did have a windows partition that got wiped, which will need to be reinstalled (attempting to create a custom layout with some space reserved for windows as the first partition failed as the installer always insisted on putting / and /boot before any vfat partitions).

Also word of warning, if trying to install from the livecd, your root partition MUST be set to ext4 and you MUST have an ext3 boot partition, a pain, but currently the way it is. Good luck!
