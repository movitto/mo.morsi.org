---
title: Tunneling SSH
date: 2007-06-15
---

(I'm in NYC working for Red Hat right now and am insanely busy. I'm having a great time and will describe everything in my blog in the near future).

Finally figured out ssh tunneling. 

1. Run your own ssh server (lets call it myserver.com)
2. On the client side, run ssh -N -D 8000 myserver.com
-N means dont run a program, eg. bash
-D is the local port ssh will listen on

3. Configure Firefox SOCKS PROXY (not a HTTP PROXY) to point to localhost:8000. Make sure its using Socks4 and you are not setting the http or other proxy fields (took me a while to figure that one out). Since this setting is far into the options settings, download an extension (addons.mozilla.org) to add a button or toolbar to control it. 

Once everything is setup, all your web traffic should be tunneled over ssh. Modify the proxy settings for other programs as necessary.
