---
title: Fedora Live DVD Install Command
date: 2008-06-24
---

Earlier today I tried may unsuccessful attempts at installing Fedora 9 on an expiremental developer workstation that has alot of kinks. After upgrading the bios, I booted w/ the F9 live dvd only to find X would not start. I was able to get around this by running the <i>liveinst</i> command to start the installer from the command line, but alas every time I arrived at the "enter root password" screen my keyboard went kaput, and no longer responsed (moving it to another USB socket doesn't help, and since it works up to that point and with my laptop, I have a feeling its either a USB controller issue or more likely an issue w/ X running under the installer). To get around this I simply ran <i>liveinst --text</i> to run the installer in text mode, and had no problems installing after that. Good luck!
