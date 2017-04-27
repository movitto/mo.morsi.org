---
title: FUDCon Toronto 2009
date: 2009-12-08
tags: fudcon, conference
---

Just got back from the <a href="http://fedoraproject.org/wiki/FUDCon:Toronto_2009">Fedora Users and Developers Conference</a> (FUDCon) in Toronto ON this past weekend. There I gave an introductory talk on the field of Cloud Computing and discussed the current project I'm hacking on @RH, <a href="http://deltacloud.org">deltacloud</a>. The presentation went well and I got alot of great feedback / garnered some more interest in the project. I uploaded the slides <a href="http://mohammed.morsi.org/files/fudcon09.odp">here</a> for anyone that's interested.

The weekend flew by, I drove up on Friday and back tonight (4hr each way). I attended alot of great talks and there were many that I wanted to go to but couldn't due to presentation overlaps. Regardless the ones I attended were all excellent and included

<ul>
  <li><a href="http://www.j5live.com/">J5</a>'s talk on <a href="http://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol">AMQP</a>. As it was an introduction to the topic and since I've done a bit of work using qpid in <a href="http://ovirt.org">oVirt</a> and <a href="http://projects.morsi.org/Simrpc">Simrpc</a>, I was familiar w/ a some of the material and but it still was very interesting and I picked alot of stuff up, such as the semantics of the different message transfer/event protocols, queue security / access control, and thoughts on the direction of AMQP/QPID and integrating it w/ community projects.</li>

  <li>An excellent talk on some of the new features in the <a href="http://www.gnu.org/software/gdb/">GNU Debugger</a> (GDB) including thread support, pretty printing (huzzah!), and C++ expression and namespace handling. When working on <a href="http://projects.morsi.org/Romic">Romic</a> and <a href="http://projects.morsi.org/Manic">Manic</a> and various other C++ projects I used the GDB debugger extensively and ran into many of the issues fixed with this versions. :-)</li>

  <li><a href="http://mairin.wordpress.com/">Mairin Duffy</a>'s talk on UI mockups for developers using <a href="http://www.inkscape.org/">Inkscape</a>. A great presentation on the Inkscape application, geared towards making a wireframe / simple UI mocks for review very quickly so that you can easily spot design problems before you write your first line of code, and so reviews are not as apprehensive about giving you honest feedback (as they would be if you invested a ton of time implementing the UI of your application before asking for a review)</li>

  <li><a href="http://lewk.org">Luke Macken's</a> presentation of his project, <a href="https://fedorahosted.org/moksha/">Moksha</a> a real time webapp platform. Luke and I have discussed Moksha in the past, but usually from a high level "what does it do" point of view, and it was nice to see a detailed analysis of the framework and all the components, and see some live examples in action pertaining to using it. Its really powerful stuff, I recommend everyone check it out.</li>

  <li>A round table discussion about the future of Ruby in Fedora. Ruby's a great language but there are some problems in the current affairs of Ruby such as the incompatibilities between 1.8.6 / 1.8.7 point releases, which might to break alot of software if not handled properly (and thats just forgetting about Ruby 1.9 which is now the 'main' Ruby version). I understand major API changes between main versions (eg 1.8 -> 1.9) but a point release should _never_ have any major core API changes except in the most extreme / rare cases (eg security fixes, but those usually don't entail API changes). This is going to be somewhat problematic for Fedora/Ruby as we now need to support those different versions. Regardless the problem has come up before w/ other interpreted languages that have their own package management systems. Thanks go out to <a href="http://www.kanarip.com/">Jeroen van Meeuwen</a> for maintaining the Ruby rpm and holding the discussion today / leading the effort to resolve this problem. I'm going to be joining the effort to assist that process in the near future.</li>

  <li>An introduction to <a href="http://reductivelabs.com/products/">Puppet</a> the automated data center configuration tool. I have played around w/ puppet via <a href="http://thincrust.org/">thincrust</a> (which oVirt depends on) in the past, but it was good to learn the various components of the puppet framework and how to setup an installation from scratch, using it to configure whatever systems to meet your needs</li>
</ul>

Overall the conference was great, and I am definitely looking forward to attending more FUDCons and other related events in the future.

Until next time, keep hacking!
