---
title: Running Windows On Fedora Linux Using VMWare
date: 2007-03-03
---

<p align="justify">Due to the fact that Syracuse University is very Microsoft-centric, I find myself needing to boot into my Windows partition often to do some work. Because I use VMWare to run multiple instances of Linux and Minix, I decided to give it a whirl and try to get Windows Media Center Edition running virtually. I found this great <a href="http://news.u32.net/articles/2006/07/18/running-vmware-on-a-physical-partition"> tutorial</a> the other day which offered me most everything I needed. (mirrored <a href="http://www.morsi.org/wiki/index.php/Windows_On_Linux_Using_VMWare">here</a> with bad formatting) The following is a list of the small derivations I had to do, to get it fully working:
</p>

- Under <b>Prepare The Disk</b> step 4, to grant a user privileges to access the disk run the following commands (as root):
  - usermod -G <i>other groups user is in</i>,disk <i>username</i> (-G will set all the secondary groups the user is in so make sure to read /etc/groups and list them all)
  - chmod g+w /dev/hda (or whatever disk windows is on) (You will have to run this every time you boot Linux, as I am currently unsure on how to get this to stick)

- Under <b>Prepare Windows</b> step 4 I did not do anything

- Under <b>Create The Virtual Machine</b> step 3 I selected "Windows XP Professional" (not the 64bit edition even though my OS is Media Center 64 bit (not sure if changing it will affect anything)); under step 8, I selected a "nat" setup, and under step 12 I select hda1 and hda3 corresponding to my primary Windows and Linux partitions

- Before I perfomed the instructions in "Fire Up The Virtual Machine" I had to install the VMWare SCSI driver (not sure why as my laptop has an IDE hard drive interface). If you don't you will get get a BSOD when Windows is booting up from VMWare. To do this simply (instructions found <a href="http://blog.faqs.it/?p=23">here</a> and at the bottom of the page <a href="http://www.vmware.com/support/reference/common/guest_win_scsidrv.html">here</a>)
  - In Linux download the scsi driver floppy (from the bottom of the page <a href="http://www.vmware.com/download/ws/drivers_tools.html">here</a>
  - Run (as root): 
      - mkdir /media/floppy
      - mount -o loop /path/to/floppy/image /media/floppy
      - cp -R /media/floppy /windows/accessible/location (a usb drive, shared partition, or just zip it and email it to yourself)
  - restart your computer, booting into windows normally (selecting the VMWare hardware profile when prompted), and login as an admin 
  - Start > Control Panel > Add Hardware
  - Check "yes the device is attached" when prompted, and select the last element of the device list when prompted "new hardware device" (or similar text). Opt to select the location of the hardware component, and navigate to the floppy directory, selecting the only file it will allow you to.
  - finish the wizard. It might say that the device isn't working properly which is good (it isn't there until you boot with vmware)

- Under <b>Fire Up The Virtual Machine</b> make sure you adhere to step 2! (you will destroy Linux if you don't). Your mouse will probably not work until you install vmware tools and restarted, which can only be done after logging into an administrator account. On the login screen, tab until the first user account is selected, then use the down arrows if necessary to highlight an admin account, then enter the password. If it asks you to active (like it did for me), simply go through the process (using the net), inputting the certificate of authenticity number from the sticker on the bottom of your laptop. After you are logged in, click on the "install vmware tools" item on the vmware settings menu, use the keyboard to go through the process and reboot. 

- Under <b>Setup The Boot Disk</b> steps 4/5, you are instructed to create menu.lst on the floppy. When I ran setup (described a few steps below), I noticed that grub tried to use the grub.conf configuration file. Thus I copied menu.lst to grub.conf (on the floppy in Linux) and chmod'd it as described to do with menu.lst. After this, the rest of the process works normally.

<p>
And Thats It, Best Of Luck!!!!
</p>
