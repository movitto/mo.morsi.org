---
title: yum.morsi.org
date: 2009-11-08
---

I've just tossed up two new morsi.org subdomains. <a href="http://projects.morsi.org">projects.morsi.org</a> is my new hosting space for projects I'm working on. <a href="http://yum.morsi.org">yum.morsi.org</a> is a <a href="http://yum.baseurl.org/">yum</a> repository setup for my rpms, which right now only has <a href="http://projects.morsi.org/Romic">Romic</a> but I will be putting up <a href="http://projects.morsi.org/Motel">Motel</a> soon and more in the future. Putting it to use is as simple as creating /etc/yum.repos.d/morsi-org.repo with the following:

```
[morsi-org]
name=morsi-org
baseurl=http://yum.morsi.org/repos/$releasever/
enabled=0
gpgcheck=0
```

I found creating / hosting a yum repo to be remarkably easy. On my local machine, I created a 'yum' directory with a 'x86_64' subdir (create more for other architectures as needed, x86, noarch, etc) copied my rpms into it, and ran 'createrepo yum'.

Optionally create a domain, and on your webhost create a 'repos' subdir under the webroot dir. Create a subdirectory under this for the fedora release version your are building for (or whatever you are running by default), eg '11' as currently Fedora is on version 11. 

scp the entire yum directory from your localmachine to <b>'repos/&lt;release&gt;'</b> on your webhost. Finally create the yum.repos.d on any client you want to pull packages from your repo, and make sure to specify <b>--enablrepo=&lt;reponame&gt;</b> when running yum.

Optionally you may also want to change the .htaccess in your repository's webroot to alter the look of the yum index.
