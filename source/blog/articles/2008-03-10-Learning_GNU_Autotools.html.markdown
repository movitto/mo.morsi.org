---
title: Learning GNU Autotools
date: 2008-03-10
---

Well in my first blog post since January 1st, I will be discussing and sumarizing what I learnt over the past few days relating to the GNU Autotools, specifically autoconf and automake. Having been a C++ fan since I learned it (roughly nine years ago, it was my first language), I never got around to learning the GNU build system (seeing as there is not much use in web development). Regardless, I set out to learn it as I need to incorporate it into my new currently-top-secret project. Note, I am writing this as I learn it and am no expert yet. 

Theres alot of clutter out there when it comes to these, but to put it simply it all comes down to two files:
   <b>configure.ac</b> and <b>Makefile.am</b>  (extensions being for autoconf and automake respectively)

configure.ac is where macros are used to list project wide metadata and variables, run tests to check for requirements needed by the project, and configure the build system as fit. Makefile.am is where you list your sources and header files, compiler and liker flags, and anything else directly being fed into the build system. Every subdirectory in which 'make' needs to be run in (whether it be for code, tests, docs, etc) needs a Makefile.am (optionally with a configure.ac???)

To start, let me paste the configure.ac from the project that I am working on:

<pre>
AC_PREREQ(2.61)
AC_INIT(myproject, 1.0, myemail)
AC_CONFIG_AUX_DIR(.config) # use '.config' configuration directory
# AC_CONFIG_HEADER(config.h) # 'autoheader' command to generate config.h.in

AC_PROG_CXX
AC_PROG_LIBTOOL
AM_INIT_AUTOMAKE

ROOT_DIR=`pwd`
AC_SUBST([ROOT_DIR])

CXXFLAGS=-I$ROOT_DIR/util/include/

AC_OUTPUT(Makefile \
          db/Makefile \
          db/model/Makefile)
</pre>

* Here we see calls to macros such as AC_PREREQ and AC_INIT to set parameters, metadata and start the build system. 
* The configuration directory is set to '.config', which autoconf will populate with various scripts and data files. Various other configuration means may be employed. 
* The target language is set to C++ (AC_PROG_CXX), libtool is included to be able to compile libraries and automake is set to automatically run.
* The ROOT_DIR variable is set and output for use in the makefiles. There are plenty of built-in / standard variables output. 
* The standard variables CXXFLAGS is set to include the project wide util/include directory
* Lastly the Makefiles which the autotools system will generate are listed

Inspecting Makefile.am in the project root directory we find, 

<pre>
AUTOMAKE_OPTIONS = foreign  # disable checking for GNU files 
SUBDIRS = db 
</pre>

The first line simply disables GNU validation, this is probably a bad idea to do as files such as README and INSTALL are critical for a user's experience, but is fine for temporary, in development purposes. The only meaningful line in this file lists on subdirectory to traverse, looking for additional configuration files to use in the build system. Most projects will define an output mechanism (see below) here for the ultimate project build target, but thats not what I'm going for with my application. Looking at db/Makefile.am we see,

<pre>
AUTOMAKE_OPTIONS = foreign  # disable checking for GNU files
MYLIB_INCLUDE=-I $(ROOT_DIR)/mylib/
AM_CXXFLAGS=$(CPPFLAGS) $(MYLIB_INCLUDE)

lib_LTLIBRARIES = libdb.la
libdb_ladir = @top_srcdir@/db/
libdbl_la_SOURCES =     base.cpp
libdb_la_HEADERS= \
        db.h \
        base.h 
</pre>

Here we simply append an additional include directory onto the compiler flags string, set the library to compile (in this case we are calling it 'libdb'), setting the source of that library (another variable for the root source directory is used here, @top_srcdir@) and specifying the input files to use during compilation. If we wanted to generate a binary executable instead of a library we would replace <i>lib_LTLIBRARIES = libdb.la</i> with <i>bin_PROGRAMS = db</i> to generate an executable called 'db'

To actually use these files, create the following executable "autogen.sh" script in the root project directory:

<pre>
#!/bin/sh
autoreconf --force --install -I config -I m4
</pre>

Every time you run this, this will rerun the autoconf and automake commands as well as various others ensuring the build system is up to date. After this is executed, simply run the standard './configure && make' to build the project

Well thats a very brief overview into the autotools system. I'm sure there is a ton of info that I don't know, but thats half the fun! There are alot of resources out there, but these are among my favorites so far.

<a href="http://sources.redhat.com/autobook/">Comprehensive RH Autotools guide</a><br/>
<a href="http://www.gnu.org/software/autoconf/manual/autoconf.html">Official Autoconf Manual</a><br/>
<a href="http://www.gnu.org/software/autoconf/manual/autoconf.html#Autoconf-Macro-Index">Builtin Autoconf macro index</a> (some libtool and other macros are missing and can be found elsewhere on the web<br/>
<a href="http://sources.redhat.com/automake/automake.html">RH Automake Manual</a><br/>
The Unix/Linux programming links <a href="http://www.openismus.com/documents/">here</a> covers the topic very nicely.<br/>
<a href="http://www.geocities.com/foetsch/mfgraph/automake.htm">Good primer / tutorial on the subject</a>
