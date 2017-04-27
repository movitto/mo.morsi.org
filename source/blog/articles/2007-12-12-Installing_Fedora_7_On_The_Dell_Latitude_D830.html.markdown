---
title: Installing Fedora 7 On The Dell Latitude D830
date: 2007-12-12
tags: fedora
---

(Standard Disclamer: I am not responsible for any changes you do to your system and their results/outcomes, follow this guide at your own risk!)

<b>Overview:</b>
I have successfully gotten everything working on this laptop though things can be very finicky at times, Most hardware should work out of the box with the exception of the graphics chip, which you need to install the proprietary nvidia driver for, and the Broadcom wifi chip which takes an arm and a leg to setup right.

<b>General Hardware Specifications:</b>
<table border="1">
<tr><td width="33%"><u>Hardware Components</u></td><td width="23%"><u>Status Under Linux</u></td><td width="43%"><u>Notes</u></td></tr>
<tr><td>Intel Core 2 Duo</td><td>Works</td><td>No special setup needed. Make sure you download the x86_64 dvd/cd's</td></tr>
<tr><td>2GB DDR2 RAM</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>120GB SCSI Hard Drive</td><td>Works</td><td>Small bios tweak needed (see below)</td></tr>
<tr><td>Touchpad</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Speakers/Headphone Jack</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Nvidia Graphics Chip</td><td>Works</td><td>Enable Livna; Install Driver; Modify xorg.conf; See Below</td></tr>
<tr><td>Ethernet network card</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Broadcomm Wifi Network Card</td><td>Works</td><td>A pain to get up and running; See Below</td></tr>
<tr><td>CD/DVD Reader/Burner</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>USB Port</td><td>Works</td><td>No special setup needed</td></tr>
<tr><td>Firewire Port</td><td>Untested</td><td></td></tr>
<tr><td>VGA Port</td><td>Works</td><td>Small tweaks needed; See Below</td></tr>
</table>

<b>Steps I performed to get Fedora 7 --Moonshine -- Working:</b>

1. Some initial bios tweaks are required for everything to work fine and dandy (took me a few failed installations and a while to figure this one out). From the BIOS Setup Menu (press F2 on the initial bootup screen) , select "Onboard Devices", and set "Flash Cache Module" from on to off as well as "SATA Operation" from AHCI to ATA

2. I booted up the system with a live knoppix disk, ran "gparted" as root, and modified the partition layout, shrinking Vista to make room for the Linux partitions
* /dev/sda1 50GB NTFS  (Vista)
* /dev/sda2 50GB EXT3  (Fedora /)
* /dev/sda3 1GB  SWAP
* /dev/sda4 10GB VFAT shared data

3. Restarted the computer, booted into Vista and downloaded/upgraded all the drivers from Dell.com

4. Installed Fedora via Pixiboot. This was accomplished by accessing the boot menu (F12 on initial startup screen), selecting my NIC as the boot device, waiting for the prompt, typing "menu" to access the list of OS's I could install and selecting Fedora 7 x86_64. I had to do this, as every time I tried the Fedora 7 x86_64 installation DVD, I would get a prompt saying that some driver would not be found, and I needed to select it. After a long, painful process of trial / error, I gave up (I tested the media so I'm sure its not an issue w/ the install disk itself). Surprisingly the x86 DVD did not have any problems. Note, pixiboot will only work if you are on a network that have a pixiboot server which you can get OS images off of.  Since this won't apply to most people, I just suggest you go with the x86 DVD as your aren't getting much with the x86_64, and in many cases its a big headache (especially with some of the packages coming from the repositiories).

