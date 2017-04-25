---
title: Announcing Motel Version 0.1
date: 2009-09-09
---

<a href="http://projects.morsi.org/Motel">Movable Object Tracking Encompassing Locations</a> is a library/utility written in ruby used to track the locations / coordinates of objects relative to each other in a 3D environment, moving them according to configurable movement strategies. 

I actually was able to quickly bang this out, having started it only three weeks ago. Granted, I'd originally written in this in C++ over the last year and a half, my work on the <a href="http://projects.morsi.org/romic">romic</a> and <a href="http://projects.morsi.org/manic">manic</a> projects ultimately culminating in the C++ version of this project. So most of the design work was done, I was just dissapointed at the pace I was going towards even larger goals, and thus decided to switch languages to Ruby (using activerecord for my db stuff) and use Apache QPID to speed things up a bit.

So now I present Motel, an <a href="http://www.gnu.org/licenses/agpl-3.0.txt">AGPL</a> utility written in Ruby (but also provides an AMQP interface which can be used by a client written in any language) whose sole purpose is to provide a robust way which to track moving locations, configuring them and resolving queries when appropriate. Its still a work in progress, there are quite a few TODOs, and the documentation could use much love, and a user / developer manual written. In lieu of this in the meantime, I'm going to be looking at extracting certain choice snippets from my code, and pasting them to this blog to discuss my design and implementation methodology. Enjoy!

( and btw happy 09-09-09 :-D )
