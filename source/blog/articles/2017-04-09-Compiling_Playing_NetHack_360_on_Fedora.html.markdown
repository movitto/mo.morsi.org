---
title: Compiling / Playing NetHack 3.6.0 on Fedora
date: 2017-04-09
tags: nethack, gcc, compiler, fedora
---

The following are the simplest instructions required to compile <a href="http://nethack.org/">NetHack</a> 3.6.0 for <a href="https://getfedora.org/">Fedora 25</a>.

Why might you want to compile NetHack from source, instead of simply installing the package (<b>sudo dnf install nethack</b>)? For many reasons. Applying <a href="https://bilious.alt.org/">patches</a> for custom game mechanics. Running <a href="https://nethackwiki.com/wiki/Graphical_user_interface">an alternate frontend</a>. And more!

While the <a href="https://github.com/NetHack/NetHack/blob/NetHack-3.6.0/sys/unix/Install.unx">official Linux instructions</a> are complete, they are pretty involved and must be followed exactly for things to work. To give the dev team credit, they've been supporting a plethora of platforms and environments for 20+ years (and the number is still increasing). While a consolidated guide was written for compiling NetHack from scratch on <a href="http://jes.st/2015/compiling-playing-nethack-360-on-ubuntu/">Ubuntu/Debian</a> but nothing exists for Fedora... until now!

<hr/>


<b># On a fresh Fedora installation (with updates) install the dependencies:</b>

```
$ sudo dnf install ncurses-devel libXt-devel libXaw-devel byacc flex
```


<b># Download the NetHack (3.6.0) source tarball from <a href="http://www.nethack.org/">the official site</a> and unpack it:</b>

```
$ tar xzvf [download]
$ cd nethack-3.6.0/
```


<b># Run the base setup utility for Linux:</b>

```
$ cd sys/unix
$ ./setup.sh hints/linux
$ cd ../..
```


<b># Edit [include/unixconf.h] to uncomment the following line...</b>

```
#define LINUX
```


<b># Edit [include/config.h] to uncomment the following line...</b>

```
#define X11_GRAPHICS
```

<b># Edit [src/Makefile] and update the following lines...</b>

```
WINSRC = $(WINTTYSRC)
WINOBJ = $(WINTTYOBJ)
WINLIB = $(WINTTYLIB)
```

<b># ...to look like so</b>

```
WINSRC = $(WINTTYSRC) $(WINX11SRC)
WINOBJ = $(WINTTYOBJ) $(WINX11OBJ)
WINLIB = $(WINTTYLIB) $(WINX11LIB)
```


<b># Edit [Makefile] to uncomment the following line</b>

```
VARDATND = x11tiles NetHack.ad pet_mark.xbm pilemark.xpm rip.xpm
```

<b># In previous line, apply this <a href="https://github.com/NetHack/NetHack/commit/bb72860ce20cc88eba6aead4943c0a92de44c7d0">bugfix</a> by changing...</b>

```
pilemark.xpm
```

<b># ...to</b>

```
pilemark.xbm
```

---

<b># Build and install the game</b>

```
$ make all
$ make install
```

---

<b># Finally create [~/.nethackrc] config file and populate it with the following:</b>
```
OPTIONS=windowtype:x11
```

---

<b># To play:</b>

```
$ ~/nh/install/games/nethack
```

Go get that <a href="https://nethackwiki.com/wiki/Amulet_of_Yendor">Amulet</a>!
