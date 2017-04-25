---
title: Installing a perl module
date: 2009-07-17
---

Here's a nifty tip, if you have a perl script that depends on a module, for example:  

```
use Text::Smart::Plugin;
```

you can easily install it via 

```
yum install 'perl(Text::Smart::Plugin)
```

without having to try to find the exact package (although it will be named perl-Text-Smart-Plugin)
