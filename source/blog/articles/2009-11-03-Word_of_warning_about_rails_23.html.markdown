---
title: Word of warning about rails 2.3
date: 2009-11-03
---

Rails in Fedora was upgraded to 2.3 in F11. When working on <a href="http://ovirt.org">oVirt</a> today, I discovered that changes to my templates were not being served to the user until I restarted mongrel/rails. Quickly searching around for the issue, I stumbled upon the Rails 2.3 <a href="http://guides.rubyonrails.org/2_3_release_notes.html">changelog</a>, particularly <a href="http://guides.rubyonrails.org/2_3_release_notes.html#a-note-about-template-loading">this section</a> which states:

<i>In most cases, you'll want template caching to be turned on in production, which you can do by making a setting in your production.rb file:
config.action_view.cache_template_loading = true</i>
<i>This line will be generated for you by default in a new Rails 2.3 application.</i>

While this is an excellent default for production systems, for development this is undesired (eg you'll need to restart mongrel every time you make a template change no matter how small), and thus adding the following to config/environment.rb resolves the issue (preferably you'll just enable in in your dev environment, but I didn't really care as this is on my dev box)

<i>config.action_view.cache_template_loading = false</i>
