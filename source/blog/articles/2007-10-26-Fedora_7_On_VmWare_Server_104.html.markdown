---
title: Fedora 7 On VmWare Server 1.0.4
date: 2007-10-26
tags: fedora
---

(The Dell Latitude Fedora 7 install guide is coming in the near future, I promise)

I'm in the midst of a major infrastructure overhaul, driven by my desire to have simple/robust/always availible hosts. I'm virtualizing all my development environments so that I can hose them at will. The VMWare workstation license that I got from school expired, so I downloaded and installed the free VMWare Server.

Unfortunately there is a problem with the linux ata_piix driver with the latest VMWare Server 1.0.4. Whenever I create the virtual machine and goto install Fedora 7 from the DVD, the anaconda starts up, but hangs indefinately on 

```
"Loading SCSI Driver  Loading ata_piix". 
```

Pressing Alt-F4 to open the terminal reveals that it is probing all the possible SCSI devices from SDA to SDZZ (presumably) and since each missing device takes 45 seconds to time out, this is unacceptable. The solution (found <a href="http://communities.vmware.com/thread/103939?tstart=0">here</a>) is to open the vmx file in the virtual machine directory and add the following line:

```
'scsi0.virtualDev = "lsilogic"'
```

And then proceed with the installation. You will get a message saying the virtual device was configured for bug logic, prompting you to switch it to lsilogic. Simply click yes (the warning about installed machines not working can be ignored as you haven't installed anything yet) and installation should occur flawlessly.

Stay tuned as my complete infrastructure overhall overview is coming with instruction on competing the more difficult tasks
