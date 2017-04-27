---
title: More Linux Hardware Fun
date: 2008-06-06
tags: hardware, linux
---

I love Linux but hate when things don't just 'work out of the box' (definitely not a Linux-only problem though). Well, recently I bought a PC off ebay to use for a media center I'm setting up and ran into some woes with the Ethernet card. I always expect wireless problems but it has been years since I had an issue with a wired network card. Alas, after quite a bit of Googling I found my answer ( <a href="https://bugs.launchpad.net/ubuntu/+source/linux-source-2.6.15/+bug/14421">here</a> ) and figured I'd share it incase anyone else was wondering. 

First my card, courteous of  <i>lspci -vvv</i>

<pre>
02:09.0 Ethernet controller: Davicom Semiconductor, Inc. 21x4x DEC-Tulip compatible 10/100 Ethernet (rev 31)
    Subsystem: Unknown device 4554:434e
    Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR+ FastB2B- DisINTx-
    Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=medium >TAbort- <TAbort- <MAbort- >SERR- <PERR+ INTx-
    Latency: 32 (5000ns min, 10000ns max)
    Interrupt: pin A routed to IRQ 21
    Region 0: I/O ports at d800 [size=256]
    Region 1: Memory at feaffc00 (32-bit, non-prefetchable) [size=256]
    Expansion ROM at f4700000 [disabled] [size=256K]
    Capabilities: <access denied>
    Kernel driver in use: dmfe
    Kernel modules: dmfe, tulip
</pre>

As you can see the drivers came w/ Linux and the system had no problem detecting the card. The problem arose when the interface was brought up, dhclient was run, and an IP address was requested. Consistently in /var/log/messages (also output w/ the dmesg command), I saw:

<pre>
Jun  6 16:13:22 localhost dhclient: DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 6
Jun  6 16:13:28 localhost dhclient: DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 10
Jun  6 16:13:38 localhost dhclient: DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 18
Jun  6 16:13:56 localhost dhclient: DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 17
Jun  6 16:14:13 localhost dhclient: DHCPDISCOVER on eth0 to 255.255.255.255 port 67 interval 10
Jun  6 16:14:23 localhost dhclient: No DHCPOFFERS received.
Jun  6 16:21:39 localhost kernel: device eth0 entered promiscuous mode
</pre>


The weird thing was, when I went to my router's web interface from another computer, and looked at the DHCP client table, I could see an entry for my PC's MAC w/ an assigned IP. After fruitlessly trying fiddle w/ the router and desktop, I searched around and found it to be a driver issue. Everything worked fine and dandy after I restarted and ran the following commands (as root):

<pre>
/sbin/ifdown eth0
/sbin/modprobe -r tulip dmfe
/sbin/modprobe -i dmfe
/sbin/ifup eth0
</pre>

Supposidly there is an issue w/ the tulip driver (why its enabled by default confounds me) which dmfe works just fine. After doing this I finally was connected to my network. One minor fluke happend of the first shot though, I was able to access machines (both locally and on the internet) via ip address but all DNS lookups failed. The problem dissapeared after I restarted my machine and ran the aforementioned commands, and hasn't returned, so I dismissed it as a minor fluke. Hope this helped!
