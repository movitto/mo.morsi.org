---
title: Phusion Passenger / Fedora Woes
date: 2010-09-14
tags: fedora, passenger, ruby
---

<img src="http://www.modrails.com/phusion_template/logo-trans.png" style="float: left;" />The <a href="http://www.modrails.com/">Phusion Passenger</a> <a href="http://fedoraproject.org/">Fedora</a> package <a href="https://bugzilla.redhat.com/show_bug.cgi?id=470696">submission</a> has been open for nearly two years running. Many various issues have been resolved since the original submission (many thanks to all those involved for their hard work), but there is one last major blocker which is proving to be a headache for this process.

Namely passenger vendorizes the <a href="http://www.boost.org/">boost</a> thread library. This is done to add some additional features (see the bugzilla issue, I won't go into details here) but this is unacceptable for Fedora, and thus until it is removed, rubygem-passenger can't be included. The idea behind this rule is that if a library releases some security or other updates, we manually have to include those in each project that vendorizes it.

As indicated by an upstream developer, passenger should work against the stock boost shipped with Fedora, albeit without some of the additional features. But since the change would be fairly invasive and those features would be removed, they are going to enforce their trademark on "phusion passenger" and insist it be renamed to something else if we make these changes. Of course they are within their legal right to do so though IMHO (and this is my opinion only) this may cause some reluctance to adopt passenger as one of the strongest points pertaining to FOSS is the ability to redistribute code easily with as few barriers as possible.

So this is where we are, should we choose to patch passenger to work against the stock boost, we will have to rename it, else we will not be able to ship passenger at all (without a FESCo exception, which is unlikely for these reasons). Granted while you can still get it via gem, this is not acceptable for all deployment scenarios, and it would be good to have it in Fedora regardless. 

This is one of those issues where both sides are correct for their own reasons, and there is no intrinsically right or wrong answer, just different approaches / ideologies.  Any thoughts? (looking for solutions acceptable to everyone, no flamewars)
