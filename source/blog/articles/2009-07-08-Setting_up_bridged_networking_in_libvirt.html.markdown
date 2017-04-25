---
title: Setting up bridged networking in libvirt
date: 2009-07-08
---

This topic always confused the hell out of me, as whenever I configured networks in libvirt I'd almost always end up with a broken configuration, one where I external network access was unavailable, or worse...

Today I think I figured it out, and will try my best to explain it as how I understand it here. I believe alot of my misunderstanding stemmed from a confusing naming scheme as explained below.

To start of, lets say you have a machine with one or more vanilla physical network interfaces, wired or wireless or whatever it doesn't matter. These interfaces are configured via /etc/sysconfig/network-scripts/ifcfg-&lt;interface_name&gt; where they can be assigned mac addresses and static ip's, set to obtain net information via dhcp, etc. 

To provide access to an interface, lets say eth0, to a libvirt managed vm, we need to create a bridge, which we will call breth0, that includes eth0 and the virtual nic that resides on the vm. To do this, we could use brctl to manually create the bridge and add eth0 to it, and this is not a bad idea as incase we mess something up, we can always restart the machine and the bridge will be gone / the network configuration will be back to the way it was. 

To set it up permenantly, we edit /etc/sysconfig/network-scripts/ifcfg-eth0 to contain:

```
DEVICE=eth0
BRIDGE=breth0
BOOTPROTO=none
HWADDR=[[your mac address]]
ONBOOT=yes
USERCTL=yes
PEERDNS=yes
NM_CONTROLLED=no
```

Then create /etc/sysconfig/network-scripts/ifcfg-breth0 and add the following:

```
DEVICE=breth0
ONBOOT=yes
BOOTPROTO=dhcp 
TYPE=Bridge
PEERNTP=yes
```

(Note the bootproto is set on the bridge and not the interface as the ip address will be assigned to breth0 and not eth0.)

Restart both eth0 and breth0 by simply running "service network restart".

Running 'ifconfig' should yield the eth0 and breth0 as up, and 'brctl show' should show the breth0 bridge with eth0 as an interface. 

As a side note if you just want to setup a virtual network and don't need to access a physical nic, you can simply create the bridge, not associating  any physical interfaces with it; eg not adding the 'BRIDGE=breth0' line to eth0. You then can proceed from here, any vm's only residing on that network will have network access to each other but not the outside world. libvirt sets up the 'default' network this way. 

Next create a new libvirt vm config at /etc/libvirt/qemu/&lt;vmname&gt;.xml by however means, and add the following to it:

```
&lt;interface type='bridge'&gt;
  &lt;mac address='11:22:33:44:55:66'/&gt;
  &lt;source bridge='breth0'/&gt;
  &lt;model type='virtio'/&gt;
&lt;/interface&gt;
```

This creates a network interface for the vm, with the specified mac address, tied to the bridge you just created.

After starting libvirt and this vm, we can run 'brctl show' again to see breth0 is now associated with eth0 and vnet0 (or 'vnet' + some other number) which is the network interface libvirt created for the vm. 

IMPORTANT NOTE, this was the cause of alot of confusion for me for a long while. vnet0 is the network interface for the vm, and NOT anything else. The 'net' part of 'vnet0' thew me off as I thought it was referring to the entire virtual network instead of the one network interface. Thus if you have multiple vms and/or multiple virtual nics on one bridge (eg network) you will see multiple vnets associated with that bridge. 

Also note, running 'ifconfig' on the vm will yield eth0 and not vnet0 though they are one and the same interface, but on host / vm machines

From there you should be good (see troubleshooting below if things don't work). Your vm will have access to the network which eth0 is on, for example vnet0 (aka eth0 on the vm) will be able to receive an ip address from network if there is a dhcp server. You can setup as many interfaces to as many networks as you would like for your vm.  

Also there are several other different network configurations you may want to explore, such as not binding the physical interface to the bridge as discussed above, and using iptables to forward packets from the physical interface to the bridge. 

You can read about this topic some more at <a href="http://wiki.libvirt.org/page/Networking">the libvirt web site</a>. Hope this helped anyone who was as confused as I was!

<i><u>Troubleshooting</u></i>: [ added 07/08/09 ]
If things are still not working for you, try the following:

- change your vm NIC mac address; this may sound silly but in one instance when I was going through these steps I would get:
```
rtnetlink answers: cannot assign requested address
rtnetlink answers: network is down
```
Only by changing the mac address (specifically setting the first two octets to 00:1F) resolved this issue for whatever reason

- if your vm's nic comes up but can't get an ip address, make sure forwarding is on on your host system by running:
```
echo 1 >  /proc/sys/net/ipv4/ip_forward
```
Also verify that the following iptables rule doesn't exist on your host (run iptables -nvL):
```
REJECT all -- * * 0.0.0.0/0 0.0.0.0/0 reject-with icmp-host-prohibited
```
It it does remove this rule from the table via iptables -D FORWARD 1 and try requesting an ip address for your nic again.

Hopefully this all works for you, this stuff can be tricky to setup / debug.
