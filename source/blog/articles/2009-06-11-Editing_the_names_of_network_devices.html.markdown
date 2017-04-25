---
title: Editing the names of network devices
date: 2009-06-11
---

I've just begun fiddling around w/ udev, the Linux system device mapper, which on startup, maps your devices to filesystem paths that you can then access when booted. The names of these devices can be set by udev rules, and while I'm just beginning to play around with them, I can already tell they're pretty nifty.

The reasoning for my venture into this area is that on a vm I was creating I noticed that the 2nd of three network devices was incorrectly named, eg I had eth0, eth2, and eth0_rename (instead of eth1). Opening up /etc/udev/rules.d/70-persistent-net.rules I found that eth1 was actually listed as eth0, and since any name can't appear twice, it was just renaming it to eth0_rename. Changing it to eth1 and restarting fixed the problem (in this case I also created /etc/sysconfig/network-scripts/ifcfg-eth1 so that the interface would be brought up on startup and configured correctly).

As mentioned, I'm sure I'm barely scratching the surface here, but udev doesn't seem difficult to understand whatsoever yet is very powerful.
