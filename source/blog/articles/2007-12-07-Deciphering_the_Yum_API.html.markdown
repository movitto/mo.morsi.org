---
title: Deciphering the Yum API
date: 2007-12-07
---

My current side project (to be announced/released soon) involves using the Yum Python API. Unfortunately I have yet to find a good tutorial or guide, though there are many apps which use the Yum API such as yumex, so I figure I'd share some knowledge about my findings. Note that I am using Yum version 3.2.7 and everything presented here is derived from my studying of the code.

/usr/bin/yum simply calls out to /usr/share/yum/yummain.py which then instantiates classes deriving from YumBase. YumBase defined in the yum library <b>/usr/lib/python2.5/site-packages/yum/</b>, specifically __init__.py, is the main interface into the API and will provide alot of the high level functionality that you would want to access. 

Perhaps one of the simpler actions is listing the packages installed on a system. This is accomplished by accessing the rpmdb member of a YumBase instance, representing your local rpm database, which if iterated over will return the list of installed packages. The rpm interface is invoked to generate the package list from which instances of YumInstalledPackage (defined in packages.py) are created. The base class, YumHeaderPackage, contains all the fields which you would want to access, including <b>name, arch, epoch, version, release, summary, description, pkgid, packageSize, hdr["buildtime"]</b>

To put it shortly, to access all of your installed packages via yum you would:
<pre>
import yum
class Test(yum.YumBase):
    def __init__(self):
        yum.YumBase.__init__(self)
        i=0
        for pkg in self.rpmdb:
            print pkg.name + " " + pkg.description
            i += 1
        print str(i) + " packages"

Test()
</pre>

RPMDBPackageSack implements several useful functions including "installed" which takes a package and tells you if it is installed, "searchAll" which searches for packages based on name, and "getProvides" which searches based on files they provide. The drawback of these routines though is that only the local rpm database is searched. To search yum's repositories you must use YumBase's searchGenerator and searchPackageProvides functions. searchGenerator takes a list of fields to search and a list of criteria to match. For its search functionality the yum command uses the criteria <b>['name', 'summary', 'description', 'packager', 'group', 'url']</b> (or course you can simply just include "name" to a name based search). To search for the dovecot and k3b packages you would:

<pre>
import yum
class Test(yum.YumBase):
    def __init__(self):
        yum.YumBase.__init__(self)
        searchlist = ['name', 'summary', 'description', 'packager', 'group', 'url']
        args = ["dovecot", "k3b"]
        matching = self.searchGenerator(searchlist, args)
        for (po, matched_value) in matching:
            print po.name + " " + po.description

Test()
</pre>

The problem with searching is it will match any package with your search criteria in it. So for example, if you search for "k3b", you will get the k3b-devel package in addition to k3b. To retrieve an exact match you need to invoke the 'list' functionality of the yum api. Unlike search, you instruct yum to list all packages and then apply filters to the package lists to isolate what you are looking for. So to list the k3b package you would:
<pre>
import yum
class Test(yum.yumBase):
     def __init__(self):
        yum.YumBase.__init__(self)
        pl = self.doPackageLists('all') # can specify installed, updatable, available, and more
        exactmatch, matched, unmatched = yum.packages.parsePackages(pl.installed, ["k3b"])
        exactmatch = yum.misc.unique(exactmatch)
        # loop is used because multiple matches will be returned
        # if more than one package is found with the name in the
        # repo (different versions or arches for example)
        for pkg in exactmatch:
            print po.name

Test()
</pre>

Installing, removing, deleting packages is slightly more complicated as you need to mark the package operations before building a transaction, and finally processing it. To install dovecot and remove k3b you would:

<pre>
import yum
class Test(yum.YumBase):
    def __init__(self):
        yum.YumBase.__init__(self)
        searchlist = ['name']
        args = ["dovecot", "k3b"]
        matching = self.searchGenerator(searchlist, args)
        for (po, matched_value) in matching:
           if po.name == "dovecot":
              self.install(po)
           elif po.name == "k3b":
              self.delete(po)
        # build and process the batch transaction
        self.buildTransaction()
        self.processTransaction()
Test()
</pre>

Of course there is a lot more to the Yum API than summarized here. Unfortunately, there isn't much way of documentation on it on the net (remember while Yum makes it simple to access its API with invoking the command, it is primarily a program as opposed to a library). Probably your best bet is going to the <a href="http://www.yum-extender.org/dnl/misc/yumguicore/docs/public/indices.html">Yumex online API</a> which partially covers the yum api (most importantly, the yum.YumBase class, the main interface into Yum). Of course all the yum library and application code is out there, along with the code behind other tools which use yum, including yumex, pirut, and pup. Good luck!
