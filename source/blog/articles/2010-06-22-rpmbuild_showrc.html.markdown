---
title: rpmbuild --showrc
date: 2010-06-22
---

Sometimes the simplest things will slip by you for the longest time.

After time after time of trying to find a definitive list of macros available for use in RPM specfiles on the Internet, I finally read the rpmbuild man page just to find the '--showrc' option. From the docs:

<i>The command <b>rpmbuild --showrc</b> shows the values rpmbuild will use for all of the options are currently set in rpmrc and macros configuration file(s).</i>

Now I can easily run rpmbuild --showrc and grep the output for whatever I'm looking for.

Doy! :-p
