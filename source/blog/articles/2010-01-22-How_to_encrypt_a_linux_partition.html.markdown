---
title: How to encrypt a linux partition.
date: 2010-01-22
---

Essentially the goal for this article is to setup a partition under Linux under which all data that is stored will be encrypted and 'inaccessible' to those without the correct key (course with all the password-cracking software out there today, who knows what really is secure). This is actually a very simple task, with instructions scattered over the Internet, so I just simply consolidated the most useful directions I found into the guide below:

```
Partition Device to encrypt      /dev/sda1
Encrypted-Partition Device       /dev/mapper/enc
Enrypted-filesystem Mount Point  /mnt/enc
```

<u>Guide</u>:

1. umount /dev/sda1
2. dd if=/dev/urandom of=/etc/enc-key bs=1c count=32 
3. make sure /etc/enc-key is only readable by root, you will need this file wherever you want to access the enc filesystem
4. cryptsetup -d /etc/enc-key create enc /dev/sda1 # feel free to alter options to alter cipher, algorithm, etc
5. mkfs.ext3 /dev/mapper/enc
6. mkdir /mnt/enc
7. mount /dev/mapper/enc /mnt/enc
8. edit /etc/crypttab and add:
     "enc   /dev/sda1   /etc/enc-key   cipher=aes"
9. edit /etc/fstab and add: ???
     "/dev/mapper/enc /mnt/enc ext3 defaults 0 0"
10. Copy key to a secure location. Though not technically required, should you loose /etc/enc-key you will not be able to access the data on your partition. To do this, it is recommended copying this file to a secure location, off network, physically locked if possible.

From now out, /mnt/enc will be automounted and any subsequent read / writes to the filesystem will be automatically encrypted / decrypted so long as /etc/enc-key exists and is registered w/ the partition in /etc/crypttab. I'm sure there are a million other ways to do this (it is Linux afterall), some of which are probably more secure, but this is a simply, quick, setup that should get you started in no time.

<u>Resources</u>:

http://www.linuxjournal.com/article/7743

http://www.linux.com/articles/36596
