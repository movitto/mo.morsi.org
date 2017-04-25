---
title: C++ Reflection w/ Reflex
date: 2009-05-09
---

Once again sorry for the lack of updates; I'm sure many out there know what it is like to be busy as hell, and have things they really want to do (eg maintain this blog) pushed back in priority.

Today I'm going to briefly discuss the C++ reflection library and corresponding utilities known as <a href="http://seal-reflex.web.cern.ch/seal-reflex/examples.html">Reflex</a>. I'm still working strong on my to be announced / released side projects, and have been using Reflex to utilize some reflection / introspection into my C++ apps. While I love C++, it has it flaws, and one of the biggest and most annoying in my opinion is the lack of reflection and the (imho subborn) insistance by the inventor to not include it. Every modern powerful language / compiler has reflection / introspection included, with the exception of C++, and until the day it's included, C++ will never be truly complete (and honestly the external solutions such as Reflex and the others can't come close as they are no where near as optimized as it could be if it were in the compiler (also RTTI doesn't cut it)) </rant>

Don't get me wrong, Reflex works great, and albeit a single issue (discussed in a bit) its has done everything I've needed it to. You can check out Reflex via svn at the project site, and compiling is a straight forward configure / make process. I haven't found any existing rpm,deb,etc packages for Reflex, so you'll have to build from source, but I may look into making some especially if my projects take off. Reflex also relies on <a href="http://www.gccxml.org/HTML/Index.html">gccxml</a> to parse the C++ source code into xml, which also needs to be checked out and compiled.

Once you compiled gccxml and reflex, use the <a href="http://seal-reflex.web.cern.ch/seal-reflex/gendict.html">python/genreflex/genreflex.py</a> executable to generate the reflection dictionary, necessary classes, and every else needed from your code like so:

```
python python/genreflex/genreflex.py [input_headers]\
        -o [outputdir] --gccxmlpath [gccxml_bin_dir]\
        --gccxmlopt="--gccxml-gcc-options [gccxml_options_file]" --debug 1
```

(there is also a genreflex06.py executable which I'm assuming handles and updated specification of the c++ language but I'm not sure as I haven't used it)

This will take the classes defined in any headers you specify, compile them using the gccxml in the directory you specify (if you don't do a 'make install' the directory should be /build/bin/ under your gccxml checkout dir) with the gcc options as specified in gccxml_options_file (eg -Iincludepaths -g or whatever), and output the result in the -o directory you specify. 

You can then compile the files in this directory into your project / include the generated class headers where needed, and utilize the <a href="http://seal.web.cern.ch/seal/documents/dictionary/reflex/doxygen/html/index.html">Reflex API</a> (-I[reflex_dir]/reflex/inc) to interact w/ these classes, utilizing introspection (see some <a href="http://seal-reflex.web.cern.ch/seal-reflex/examples.html">examples</a>).

Its a fairly straightforward process and with minor debugging / tweaking you should be good to go.... 

So I thought until the other day when I was scaling up the number of parallel tasks going on and discovered Reflex is not fully thread safe. To make a long story and lots and lots of debugging short, it seems there is an issue with Reflex where when it generates wrapper methods and functions around ones that return simple / fundamental data types (eg. int / float / etc), it statically stores the return value in the generated method and simply returns the address of that variable. Thus if two threads are trying to invoke that method, even if they have different instances of the object, the static data will be overwritten, and at least one of the threads will have the wrong data. Instead it should allocating a new instance of the simple data type on the heap and return the address of that, as it does w/ non-primitives.  After a bit of debugging, I've come up with a simple patch (it is against the 25049 revision and currently reflex is at 28507, but it is simple) which from what I've seen works (and hopefully doesn't break anything) and which I have yet to submit to the Reflex community, but will upload here for the time being (attached). If you want to debug this as well, add "AM_CXXFLAGS = -g" to src/Makefile.am in your reflex checkout directory before re- configuring, compiling, linking. 

Hope this all works for you and helps, I'll look to writing more on the topic, and actually maintaining this blog :-)
