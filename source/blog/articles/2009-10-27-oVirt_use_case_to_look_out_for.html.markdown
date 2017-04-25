---
title: oVirt use case to look out for
date: 2009-10-27
---

Sometimes all you need is a good nights rest, I spent a considerable amount of time on this problem yesterday only to realize the solution was very simple. 

Watch out when running the <a href="http://ovirt.org">oVirt</a> server on an vm, with your guest network set to the libvirt 'default' network on your host machine. The oVirt server depends on / will install libvirt and run libvirtd in your vm. Thus upon your first post-install restart, you will have the libvirtd default network interface, addressed at 192.168.122.1 running in your vm. Since various packets coming from the libvirt interface on your _host_ machine will have that same address, their responses will never make it back, rather they will goto the libvirt interface on your _vm_ and be subsequently discarded.

You most likely will notice this issue if you use tcpdump and you are receiving lots of ARP requests for your MAC from ip on your guest interface but no responses. Even running tcpdump on the libvirt network interface won't yield the responses, as even though their being sent there, that address just resolves to the local machine, and the kernel just processes the packets it already has.

To resolve this either just stop the libvirt daemon running on your oVirt vm (sudo service libvirtd stop) or use another network other than the "default" as one of the two for your libvirt server vm. Hope this helps!
