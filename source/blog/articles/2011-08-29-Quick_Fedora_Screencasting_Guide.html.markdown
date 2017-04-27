---
title: Quick Fedora Screencasting Guide
date: 2011-08-29
tags: fedora, screencasting
---

Here is how I orchestrated my recent <a href="http://mo.morsi.org/blog/node/343">screencast</a> on Fedora 15:

<ol>
<li>$ sudo yum install recordmydesktop ffmpeg avidemux openshot xorg-x11-utils</li>
<li>Start the program you would like to record, in my case it was virt-manager</li>
<li>$ xwininfo</li>
<li>then click on the window to record, this will give you the window id</li>
<li>$ recordmydesktop --windowid  [id-of-window] # this will create an ogv file of the recording</li>
<li>Feel free to create multiple recordings, to piece together later on</li>
<li>ffmpeg -i [file.ogv] [file.avi]  # convert to avi for editing</li>
<li>then used avidemux extract specific clips out of the avi files</li>
<li>then used openshot to piece the avi clips back together w/ any transitions (fade in/wipe out/etc)</li>
<li>finally I used avidemux again to boost the audio on the final avi file</li>
</ol>

Now you will have an AVI file which you can upload to youtube / embed in websites or to do with what you want.
