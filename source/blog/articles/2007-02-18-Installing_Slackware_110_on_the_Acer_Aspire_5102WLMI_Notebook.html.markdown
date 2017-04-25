---
title: Installing Slackware 11.0 on the Acer Aspire 5102WLMI Notebook
date: 2007-02-18
---

(Standard Disclamer: I am not responsible for any changes you do to your system and their results/outcomes, follow this guide at your own risk!)

<b>Overview:</b>
To make things short, I bought this laptop to use in grad school last fall. Overally it is a nice (not great) notebook that I bought for a reasonable price though Unfortunately I was unable to get my first distro of choice working, Fedora 5, as the installation worked 100% but the system froze when intializing udev, early in the boot process. Afterwards, I installed Ubuntu, without any glitches, and spent a while configuring the system so that it worked properly (for some reason my synaptics touchpad was giving me alot of trouble). Unfortunately after all the hastle, the laptop would boot/run as normal but would periodically suddenly just freeze when in use. There was no single action that caused this, and after much debugging, I gave up and decided to try my staple and still favorite distro Slackware.

<b>General Hardware Specifications:</b>
<table border="1">
<tr><td width="33%"><u>Hardware Components</u></td><td width="23%"><u>Status Under Linux</u></td><td width="43%"><u>Notes</u></td></tr>
<tr><td>AMD Turion 64x2 (64-bit, dual core) CPU</td><td>Works</td><td>Select right processor in kernel config. All ACPI power options built into kernel for full power management support</td></tr>
<tr><td>512MB DDR2 RAM</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>100GB PATA Hard Drive</td><td>Works</td><td>ATI PATA chipset must be enabled in kernel config</td></tr>
<tr><td>Touchpad</td><td>Works</td><td>Enable synaptics and psmouse drivers in the kernel</td></tr>
<tr><td>Speakers/Headphone Jack</td><td>Works</td><td>No special setup</td></tr>
<tr><td>ATI Radeon Xpress 1100</td><td>Works</td><td>Required a bit of configuration, see below</td></tr>
<tr><td>Realtek Ethernet network card</td><td>Works</td><td>Just select appropriate driver in the kernel config</td></tr>
<tr><td>Atheros Wifi Network Card</td><td>Works</td><td>Had to fiddle around to get this working, see below</td></tr>
<tr><td>CD/DVD Reader/Burner</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>USB Port</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Card Reader</td><td>Not working</td><td>Didn't mess around with this too much, but I'm unable to mount a SD card that I have</td></tr>
</table>

<b>Steps I performed to get Slackware Working:</b>
1. Immediately upon reciving computer, boot into Windows XP and go through the Acer setup / create a backup cd.

