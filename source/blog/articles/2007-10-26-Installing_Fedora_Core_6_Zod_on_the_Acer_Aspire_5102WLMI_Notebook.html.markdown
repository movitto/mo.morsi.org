---
title: Installing Fedora Core 6 -- Zod -- on the Acer Aspire 5102WLMI Notebook
date: 2007-10-26
---

(Standard Disclamer: I am not responsible for any changes you do to your system and their results/outcomes, follow this guide at your own risk!)

<b>Overview:</b>
Slackware is a great distro. But in reality it is a hobbyists distro, and I find it lacking in some respects to make it an established, widely-supported Linux distribution (smaller community, no default dependency resolving, etc.) Fedora has always been my distro of choice since I've started using it (I've tried Ubuntu, Debian, and Slackware in the meantime) and decided to give it another go. Previously I tried installing Fedora 5 on my laptop, but after the complete install, the system would freeze on launching udev (very early in the boot process). I downloaded the <a href="http://torrent.fedoraproject.org/">Fedora Core 6 (Zod) live cd</a> recently, and am happy to say that the entire system booted flawlesly, with all most all of the hardware fully functioning. After downloading (same site) and burning the Fedora Core 6 (Zod) x86_64 Installation DVD (and realizing after two long failed attempts that the first dvd I burned had a large scratch in it :-/) I succesfully installed and booted into Fedora Core 6. The following details the exact process I used to make the system fully functional. 

<b>General Hardware Specifications:</b>
<table border="1">
<tr><td width="33%"><u>Hardware Components</u></td><td width="23%"><u>Status Under Linux</u></td><td width="43%"><u>Notes</u></td></tr>
<tr><td>AMD Turion 64x2 (64-bit, dual core) CPU</td><td>Works</td><td>No special setup needed. Make sure you download the x86_64 dvd/cd's</td></tr>
<tr><td>512MB DDR2 RAM</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>100GB PATA Hard Drive</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Touchpad</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Speakers/Headphone Jack</td><td>Works</td><td>Small tweak needed, see step 12</td></tr>
<tr><td>ATI Radeon Xpress 1100</td><td>Works</td><td>Enable Livna; Install Driver; Modify xorg.conf; See Step 11</td></tr>
<tr><td>Realtek Ethernet network card</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Atheros Wifi Network Card</td><td>Works</td><td>Enable Livna; yum install madwifi; Select the right Kernel on Boot; See Step 10</td></tr>
<tr><td>CD/DVD Reader/Burner</td><td>Still Testing</td><td></td></tr>
<tr><td>USB Port</td><td>No special setup needed</td><td></td></tr>
<tr><td>Card Reader</td><td>Still Testing</td><td></td></tr>
</table>

<b>Steps I performed to get Fedora Core 6 --Zod-- Working:</b>
1. I had previously repartitioned the default hard drive layout to install Slackware, reinstalled Windows XP, and made a Windows Backup Disk. Please do this. It never hurts to be safe. See <a href="http://mohammed.morsi.org/blog/?q=node/2">this</a> for more information. All in all my hard drive layout looks like:
* /dev/hda1 20GB vfat for Windows XP
* /dev/hda2 20GB ext3 for Slackware
* /dev/hda3 1GB swap (yea this is probably alot bigger than I need but w/e)
* /dev/hda4 55GB vfat for shared documents and data

2. Toss the Fedora DVD in. I recommend letting the installer verify the DVD. It only takes 20 minutes, and would have saved me 2-3 hours as my original DVD had a scratch and was corrupted.

3. I selected the default language and keyboard (english for both).

4. At the Hard Drive Partitioning screen, I opted to create a custom layout from the pull down menu and clicked next. On the following screen, I selected partitions 1,2,4 clicked the "edit" button, and changed the following settings:
* /dev/hda1 - mounted at /mnt/winxp
* /dev/hda2 - mounted at / and formatted to ext3 (getting rid of slack)
* /dev/hda4 - mounted at /mnt/shared
Clicking next will prompt you to verify that you want to format /dev/hda2. Click yes.

5. I left the GRUB settings with their default values (will install GRUB over the mbr), but changed the name of the "other" operating system to "Windows XP"

