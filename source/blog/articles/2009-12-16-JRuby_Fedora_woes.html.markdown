---
title: JRuby / Fedora woes
date: 2009-12-16
---

I spent a little while looking into the current state of <a href="http://jruby.org">JRuby</a> in <a href="http://fedoraproject.org/">Fedora</a>. It turns out it's not so good, the <a href="https://admin.fedoraproject.org/pkgdb/packages/name/jruby?_csrf_token=cbab9bc194abd9bb3940b38a88759fb5f5eae142">JRuby</a> <a href="http://cvs.fedoraproject.org/viewvc/rpms/jruby/">package</a> itself has been orphaned and is no longer available starting in F12, as well as several of its Java dependencies, not to mention recent versions of JRuby have added several more dependencies which have yet to be packaged. All in all the following software needs to be packaged and accepted into Fedora before JRuby can be:

<ul>
<li><a href="http://kenai.com/projects/jffi/sources/core/show">jffi</a></li>        
<li><a href="http://martiansoftware.com/nailgun/index.html">nailgun</a></li>
<li><a href="http://kenai.com/projects/jruby-embed">jruby-embed</a></li>        
<li><a href="http://www.cs.rit.edu/~ats/projects/lp/doc/jay/package-summary.html">yydebug</a></li>   
<li><a href="http://github.com/olabini/yecht">yecht</a></li>
<li>bytelist (<a href="http://cvs.fedoraproject.org/viewvc/rpms/bytelist/">orphaned</a>)</li>
<li>constantine (<a href="http://cvs.fedoraproject.org/viewvc/rpms/constantine/">orphaned</a>)</li>
<li>jcodings (<a href="http://cvs.fedoraproject.org/viewvc/rpms/jcodings/">orphaned</a>)</li>
<li>joni (<a href="http://cvs.fedoraproject.org/viewvc/rpms/joni/">orphaned</a>)</li>
<li>emma (already in Fedora, a dependency just needs to be added to the JRuby rpm spec)</li>        
<li>jvyamlb (is no longer a JRuby dependency and can be removed from the jRuby rpm spec)</li>
</ul>

Of course JRuby itself ships w/ these jar's included, but due to the <a href="http://fedoraproject.org/wiki/Packaging:Java#Pre-built_JAR_files_.2F_Other_bundled_software">Fedora Java Packaging Guidelines</a> concerning this matter, jars cannot ship in any Fedora packages and must be standalone / included in the RPM dependencies

So it seems that a JRuby package in Fedora will be tricky for the time being until these dependencies are resolved, I would like to devote some cycles to this at some point, but given the current state of things, it'll take alot longer than I currently have. Its a great project for anyone thats interested, even those w/ no Fedora packaging experience as there is alot of work already done that you can leverage. At some point I might just package the latest jRuby release up (jars included) and push it to my yum.morsi.org yum repository for convenience sake, but obviously this would be suboptimal to getting JRuby in Fedora.
