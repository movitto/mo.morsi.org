---
title: Releasing Simrpc
date: 2009-09-11
---

<a href="http://projects.morsi.org/simrpc">Simrpc</a> is a simple rpc implementation written in Ruby, relying on <a href="http://qpid.apache.org">Apache QPID</a> for the transport mechanism. I modeled it after Apache QMF, though nowhere near as complex (simrpc is procedural based for example, with data structures only encapsulating data, and not methods), intended to be a placeholder until QMF becomes a bit more stable.

I was able to whip it up pretty quick, it only took me a week to write end-to-end, and thus I'm releasing it under the <a href="http://en.wikipedia.org/wiki/MIT_License">MIT License</a> instead of my usual favorite, the <a href="http://www.fsf.org/licensing/licenses/agpl-3.0.html">AGPL</a>. Eventually its a possibility that I might rewrite it in C++ as there isn't anything ruby-specific in it and I could easily then after write a Ruby wrapper (or any other).

Have at it!
