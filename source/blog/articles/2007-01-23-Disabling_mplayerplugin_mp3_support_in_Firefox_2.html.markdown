---
title: Disabling mplayerplug-in mp3 support in Firefox 2
date: 2007-01-23
---

I use my personal server to store my multimedia so that I can access it from any computer in my house. The other day, I found Ampache,a really nifty web-based utility that allowed me to access and listen to my music from any web browser. While this is a great addon to my infrastructure, I became quickly annoyed as Firefox 2.0 installed on Slackware on my laptop would default to using the mplayerplug-in to play my selected music. (I'd rather open playlists in xmms or amarok). After a bit of unsuccessful searching as to rectifying the problem from the firefox interface (not sure why you cant manually edit "File Type" associations in the preferences configuration), I found this tutorial on how to modify the mplayerplug-in settings, http://mplayerplug-in.sourceforge.net/config.php

Simply, just follow these steps (close firefox before you start):
1) If you have root access and want to change this for the entire system, edit /etc/mplayerplug-in.conf, else modify ~/.mozilla/mplayerplug-in.conf or ~/.mplayer/mplayerplug-in.conf (either works equally well)

2) Add the following line to the bottom of the file:
enable-mp3=0

3) If you are modifying the /etc file (your root), run the following command:
touch /usr/lib/mozilla/plugins/mplayerplug-in.so (might be /usr/lib/firefox/plugins/mplayerplug-in.so on your system)

If you are modifying one of the local mplayer config files in your home dir, run the following command:
rm .mozilla/firefox/pluginreg.dat

Next time you start firefox, you can navigate to about:plugins to make sure mp3/m3u support is disabled. Next time you try to open a mp3/m3u, firefox will prompt your to save/open the program, at which point you can select xmms/amarok and instruct firefox to always use that to open the file type.
