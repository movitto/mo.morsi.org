---
title: Setting up VNC
date: 2009-12-15
---

Virtual Network Computing (VNC) allows you to access and control a graphical desktop running on one machine from another. This permits you to seamlessly use a desktop environment and graphical applications while not having to sit infront of the physical keyboard / mouse attached to a computer. 

This can also be accomplished via ssh, as most ssh servers have this enabled by default, you merely need to specify "-X" or "-Y" to ssh when connecting and then run your graphical application. Comparilively, VNC is nowhere near as secure and takes a few steps to setup, but is greatly faster (afterall over ssh, every single draw command needs to be sent over an encrypted connection) and allows you to run and view a full desktop environment as opposed to just individual applications.

VNC is relatively easy to setup, albeit with a few caveats, as described below:

(edit 07/07/09, a few things changed w/ the vnc-server shipped with Fedora 11, see my note at the end of this post)

<ol>
<li style="list-style-type: decimal;">Install it: "yum install vnc-server"</li>
<li style="list-style-type: decimal;">Edit /etc/sysconfig/vncservers, and add the following two lines:
 VNCSERVERS="2:username"
 VNCSERVERARGS[2]="-geometry 1024x768 -nohttpd "

Replacing username with a valid user that can log into the system. Also specify any screen resolution supported by X on your system. The '-AlwaysShared' flag can be specifed to permit sharing the vnc connection among multiple clients. Finally you can add as many servers as you want here, each with its own options. (07/07/09 see note below)
</li>
<li style="list-style-type: decimal;">As the aformentioned user run the 'vncpasswd' command and provide a password. You will be prompted for this when you connect to the vncserver</li>
<li style="list-style-type: decimal;">Open the necessary port(s) for remote access. Accomplished via 'system-config-firewall' (or 'system-config-firewall-tui' for the text / ncurses version), open up the port corresponding to each server you create. By default this port is 5900 + the server number, for example 5902 for the server configured in step 2 above. You can override this with the "-rfport" option in the aformentioned server options.</li>
<li style="list-style-type: decimal;">Edit the aformentioned user's ~/.vnc/xstartup config file to launch the desired desktop environment and/or window manager upon server instantiation. By default, a barebone 'Tabbed Window Manager (twm)' is launched, and most likely you will want gnome, kde, or something else. Simply comment out the last line, "#twm &"; and uncomment the two which you are directed to uncomment in the file itself, eg. 'unset SESSION_MANAGER and ' 'exec /etc/X11/xinit/xinitrc'. This will launch the desktop env / window manager configured as default systemwide.(07/07/09 see note below)</li>
<li style="list-style-type: decimal;">Make sure vnc as part of / launched by xinet.d is disabled, else you will get "A vnc server is already running as :2". This can be accomplished by editing /etc/xinet.d/vncts and setting all 'disable' options to 'yes'. You will need to restart xinetd by running 'service xinetd restart'</li>
<li style="list-style-type: decimal;">Finally start the vncserver by running 'service vncserver start'</li>
</ol>

Now you should be able to connect to it on another machine by installing the client package 'yum install vnc' and executing it via 'vncviewer server:2' (which will prompt you for the aforementioned password).

And whala! Remote graphical access!

[Update 07/07/09: If running F11 or later, make the following changes to the process above:
&nbsp;&nbsp; - in step 2 above, the "-nohttpd" option is no longer supported and the vnc service will fail to start if present
&nbsp;&nbsp; - step 5 above is no longer needed, vnc will default to the window manager you normally use]
