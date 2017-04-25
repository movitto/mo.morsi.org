---
title: Rails 3 in Fedora 15
date: 2011-03-28
---

<img src="http://rubyonrails.org/images/rails.png" style="float: left; padding-right: 15px; padding-top: 30px; height: 100px;"/>

<div style="float: left; width: 80%">
I am pleased to announce that the last packages required for Rails 3 support in Fedora have been pushed to rawhide and successfully built in anticipation of the Fedora 15 release. Rails 3.0.3 is a major upgrade from 2.3.8 which brings some API incompatibilities as a trade off for many new features. Rails 3 has been submitted and accepted as a <a href="http://fedoraproject.org/wiki/Features/Rails_3.0.3">feature</a> for Fedora 15.

To make use of the Rails RPMs from an earlier release, simply setup the rawhide repo and install rails:

  * sudo yum install fedora-release-rawhide
  * sudo yum install --enablerepo=rawhide rubygem-rails
  
Enjoy!
</div>
<div style="clear: both;"></div>
