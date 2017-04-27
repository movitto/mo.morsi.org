---
title: Installing Fedora 15 on the Thinkpad T520
date: 2011-08-29
tags: fedora, hardware
---

It's been a <a href="http://mo.morsi.org/blog/node/2">while</a> since I've <a href="http://mo.morsi.org/blog/node/210">done</a> a Linux hardware review. Having just got a <a href="http://shop.lenovo.com/us/notebooks/thinkpad/t-series/t520?cid=us|semd|se|google|K111190|Lenovo_T520|IIP_NE_Lenovo_Thinkpad|100004&ne_ppc_id=1019&ne_key_id=11024135&ne_sadid=13715092904">Lenovo Thinkpad T520</a>, figure it's about time for another :-)

Here's the breakdown:

<table border="1">
<tr><td width="33%"><u>Hardware Components</u></td><td width="23%"><u>Status Under Linux</u></td><td width="43%"><u>Notes</u></td></tr>
<tr><td>Intel Core i7 (quad core, x86_64)</td><td>Works</td><td>No special setup needed. Make sure you download the x86_64 dvd/cd's</td></tr>
<tr><td>4GB RAM</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>500GB SATA Hard Drive</td><td>Works</td><td>Had to use install DVD to setup a ext3 for / as ext4 install off LiveCD wasn't working for whatever reason</td></tr>
<tr><td>Touchpad</td><td>Works</td><td>Had to <i>yum install gpointer-device-settings</i> and run it to get Vertical/Horizonal Scrolling Working</td></tr>
<tr><td>Audio</td><td>Works</td><td><No special setup needed/td></tr>
<tr><td>Intel HD Graphics</td><td>Works (external VGA / DVI too)</td><td>No special setup needed</td></tr>
<tr><td>Intel Gigabit Ethernet network card</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Intel Corporation Centrino Ultimate-N 6300 /td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>CD/DVD Reader/Burner</td><td>Works</td><td>No special setup needed</td></tr>
</table>

That's about it, besides the small hickups w/ the root FS and touchpad-scrolling installation went as smooth as possible and everything worked out of the box. Even after I did a pre-install re-partitioning w/ gparted, Windows 7 still boot up as well, so that's an additional plus.

This is my first Thinkpad and it is really looking to be as Linux friendly as everyone says they are.

<a href="http://www.linux-on-laptops.com/"><img src="http://www.linux-on-laptops.com/images/linux-on-laptops.gif" style="width: 100px; height: 36px; border: 0; margin-right: 10px;"/></a><a href="http://tuxmobil.org/"><img src="http://tuxmobil.org/pics/tuxmobil_sticker.png" style="width: 100px; height: 36px; border: 0;"/></a>
