---
title: Follow up on Manic
date: 2009-08-17
---

So even though I've just only recently released manic and have been working alot on it the past year or so, particularly the past few weeks, I am most likely going to be discontinuing development on it in the immediate future. Honestly there are several outstanding / critical bugs (eg segfaults and others) and it would involve too much of my time to resolve everything to the point I'm happy with it. 

Not to say the experience wasn't worthwile, the library works great for the most part (all the current tests pass though there are a few commented that don't), and I learned alot when writing it. Obviously I'm going to keep it where it is on the web incase anyone else wants to take it and run with it. For the immediate future, I'm going to do my network development using <a href="http://qpid.apache.org/">Apache Qpid</a>  which is a very powerful open source messaging framework, that many players in the industry seem to be rallying around, and looks like it does everything I need (albeit a little more complex than I was hoping but it is a complex topic). 

While part of life is seeing your work through to the end, part is knowing when to cut your losses and focus your efforts and time in more productive areas. I've uploaded the last patch that I was working on along with this blog post, and if anyone wants to make use of it, you can easily do so by downloading it and running (in the manic checkout dir):

  git-am last.patch