2. Wipe the hard drive clean (note you will lose a small Acer recovery partition located in the first sector of your hard drive, but you don't need this) using a live Knoppix CD, and created/formatted 4 partitions:
* /dev/hda1 20GB vfat for Windows XP
* /dev/hda2 20GB ext3 for Slackware
* /dev/hda3 1GB  swap (yea this is probably alot bigger than I need but w/e)
* /dev/hda4 55GB vfat for shared documents and data
Knoppix has a graphical tool called kparted to do this. Just simply boot from knoppix (you might have to use the 'noagp' and/or 'nohotplug' boot options to do this, I cant recall though), launch a terminal and type 'kparted', then format as necessary.

3. Reboot and put the Windows XP backup cd you made in step 1 into the drive. Restore your Windows XP installation to the first partition (make sure you can boot and everything works)

4. Reboot and place the slackware cd/dvd you downloaded into the drive. Install Slack. Space isn't really an issue, so I went with the full install and chose to install Lilo over the MBR. I had slack mount windows xp under /mnt/winxp and my shared data partition under /mnt/shared

5. Boot into Slack, there should be no problems getting the system up and running. I did have a few issues with some hardware at first, and you will need a hard link to your ethernet port at first for an internet connection (eg. wifi doesnt work) and you should use the physical terminals (ctrl-alt-f1 though f6) as the touchpad is unusable.

6. I downloaded swaret to manage packages and dependencies for this box. A pet peeve I have with Slackware is that the built in package management system does not support dependency resolution (done on purpose for simplicity) and many of the packages out there are not setup to work with the external utilities to do so (such as Swaret). This of course depends on the community and is getting better everyday, and I plan on contributing a few packages which I manually installed/compiled to the Linuxpackages.net repository once I refamiliarize myself with Slackware again (it was my first distro, but I was using Fedora for a long time since then). Regardless, my /etc/swaret.conf file is attached for your use. I disabled the FTP repositories as I block FTP in my network firewall.

7. Since slack comes with the 2.4.32 kernel by default and the 2.6 kernel in the repo is a bit outdate (albiet not by much; eg. is 2.6.13 and the current kernel in development is 2.6.20), I decided to download and compile the 2.6.19 (current stable version) kernel from kernel.org and get my hardware working from there. Note: Later on in the process I downloaded and installed the bootsplash package in the Slackware repository to enable a graphical bootup for my system. My kernel configuration which I have included with this article incorporates the patch which enables the startup bootsplash in the kernel. I'm not sure if trying to use my config with a native kernel (eg. without the bootsplash patch) will work. You can find the patch I used here: http://forums.debian.net/viewtopic.php?t=10983

8. Copy the kernel config file included with this post to the /usr/src/linux-2.6.19/.config file, then run "make", "make install" (this will overwrite the kernel you are using to boot your system, so make a backup, but all should work regardless), "make modules_install", and "lilo". Then reboot

9. At this point most of your hardware should work. I've included my lilo.conf and xorg.conf files with this post incase you need trouble.

10. Because I prefer gnome to KDE, I installed dropline-gnome from the slackware repository (using the install tool which was provided, I installed all applications that came with it), as well as libgksu (from the repo), and gksu (which for some reason did not come with dropline-gnome and was not in the repo, thus I had to d/l the source, compile, and install manually; simple process though with no hickups).

11. To get wifi working, I downloaded/compiled/installed the madwifi driver (simply google "madwifi"). I added "/sbin/modprobe ath_pci" to /etc/rc.d/rc.modules, restarted, and whala the wifi card was present and worked (I connect to the network via the NetworkManager applet in gnome, which offers an incredibly simple interface which to select and connect to availible networks in the area).

12. My ATI Radeon Xpress 1100 Graphics Card gave me a bit of trouble. All in all, it turned out to be a kernel issue, and the working kernel/xorg.conf is attached. Essentially after compiling your kernel and rebooting (so that your using it), download the ati linux driver from www.ati.com (xpress1100 will not be on the list, but as far as i can tell there is only one linux driver). Since the header linux/config.h was removed from kernel 2.6.19, and the ati driver code relied on this, I simply copied config.h from an old kernel to my current one (eg. cp /usr/src/linux-2.4.30/include/linux/config.h /usr/src/linux-2.6.19/include/linux/config.h). Then simply run the installer script as root, and upon successful completion, backup your /etc/X11/xorg.conf and run "aticonfig --initial". Finally reboot and test 3D acceleration w/ GLX gears. Notes: your running kernel cannot include support for DRM under character devices, if it is a module on your system, disable it. My attached kernel config has it disabled, so you can just use that. Furthermore, every time you upgrade your kernel you will need to run the ati driver installer so it builds a new driver for your kernel.

<b>Unresolved Problems:</b>
* Bootup takes a long time. On the same machine, Windows XP takes about 30 sec to bootup to the login screen (though from login to usable system takes longer than in Linux) while Slackware takes anywhere up to a minute and a half to boot. When I had Ubuntu on this system, it never took longer than 40sec to boot, and I feel this is because I have a big kernel (built all my required drivers right in, instead of making them modules)

* In the middle of startup I get alot of "hda_codec invalid dep_range_val 0x7ff" errors in sequence (everything before and after this is bootup is flawless). Googling this, I found that many people have this issue and it has to do with my soundchip, but since audio works flawlessly, and the bootup text is hidden by my bootsplash I decided I wouldnt try to fix it and break something in the process (Murphey's Law)

* I would like to install Grub over Lilo for a bootloader (mainly because I would like a graphic instead of an ugly red menu), which is a simple process but will be done at another time

* The card reader does not recognize cards inserted into the slot and no corresponding devices appear in the filesystem. This is most likely caused by a missing driver, but I have no pressing need for it and thus this will remain unresolved for now.

* I attempted to get gdesklets working (installed from a package from the repository) for the "Dock" widget, but am getting errors whenever I try to run the program and will work on this issue another time. 

<b>Attached Files:</b>
* 2.6.19 Kernel config (recall this is with the bootsplash patch) 
* lilo.conf
* swaret.conf
* xorg.conf
* "lspci -v" and "lsmod" output from my working system
* glxinfo output

<b>Conclusion:</b>
I really like Slackware. Minus a few minor annoyances, Slack has always proven to be a solid, simple, and powerfull distro that just works. If some hardware isn't working, its simply because the driver isn't present and getting it working simply involves downloading the necessary software, (compiling it,) and installing as necessary. You never have to digg to far to try to debug a problem and once you setup your system (and dont mess with it :-p) it will forever work.

Hope this helped you! (As I play around with this machine more, I will keep this article update with what I did and the effect on the system).

<a href="http://www.linux-on-laptops.com/">
<img src="http://www.linux-on-laptops.com/images/linux-on-laptops.gif" alt="Linux On Laptops" width="110" height="36" border="0" /></a><a href="http://tuxmobil.org/"><img src="http://tuxmobil.org/pics/tuxmobil_sticker.png" width="88" height="31" border="0" alt="TuxMobil - Linux on Laptops, Notebooks, PDAs and Mobile Phones"></a>