6. Plug a ethernet cable from your router/switch/wall outlet into your laptop and leave the default settings as is on the Network Devices screen. Wifi doesn't work out of the box, and we will need to get it working later (see below). 

7. Select your timezone and root password on the next few screens. On the next screen select the appropriate software categories for you and enable Fedora Extras (internet connection required). I did not opt to customize my software now, I will use yum to install everything from the repo's. Click next (and next again after a minute) and wait (about 45 min) for all the software to install (if it freezes here, like it did for me, your installation DVD/cd is corrupted and you need to reburn. I told you to test it! :-/)

8. Its installed! Take out the DVD and hit restart when prompted. The next few config screens as self explanitory. The only major change I made was to disable SeLinux completely (I have no use for it), which required a restart. Upon the next boot you will be able to login!

Note: Make sure Windows XP boots as well. If you followed my instructions, I'm sure it will.
Note: Make sure to boot with your ethernet cable plugged in. The process will stall at starting xend until you have an internet connection. I am not yet sure if it is safe to disable the virtualization daemon.
Note: You might also want to disable the yum-updatesd service (eg. run "service yum-updatesd stop"). The version that comes with Fedora 6 eats up memory (not sure if its a leak or if it just does that), consuming 20% of my 512MB of memory (resulting in lots of paging and poor disk performance). 

9. Upon booting up, I immediately installed the yum fastest mirror plugin (written by my fellow RedHat intern Luke), by running "yum install yum-fastestmirror". After that was done, I ran "yum update -y" to update all the packages in the system to their latest version. This process will take a little while, so you might want to start it before you goto sleep (make sure you have a cooling pad or fan blowing on your computer as this laptop tends to get hot), or when you have a several hours to spare. 

10. Restart you computer for good measure and enable the livna yum repository. This is a very simple procedure, and http://rpm.livna.org/ has all the info you need. Afterwards, run the following command to install the atheros wifi driver "yum install madwifi". The madwifi driver depends on a non-xen kernel (probably nothing in the xen kernel preventing atheros from working, but it prob is not configured) which it will download. Virtualization with Xen is not an issue for me (I will use Vmware to boot into windows while running linux, blog about it coming soon), so I set the new one to be default in my /boot/grub/menu.lst before rebooting. I also enabled the NetworkManager service (System Menu > Admin > Services > Check "Newtork Manager" and Save) to handle my network connections and disabled wifi from being initialized on bootup, before I can enter the WPA key or my gnome keyring password (System Menu > Admin > Network > Select "wifi0" > click "edit" > uncheck "activate at boot" > save). Restart and you can access wifi as soon as you login and connect to a network! 

11. Install the proprietary ati graphics driver by running: "yum install xorg-x11-drv-fglrx". Since Fedora ships with Compiz by default, you will need to modify your /etc/X11/xorg.conf file (as root) by changing the following:
*In the Section "Module" add
Load "glx"
Load "dri"
*In the Section "Extensions" add
Option "Composite" "Disable"

After saving you will need to log out / kill X with ctrl-alt-backspace, and log in again. Of course this will mean you can't use compiz/beryl, but you can play around with them by commenting out the Disable Composite line. I have yet to get Compiz (shipped with Fedora by default) working, possibly because there are issues with some ATI cards/chips. One annoying thing that I notice is that unless Composite is enabled, eg. fglrx disabled, whenever I minimize a window or use alt-tab to select another, the currently selected window goes black. I believe that this is some buggy compiz feature that isn't disabled when compiz is. Its annoying, but I can live with it for now.

12. Audio was working fine and dandy until it seemingly randomly messed up. One day all audio that was played only came out of one speaker. I have no idea what caused this, but after a bit of googling around, I found <a href="http://ubuntuforums.org/showthread.php?t=370900">this</a> great post which solved my problem. So I thought. After adding the following to the "option snd-hda-intel index=0" line to /etc/modprobe.conf (append this text to the same line): "model=3stack position_fix=0 single_cmd=0", and restarting, it worked... until I restarted again. I removed the line and discovered that both speakers would work if I used the volume applet to slide the volume to 0 then back to where I wanted it, both speakers worked perfectly. Very wierd, and I'll look into it further at another time.
