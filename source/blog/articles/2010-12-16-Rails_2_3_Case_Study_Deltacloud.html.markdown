---
title: Rails 2 -> 3 Case Study - Deltacloud
date: 2010-12-16
---

<img src="http://rubyonrails.org/images/rails.png" style="float: right; padding-left: 15px"/>
Over the last few days I spent a little while updating <a href="http://deltacloud.org">Deltacloud</a> from <a href="http://rubyonrails.org/">Rails</a> 2 -> 3. The patchset is largely done, our application itself is fully functional, as is the spec suite, though there is a little more to do concerning getting some of our cucumber tests back to a functional state.

The upgrade process itself was fairly straightforward, I started off by creating a new project, then went through the newly created sources, copying the ones over which I could as is, merging the ones that affected files which we've changed. Overall the process is simple, though there were a bunch of nits involving doing things the new way and getting around deprecation warnings and such. 

I'm also glad to say that all the upstream communities which develop and support gems we depend on seem to be on the ball, and while the rpms in Fedora need to be updated, the upstream gems all already support Rails 3. Authlogic is a small exception as it does work w/ Rails 3 but using it results in many ugly deprecation warnings in the logs. To get around these, I had to make the following changes to the authlogic gem itself (all files changes are in /usr/lib/ruby/gems/1.8/gems/authlogic-2.1.6/)

<ul>
<li>lib/authlogic/session/callbacks.rb:  <i>                  s/save_without_session_maintenance(false)/save_without_session_maintenance(:validate => false)</i></li>
<li>lib/authlogic/acts_as_authentic/password.rb: <i>s/save(false)/save(:validate => false)</i></li>
<li>lib/authlogic/acts_as_authentic/logged_in_status.rb: <i>s/named_scope/scope</i></li>
</ul>

All in all here are the following changes that had to be made to our application to make it Rails 3 compliant:

<ul>
<li>
  Framework Changes (taken care of when you create a new rails 3 project):
  <ul>
    <li>new versions of the public/*.html and public/dispatch* files</li>
    <li>all scripts have been placed with script/rails</li>
    <li>prototype.js, rails.js, and other javascripts have been updated</li>
  </ul>
</li>
<li>Bundler is now being used to manage dependencies, remove gems from environment.rb (and specific environments/* config files) and move into Gemfile and Gemfile.lock</li>
<li>Alot of the configuration api has been updated and you will need to change the various files in config/ to reflect this</li>
<li>The Routing API has been overhauled, config/routes.rb will need some significant changes, but the nice thing is you can verify your routes w/ 'rake routes'</li>
<li>
  Application Changes:
  <ul>
    <li>"filter_parameter_logging" is now being taken care of in the configuration</li>
    <li>"master_helper_module.module_eval"  has been replaced by "class_eval" and "helper_method"</li>
    <li>"log_error" is no longer supported, replaced w/ the rails logger</li>
    <li>"request.request_uri" has been replaced w/ "request.fullpath"</li>
    <li>"before_filter" no longer takes an array, rather it just needs to be called multiple times</li>
    <li>I had to change "dispatch" in our templates controller to "dispatch_action" as the former was conflicting with a method added to all the controllers by rspec</li>
    <li>"WillPaginate::LinkRender" is now "WillPaginate::ViewHelpers::LinkRenderer"</li>
    <li>"named_scope" is deprecated, now simply use "scope"</li>
    <li>overriding the "validate" method is now deprecated, rather custom validation methods need to be registered</li>
    <li>"RAILS_ROOT" has now been replaced w/ "::Rails.root.to_s"</li>
    <li>In haml, the "-" operator has been deprecated, rather everything is now handled by "=" whether it outputs anything or not</li>
    <li>form.error_messages_on no longer simply just take text to prepend but rather a hash of which text to prepend/append/etc</li>
  </ul>
</li>
<li>
  Test Changes:
  <ul>
    <li>Various changes to paths and urls to work w/ the new routing api</li>
    <li>The cucumber and rspec rake tasks have been updated</li>
    <li>All the specs need to "include Authlogic::TestCase" to make use of authlogic</li>
    <li>The "route_for" test helper has been replaced w/ 'route_to'</li>
    <li>The activerecord 'destroy' method no longer returns false, but an empty array (at least from my findings)</li>
    <li>Mock('foo', :null_object => true) has been replaced with mock('foo').as_null_object</li>
    <li>Activerecord errors do not support the 'on' method anymore (at least its deprected) rather you can access errors on specific fields by passing that field name as a hash key, which will return an array of errors</li>
  </ul>
</li>
</ul>

For reference here is the patchset updating Deltacloud to Rails 3. I can't push the changes to our codebase until Rails 3 is in Fedora with all the gems that depend on it, but the tentative goal is to do so by Fedora 15 (we have done some preliminary work to update the rpms on this front, but there is still a ways to go, help is always appreciated). 

<ul>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003445.html">Intro</a></li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003446.html">Rails 2->3 framework changes</a>, nothing specific to deltacloud</li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003448.html">prototype.js and rails.js updates</a>, also 100% rails, nothing specific to deltacloud, but large enough to justify their own patch</li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003447.html">gem dependency changes</a>, introduces Gemfile for bundler</li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003451.html">deltacloud rails 3 config changes</a></li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003450.html">deltacloud rails 3 application changes</a></li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003449.html">deltacloud rails 3 views changes</a></li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003452.html">deltacloud rails 3 spec/cucumber changes</a></li>
<li><a href="https://fedorahosted.org/pipermail/deltacloud-devel/2010-December/003453.html">misc changes</a></li>
</ul>


Hope this helps anyone looking to upgrade. It is a bit of a process, but the new Rails 3 changes are nice and look like they make more things consistent. Enjoy!
