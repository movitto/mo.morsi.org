---
title: Second Monitor / TV With Linux
date: 2009-08-09
---

xorg.conf is a complicated config file which is easy to mess up and render your window system unworkable. Luckily enabling a second / cloned monitor is really easy (which I just found out). Simply edit /etc/X11/xorg.conf, locate the 'Device' section, and add the following to it:

Option "TwinView"

to enable monitor cloning. Plug in your second monitor, restart X (log out or hit ctrl-alt-backspace), and your computer monitor will be cloned (perhaps on that super sweet / large HDTV, for which you will need a video card that can drive it obviously)