5. The only hickup in installation should be the fact that a graphical install fails, and you are forced to use text mode. No biggie though as the text mode installation is nicely done in my opinion (don't worry, there are no commands to remember, its all text based menus)

6. On your first boot and login (once again into a console as X doesn't work yet), I immediately resolved to fix my graphics situation. If you are unfamiliar with the 'links' web browser, google it now. Essentially it is a very simple, text based web browser which you can use in non-graphical environment. To save you time, the only commands you need to know to work links is 'q' is for quit (obviously), 'g' will prompt you for a url to go to, 'enter' follows a link to the page it points to, and the arrow keys can be used to move around the page. 

7. Using links, I navigated to http://rpm.livna.org, the unofficial main proprietary repo for Fedora, found the "Fedora 7 Livna RPM" on the page and downloaded it

8. Quiting links, I installed this rpm via the command: "rpm -ivh livna.rpm"   (the name will be of the file you downloaded, livna.rpm is just a placeholder). Next install the nvidia graphics driver via the following command: "yum install kmod-nvidia". Finally, open up /etc/inittab (run the command "nano /etc/inittab" if you've never used a text editor on Linux before), located the following line "id:3:initdefault:" and change it to "id:5:initdefault:" (this merely changes your initial / default runlevel, a topic I will skip here). Reboot. Whala! You should now have the GUI login screen.

9. Since the GUI failed before we installed the nvidia driver, the Fedora First Time Boot Configuration never was run. Thus you probably want to create a new, non-root user. This can be accomplished via the 'adduser' command (as root) or via the 'Users and Groups' admin gui (via "System" > "Admin" > "Users and Groups"). You may also want to give that user sudo access by running the visudo command, though I am not going to go into detail here on how to do that.

10. Next you will probably want to update your system by running the command "yum update" as root (or sudo it) or via "pup" which can be found via the main menu > "System" > "Software Updated". Warning: this will take a while so grab something to drink :-) Once completed, install any packages you want via the graphical "pirut" tool, the graphical "yumex" tool (you first need to install it via "yum install yumex"), or simply the yum command ("yum install packages...."). While what software you install is completely up to you, your preferences, and your target use of the system, the following is the initial list of software that I installed (incase I forgot to document something in this article) (also note that I have installed alot more software since generating this list): "amarok-extras-nonfree k3b-extras-nonfree kmod-madwiki kmod-ndiswrapper kmod-ntfs libdvdplay mencoder madwifi mplayer mplayer-gui mplayerplug-in xchat xine xmms-mp3 dia thunderbird gdesklets"

11. At this point all your hardware should be working except for the wifi chip (once again, I have yet to use the firewire port so I'm not sure if it works or not). The Broadcomm wifi chip is definetly a pain, and still to this day does not work 100% right. Essentially you will need to use <b>both</b> the crappy official Broadcomm Linux driver as well as the Windows driver with ndiswrapper.  To get everything to work, follow the following (sub)guide:
  (note, it may be the case that alot of these step are unnecessary. It took me a long time to get wifi into a usable state (once again it's not perfect as explained below) and once it worked, I did not bother to figure out exactly what steps are required a which ones aren't)
  11.1 "yum install b43-fwcutter ndiswrapper cabextract"
  11.2 Download the B43 driver from <a href="http://linuxwireless.org/en/users/Drivers/b43">here</a>  (or from the download list below)
  11.3 Download the "SP34152" Windows driver from <a href="ftp://ftp.hp.com/pub/softpaq/sp34001-34500/sp34152.exe">here</a>
  11.4 Extract the B43 driver and run "b43-fwcutter -w /lib/firmware broadcom-wl-4.80.53.0/kmod/wl_apsta.o"
  11.5 Uncompress the official windows driver "cabextract sp34152.exe"
  11.6 As root run "ndiswrapper -i  bcmwl5.inf" (uncompressed in the previous step)
  11.7 "ndiswrapper -l" to make sure it installed before running "ndiswrapper -m && ndiswrapper -ma && ndiswrapper -mi"
  11.8 Make sure the /etc/modprobe.d/ndiswrapper exists and contains "alias wlan0 ndiswrapper" (if not create it)
  11.9 Add the following line to /etc/rc.local "modprobe -r b43 && modprobe ndiswrapper" (yes this is probably the most "hackish" step, I could not get the wifi chip to work without explicitly unloading the official b43 driver and loading the windows (ndiswrapper) driver).
  11.10 Reboot, and knock on wood, your wifi chip should work.

12. Somethings to note concerning wifi. <a href="http://www.thelinuxpimp.com/main/index.php?name=News&file=article&sid=749">This site</a> is very helpful. The chip cannot handle a large amount of bandwidth. This is probably the most annoying problem, but if I do anything that requires alot of bandwidth (can be something as simple as downloading something via bittorrent or ftp) the whole system will hard-freeze, and the only solution is to hold the power button until it shuts off. Lastly, you may see errors / warnings in your system log of the nature "b43-phy0 ERROR: Microcode "bcm43xx_microcode5.fw" not available or load failed. b43-phy0 ERROR: You must go to http://linuxwireless.org/en/users/Drivers/b43#devicefirmware and download the correct firmware (version 4)". This is fine and relates to the official Broadcomm driver which we unload in rc.local (though in this whole process you extract and install the firmware that it is complaining about, the official driver just does not work). Regardless of all the annoying issues, wifi should now work (works beautifully for web surfing, IMing, emailing, etc) and thus your system should be good to go! Enjoy!

<a href="http://www.linux-on-laptops.com/" title="Linux on Laptops">
<img src="http://www.linux-on-laptops.com/images/linux-on-laptops.gif" alt="Linux On Laptops" width="110" height="36" border="0">
</a>
&nbsp;
<a href="http://tuxmobil.org/">
<img src="http://tuxmobil.org/pics/tuxmobil_sticker.png" width="88" height="31" border="0" alt="TuxMobil - Linux on Laptops, Notebooks, PDAs and Mobile Phones">
</a>
