---
title: Shiny new site layout
date: 2009-10-27
---

So if you haven't noticed (eg if you're reading this via rss) I spent a while cleaning up and adding some useful features to this site. Unfortunately it took a little while to do so and involved some pain; you'd always hope that upgrading software and installing new plugins would be pretty simple and straightforward, but we all know how that goes.

I started this process looking for a good Ruby On Rails CMS webapp, as I'm far more familiar nowadays w/ Ruby and the Rails framework than I am w/ PHP. There are a few out there, including <a href="http://radiantcms.org/">radiant</a> and <a href="http://wiki.github.com/fdv/typo/">typo</a>, but I don't feel like they currently meet my needs, and in addition I was having quite some trouble getting them up and running (especially Radiant; look out for a post in the very near future on installing Rails software on a webhost).

So I decided to stick w/ drupal for now. Changed the theme to a more configurable one. Indexed the site content & provided a search box (btw for those new to drupal, one can easily index your site content by navigating to http://sitelocation/cron.php, or setup a cron job to wget that url). Added a tag cloud (which required a <a href="http://drupal.org/node/609374">hack</a> that took a while to discover), code syntax highlighting support, and even a <a href="http://mohammed.morsi.org/blog/files/toasted_favicon.ico">favicon</a> (among other features).

I've also enabled anonymous comments again, having put in place various spam control measures. 

As always if anything looks of or doesn't work, feel free to drop me an email and I'll look into it. And be sure to check back soon for new content!

[And for those drupal users who are still reading this far, a good tip to debug any module running on your system, without access to a debugger, is the use the 'watchdog' facility, that provides logger functionality. Results can be viewed in the Drupal admin reports interface which is populated from the Drupal db watchdog table].
