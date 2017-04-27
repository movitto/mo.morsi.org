---
title: Another word of warning about Ruby On Rails 2.3
date: 2009-11-03
tags: ruby, rails
---

I'm not sure if this was introduced in 2.3 or a prior version but today several of us working on the oVirt project discovered that Rails is now _requiring_ i18n localization translations for alot of stuff, namely the activerecord model validation errors. 

Though i18n is a great feature, we have no time to write lots of translations right now, and we're still looking into how to turn this off (if even possible, I will update this post with the final solution when we find it). 

IMHO the rails guys really shot themselves in the foot with this one. Even if it can be turned off, it shouldn't be turned on by default as its an extra feature than many people don't need and currently causes major breakage. 

If you are a developer working on rails, make sure to look out for this when upgrading your rails instance (honestly I would wait, there seems to be many new 'features' causing issues and breakage).

&lt;/rant&gt;
