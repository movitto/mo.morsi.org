---
title: Invoking method_missing methods in Ruby
date: 2009-08-28
tags: ruby
---

So here's another quick Ruby tip. <a href="http://www.ruby-doc.org/core/classes/Kernel.html#M005925">Kernel.method_missing</a> is a way to catch all invocations to methods in whatever scope you want that aren't defined. While discouraged from widespread use, eg since it can be hard to debug and can lead to sloppy programming, it does have legitimate / good use cases, for example ActiveRecord uses it to automatically map methods to database columns without requiring developers to explicitly write a getter/setter for each.

Now lets say you want to invoke a method on an object via reflection / introspection. Normally you would run 

<pre>
object.method("methodname").call params
</pre>

<a href="http://www.ruby-doc.org/core/classes/Object.html">Object.method</a> returns an instance of the 'Method' object, on which you can invoke 'call' with parameters to invoke that method. If the named method is not found, an exception is raised.

Unfortunately this will be the case for "methods" handled by method_missing. To invoke these methods meta-programatically, we use another feature of the 'Object' class, <a href="http://www.ruby-doc.org/core/classes/Object.html#M000336">send</a>. The Ruby backend uses message passing to invoke methods on objects among other things, and the send method explicitly sends a new method invocation message to your object, which will be caught by method_missing if not present.

<pre>
object.send(:methodname, parameters)
</pre>
<!--break-->
