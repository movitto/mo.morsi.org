---
title: Accessing an encrypted partition
date: 2010-07-06
---

A few months back I wrote an <a href="http://mohammed.morsi.org/blog/?q=node/226">article</a> on how to create and access an encrypted hard drive in Linux. Recently I've been setting up a large external usb drive to store nightly backups and couldn't figure out how to load the unencrypted device /dev/mapper/enc from the encrypted device /dev/sda1 post-boot (eg the usb drive wasn't turned on until the computer was completely started up). Lo and behold the answer was right in front of me, in my very own article, eg. step 3 or running the cryptsetup command:

<i>cryptsetup -c aes-cbc-plain -d /etc/enc-key create enc /dev/sda1</i>

I was under the impression that this altered the drive somehow, but does not in any way, it merely loads the unencrypted partition, from which point the user can mount the filesystem. I suppose a warning should go here, because I presume its possible (tho I have not tried it) to load the encrypted partition with a different key and thus the unencrypted partition will be "illegible", eg. the computer thinking its just random data. Any reads or writes to it will most certainly destroy any stored, encrypted information. 

Anywho, it took me a little while to figure this one out, so I figure it might be useful for anyone else in the same situation.
