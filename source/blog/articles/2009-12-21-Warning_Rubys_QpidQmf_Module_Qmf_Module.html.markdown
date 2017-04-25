---
title: Warning - Rubys Qpid - -Qmf Module != Qmf Module
date: 2009-12-21
---

Something to look out for for anyone interested in using Apache QMF.

The Ruby Qpid::Qmf module (as provided by the ruby-qpid package in fedora) is a qmf implementation written purely in ruby (history/source can be found <a href="http://svn.apache.org/viewvc/qpid/trunk/qpid/ruby/lib/qpid/qmf.rb?view=log">here</a>).

The Ruby Qmf module (as provided by the ruby-qmf package in fedora) is the ruby binding to the C++ QMF library. It is <a href="http://svn.apache.org/viewvc/qpid/trunk/qpid/cpp/rubygen/amqpgen.rb?view=markup">auto</a><a href="http://svn.apache.org/viewvc/qpid/trunk/qpid/cpp/rubygen/">generated</a> along w/ the ruby bindings to the qpid library (qmf / qpid are <a href="http://osdir.com/ml/dev-qpid.apache.org/2009-05/msg00112.html">seperate</a> <a href="http://svn.apache.org/viewvc/qpid/trunk/qpid/cpp/src/">libraries</a> now)

It is my understanding based on how these things work, that the Ruby QMF module is more complete and robust, containing the full implementation of the C++ QMF library, adapted to ruby. The QPID::QMF module is a more convenient utility, with nicer methods / classes to use, but a bit more limited in functionality. Which module the developer uses depends on their needs.

As I explore QMF so more I'll make sure to report back with my finding on the differences. I'm already hosting the <a href="http://morsi.org/projects/ruby-qpid-api/">QPID::QMF</a> API docs, and have just updloaded the <a href="http://morsi.org/projects/ruby-qmf-api/">QMF</a> API docs for anyone thats interested (at least until they are officially hosted on <a href="http://qpid.apache.org">qpid.apache.org</a>).

Enjoy!
