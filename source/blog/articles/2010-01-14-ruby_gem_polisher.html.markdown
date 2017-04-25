---
title: ruby gem polisher
date: 2010-01-14
---

For anyone that missed it Pavol Rusnak had an excellent blog <a href="http://stick.gk2.sk/blog/2010/01/gemcutter-opensuse-build-service-cooperation-idea/">post</a> on Fedora Planet regarding the current state of rubygems, specifically with gemcutter becoming the <a href="http://update.gemcutter.org/2009/10/26/transition.html">official</a> rubygems source and the introduction of the new gemcutter webhook <a href="http://update.gemcutter.org/2009/10/26/transition.html">API</a> to register callbacks to be invoked on gem updates. Also discussed is <a href="http://rubyforge.org/projects/gem2rpm/">gem2rpm</a>, which automatically converts a gem to a rpm specfile / srpm, and the need of a tool to bind those two components together.

Introducing Polisher which does just that, a rails based webapp that allows a user to add any number of gem sources, customize the packages they want to track, and register handlers to be invoked on certain gem events. Currently I have handlers to simply send an email, and/or generate a rpm artifact from the gem, and the interface is extensible enough so that anyone can add any event handler easily. I am currently working on a module that will automatically submit a bugzilla request for the gem/rpm. This will entail a feature akin to the 'dirty bit' discussed in Pavol's blogpost, for packages that need extra maintenance before submission, but polisher will still assist in the process in any case (and its possible we can develop a maintenance automation system which runs a maintainer's scripts to make changes to the package before bugzilla submission).

It is still early in development, the current state is the result of only a few days of coding, but I think it's already useful for the Ruby -> Fedora process. Lots of things still need to be added, there is no-multiuser support currently for example, but I'm already able to register callbacks for gemcutter gems, which upon being updated, get invoked. 

Polisher is a webapp since the gemcutter webhook API takes a http url which to invoke w/ POST params on a gem update. Whoever will want to run this will need a public-facing domain to do so. I put a copy up on my personal domain, feel free to give it a try, just please don't try to stress test it ;-) (and forgive the simplistic interface, was going for functional/quick). <a href="http://projects.morsi.org/polisher/demo">polisher demo</a>

At some point, if this takes off, it would be awesome to get some hosting space for the Fedora community, and to setup an automated Ruby->Fedora workflow engine, w/ maintainer intervention at the appropriate points.

The polisher source is licensed under the GPL and can be downloaded from <a href="http://github.com/movitto/polisher">github</a>. I also pushed the polisher gem to the gemcutter repo and you can install it w/ <b>gem install polisher</b> provided you have a recent enough version of rubygems (w/ gemcutter officially part of the repo list).

Speaking of rubygems I've also pushed gems for several of my other projects including <a href="http://projects.morsi.org/wiki/RXSD">rxsd</a>, <a href="http://projects.morsi.org/wiki/Simrpc">simrpc</a>, and <a href="http://projects.morsi.org/wiki/Motel">motel</a>, all of which are now available via gem install. Enjoy!
