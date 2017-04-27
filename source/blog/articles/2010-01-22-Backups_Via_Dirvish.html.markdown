---
title: Backups Via Dirvish
date: 2010-01-22
tags: linux, backups
---

<a href="http://www.dirvish.org/">Dirvish</a> is an easy to use backup system based on rsync. Having recently setup an external encrypted usb drive to store backups, mounted at /mnt/backup1, I setup backups for target directories on my local system using Dirvish (of course, if it were not in early development, I would use <a href="http://morsi.org/projects/snap/">Snap</a> but alas its too early to trust critical system operations to it). The entire process is fairly easy, there being two files which you need to modify, as well as creating a cron job to run dirvish daily. I'll keep it brief and simple here, use <a href="http://wiki.edseek.com/howto:dirvish">this great guide</a> if you want more info. Before we begin, recognize a 'bank' is a directory where multiple vaults are stored. A 'vault' holds the configuration and the actual snapshots of the filesystem(s).
<!--break-->
<b>Install Dirvish and Configure</b>
Use your package management system or build dirvish yourself. After which modify /etc/dirvish/master.conf (or alternatively /etc/dirvish.conf) to contain the following directives:

<pre>
bank:
       /mnt/backup1/snapshot

image-default: %Y%m%d-%H%M
log: gzip
index: gzip
xdev: 0

Runall:
      myvault

expire-default: +6 months

image-perm: 700 
meta-perm: 600
</pre>

<ul>
<li><i>bank</i> - specifies the location of the bank which will contain all the vaults (multiple banks may be specified, if so vaults will be looked for in each)</li>
<li><i>image-default</i> - specifies the default name of each snapshot image, in this case it will be called yearmonthday-hourminute</li>
<li><i>log</i> - specifies that the log of operations should be gzipped </li>
<li><i>index</i> - specifies that the file index should be gzipped</li>
<li><i>xdev</i> - a value of '0' specifies that filesystem boundaries should be ignored, else dirvish/rysnc will not cross mount points</li>
<li><i>Runall</i> - specifies the list of vaults that will be scanned / backed up when the dirvish-runall command is invoked</li>
<li><i>expire-default</i> - specifies the default retention time of the snapshots, adjust as needed to suite the space you reserve for backups</li>
<li><i>image-perm</i> - specifies the permissions on the snapshot image directory, don't worry, all backed up file and directory permissions, ownership, and timestamps will be preserved</li>
<li><i>meta-perm</i> - specified the permission on the dirvish meta-info files (logs, index, etc)</li>
</ul>


<b>Setup Vaults</b>
All vaults need a 'dirvish/' subdirectory w/ a 'default.conf' configuration file. Thus in '/mnt/backup1/snapshot/myvault/dirvish/default.conf' write:

<pre>
client: localhost
tree: /
xdev: 0
exclude: 
   + /etc
   + /home
   + /mnt
   + /mnt/thumb
   /mnt/*
   /*  
</pre>

<ul>
<li><i>client</i> - specifies the machine to connect to which the files are on</li>
<li><i>tree</i> - specifies the root directory to start traversing down from (there can only be one)</li>
<li><i>exclude</i> - specifies any specific files to be included / excluded. See the 'Filter Rules' and 'Exclude' section of the rsync man page for alot more detailed info. Be careful with subdirectories here, due to how rsync works.</li>
</ul>


<b>Initialize Vault</b>
Any new vaults need to be initialized with the first snapshot before dirvish-runall can be invoked. This can be simply done by running the 'dirvish' command.
<pre>/usr/bin/dirvish --init --vault myvault</pre>
After this you should have your first snapshot in '/mnt/backup1/snapshot/myvault/yyyymmdd-hhmm'. Run '/usr/bin/dirvish-runall' any time after this to create a new incremental snapshot, or create on or more cronjobs for it. If setting up regular backups, its advisable to run the '/usr/bin/dirvish-expire' command right before '/usr/bin/dirvish-runall' to clean up expired snapshots and to ensure a backup job is not currently in operation.
