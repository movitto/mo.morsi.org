---
title: Debugging Tomcat Using JDB
date: 2007-11-29
---

As a fan of Vim and console development and a staunchent opponent of IDEs (not that they don't have their merrits, they are simply too complicated and too prone to breaking when some miniscule setting is changed IMO), I attempted to figure out how to debug Tomcat using the command line java debugger yesterday. To do so, you will need todo a few things; mainly enable debugging support in the server, locate the source code corresponding to the servlet you will be debugging, and familiarize yourself with the JDB tool.

By default if you run the tomcat startup script catalina.sh with parameters "jpda start" the server will automatically be placed in debugging mode. There are a few caveats to this, and you can configure the behavior of this by opening up catalina.sh and looking at the config options described at the beginning of the file. Whatever you decide to change will need to exported before the script is run, so for example to change the default behavior to force the server to wait until a debugger is attached and the "run" command is invoked (before it tries to load any servled) you would issue a 

       "JPDA_SUSPEND='y'"

You may desire to change some of the other default values, for example the default debugging port Tomcat uses (8000) as it may be employed by some other service (in Fedora 7, the network audio server (nas) is enabled by default and uses that port)


Next you will need to have access to the source code backing the servlet you are debugging. Unfortunately jdb cannot read source out of a jar so you will need to uncompress any source directories that you may have and specify their location to jdb via the command line (though now irrelevant, I discovered yesterday maven can create a source-jar with the "maven-source-plugin" plugin). To start debugging, simply issue the following command: 

      "jdb -attach 8000 -sourcepath dir1:dir2:dir3"

(obviously changing the port and colon seperated source directory list). If the sourcepath isn't specified, the default will be '.'. Furthermore, since java uses the full package/class name to refer to classes, which ties into the paths which they are located, you will need the entire correct directory structure setup correctly under the sourcedir(s) (eg. if you want to debug com.foobar.Class you will need com/foobar/Class.java under one of the sourcedirs specified


You should now be in debugging mode (recall that if the Tomcat suspend option is set, you will have to issue 'run' before the server execution continues). Though I do not have the space to detail everything here, I will list some of the more useful commands that I've found:

 * stop at com.foobar.Class:42    - will insert a breakpoint at the specified line in the specified class
 * stop in com.foobar.Class.myMethod - will insert a breakpoint at the specified method in the specified class
 * clear - list the location based breakpoints currently in place
 * clear com.foobar.Class.myMethod - delete the specified location based breakpoint
 * catch java.lang.Exception - will break whenever an Exception (or one of its derivatives) is thrown
 * ignore - list the exception based breakpoints currently in place
 * ignore java.lang.Exception - delete the specified location based breakpoint
 * step - step though one line of source
 * step up - execute until the current function/method returns
 * next - step over one line of source
 * print var - prints out the value of var
 * where - prints out the stack trace of the current thread

If everything went as expected you should now be able to debug any servlet running in Tomcat. Pretty simple huh? While JDB isn't the most user friendly debugger, it is very simple and intuitive, a value which I hold dearly.
