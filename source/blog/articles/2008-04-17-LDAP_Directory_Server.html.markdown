---
title: LDAP Directory Server
date: 2008-04-17
---

Several years back, during my job at the Living School Book, I was tasked to admin a small LDAP server for a small project we were working on. It was all new too me at the time, and I took a while to learn it, writing up an article in the process. Lo and behold my time spent was worthwhile as I've been helping my current coworkers get up to speed on how LDAP works and is administrated. To help out, <a href="http://sean.keesler.org/">a former coworker (and good friend)</a> helped me digg up this ancient article I wrote (alright only a few years old and everything is still relevant) on getting started with LDAP. Enjoy!

<u>I. What is LDAP?</u>
LDAP stands for Lightweight Directory Access Protocol, and as the name suggests is a Lightweight protocol for accessing Directory services. A directory is a specialized collection of records, not completely unlike a conventional database (DB), optimized for reading and searching. A directory can store a multitude of descriptive information about essentially any entity. For example one could have a directory storing information about people in an organization, automobiles on the road, and resources in a library. An analogy for a people directory would be a phone book, which stores important information pertaining to a person. LDAP specifies standards for storing the information in the directory, accessing it, and performing any necessary operations on the data. 

<u>II. How is LDAP implemented?</u>
There are several LDAP server applications available for commercial use. These include OpenLDAP,  Red Hat Directory Server, and Microsoft Active Directory. For this documentation I have used OpenLDAP version 2.3. For the remainder of this document I will refer to OpenLDAP as simply LDAP

<u>III. How does it work?</u>
Conceptually, LDAP stores it's directory in a tree like structure for fast access and authentication. In reality, the LDAP server stores the information in one of several backend databases, which the administrator selects, the most common of which is the Berkeley Database (BDB). One instance of the LDAP server may serve more than one directory, each of which may be stored in a different backend. Each entity in the directory is represented as a tree node, and may have many attributes associated with it as well as additional nodes stemming from it. Each entry must have one Distinguished Name (DN) which uniquely identifies the node. From this point on, the words note and entry and entity will be used interchangeably.

For example, a company's people directory may look like this:

<img src="http://mohammed.morsi.org/blog/files/images/ldap-example.png" alt="Ldap Tree" />

(only DN an objectClass are listed; attributes and such are not displayed. See below for description of tree)

In this example we see the DNs of several entities in the organization's tree. The top node, or the root node, is the starting point in this directory's tree structure. The DN of the root node (this is not the rootDN) is known as the suffix of the directory, and each DN in the directory must contain the suffix. Expanding this, a node can be the child of another node only if the parent node's DN is a subset of the child node's (eg. the child node must contain some distinct information followed by the DN of the parent node). This allows the tree to follow a general-to-specific structure, where the nodes at the top of the tree contain general information regarding the directory's contents and filters to specific information as you move down the tree.

The directory's suffix is generally the url of the domain to which the LDAP server is serving, broken into Domain Components (DCs) (periods are the delimiters). In our example, this LDAP server would be providing directory services to clients in the company.com domain. If the directory suffix were simply dc=com, the server would serve all url's in the .com domain (yes all of them). When determining a directory suffix, one should be sure to make it broad enough to serve all domains intended to serve (eg. a suffix of dc=mail,dc=yahoo,dc=com would not serve movies.yahoo.com) but not too broad so that it serves all unnecessary domains (eg. if your suffix was dc=com then anyone with access to your server and a .com domain would be able to authenticate against it, a potential security risk).

Continuing the example, we see that underneath the root node, there exists a people organizational unit (indicated with the ou). At this time there is only the one node directly under the root, but there may be as many as you need. For example, if you wanted to add an automobile branch to this directory, you simply would add a node with a DN of 
<pre>
            ou=automobiles,dc=company,dc=com
</pre>
or if you wanted to divide your organization by location before adding people, you would remove the existing people branch and add the following (for example): 
<pre>
           l=Syracuse,dc=company,dc=com
           l=NYC,dc=company,dc=com
           l=London,dc=company,dc=com
</pre>
and then
<pre>
          ou=people,l=Syracuse,dc=company,dc=com
          ou=people,l=NYC,dc=company,dc=com etc. (where 'l' stands for location) 
</pre>
At each branch we add one more level of detail; in the example, we add managers and users under the people branch as those are two different categories of people. And underneath these branches we have the descriptors of actual users (though you may branch off as many times as you want to at any point, even under individual users). 

It is important to note that LDAP does not distinguish between nodes. There is no difference between the root node, any organizational unit node, or any specific person's node, except the information that is stored within them, which is determined by the administrator. Each node is handled the same way and can have attributes, children, etc. The type of information stored in a particular entry is determined by the objectClass(es) of that entry. An objectClass is a collection of attributes used to describe entries in the directory. Any particular entry must have at least one objectClass but may have up to an indefinite amount. ObjectClasses are defined in special schema files which define the objectClass and which attributes must have values and which attributes may have values for instances of the objectClass. (eg. entries corresponding to the 'person' objectClass must have a common name (CN - or the first name of the person) and a surname (SN - or the last name of the person) and may have multiple other defined attributes such as address and telephone number; entries corresponding to the 'organizationalUnit' objectClass must have a value for the organizationalUnit (ou) attribute and may have other attributes such as registered Address, and location; and entries that corresponding to both 'person' and 'organizationalUnit' objectClasses must have values for the cn, sn, and ou attributes and may have values for any of the other attributes listed under either.) Attributes are also defined in the schema files, where their name, description, and syntax (what type of attribute they are, boolean, numerical, string, etc) are indicated. Attributes must be defined before they are used by an objectClass and objectClasses must be defined before they are used to store information in the directory.


<u>IV. Configuring LDAP</u>
The main openLDAP configuration file is slapd.conf located in the /etc/openldap directory (assuming openLDAP has been installed in the default location). All schema definitions, directory definitions (each directory which the server services must be defined and configured), and other directives must be present in this file. For readability and other purposes, the file may include other files through the use of the 'include' keyword. By default, the schema files are located in a special schema directory and included in the main conf file. The slapd.conf configuration file is essentially split up into three sections, general directives, backend directives, and database directives. Any configuration options located under the first will apply to all directories serviced by the LDAP server. The second will only apply to directories that match the specified backend type. For example under the 'backend bdb' section, we would have configuration directives that apply to all directories that used the BDB database. Options in the general section may be overruled by options in the backend section. The last section (database) applies to specific directories. Each directory must have one section specified in this file, and this section applies only to that directory. In addition all options and directives in a database section will override directives in the general section and backend sections corresponding to the backend that the directory uses.

<pre>
   # Sample slapd.conf file
   backend bdb
   backend whatever
   # More backend definitions here
   # New directory, with a bdb backend
   database bdb
   # Another directory with a bdb backend
   database bdb
   # Another directory with a whatever backend
   database whatever
   # More directory definitions here
</pre>


Lines beginning with a # are comments
If a line begins with whitespace (either tab(s) or space(s)) it is a continuation of the previous line.
"Whatever" is not actually a backend type, it is merely used for illustration purposes.
In this document I will not cover all the details and directives concerning the LDAP configuration file, these can be found at the openldap site (see references). 

For the most part global directives are strait forward. Any config options here should be applicable to all directories served by LDAP, except the ones you will specifically override in the specific sections. The backend options are also strait forward. Any requirements or such concerning a specific backend type should be handled here. As for the directory options, these concern specific directories, and should have at a minimum several of the following options (after the 'database whatever' directive):

<pre>
   suffix - The base DN for the LDAP tree which this directory applies to, as described above. 
            All entries in the tree will have DN's inherited from this suffix.
            eg. suffix "dc=company,dc=com"
   rootdn - dn of the 'root' entry which has permissions to do anything to any entry in the tree
   rootpw - password of the root entry (root must enter this before every attempt do anything). 
            This may be encrypted in order to maintain security. 
            To view the encrypted version of your rootpw, issue the following command on the command line:
                'slappasswd -s your_password'
                Copy the resulting output (including whatever is in the {}) to the config file
            eg. rootdn "cn=root,ou=people,dc=company,dc=com"
                rootpw {SSHA}y/p8ICdsw3Y4LWDDzgFe4EfnMYoInxPx
   directory - system path to directory (eg. file folder) in which the LDAP directory will be stored.
               eg. directory /var/db/openldap/openldap
   index - list of indexes that you want to maintain and what information should be maintained about them. 
           These will be used to improve access times and to make the LDAP server faster in its operations. 
           There may be multiple index directives, and multiple listings per directive.
           eg. index default pres, eq
               index dc pres, eq
               index cn,ou eq 
               index objectClass eq
</pre>

The pres directive indicates that enough information should be maintained to be able to determine if a particular instance of the index is present. The eq directive indicates that information should be maintained to be able to determine if there is an exact match of an instance of an index. There are additional directives (primarily approx, sub, and none). Explanations for these can be found at any of the references listed below.
The first index directive indicates that the default indexing scheme is to maintain enough information for both pres and eq. If any additional index is specified without an indexing scheme, the default will be used.
The next indicates that the indexes for values of the dc attributes should be maintained with pres and eq information (the ps, eq directives are not necessary due to the default, but it does not hurt to include them). Next the cn, ou, and objectClass attributes indexes are set to be maintained along with equality (eq) information. Additional indexes may be maintained. Depending of your needs as the admin.

<pre>
   readonly - indicates if the directory should be readonly or both read and writable (default)
       eg. readonly off
           readonly on
</pre>

An access control list for the directory should be included in the configuration file. More on this in the next section


<u>V. Access control lists</u>
ACLs govern who has access to do what in the directory. An ACL is a listing of ordered access permissions which get checked each time an access attempt occurs. ACLs determine which entries in the LDAP directory have access to which other entries and attributes. (remember all user information is stored in the directory, there is not another set of users who have permissions on the directory that is stored outside it). Entries in an ACL should look like:
access to by [control flow]
may be a dn, a dn.(base,one,subtree,children), attribute list, * (an astricks), or one of several other parameters, which can be found in any of the listed resources.
may be a dn, a dn.(base,one,subtree,children), one of (anonymous, users, self), * (an astricks), or one of several other parameters, which can be found in any of the listed resources.
may be one of the following: none, auth, compare, search, read, write. This list is inclusive, a level on the right include those those to the left of it. (eg. search includes none, auth, compare; and write includes all; etc.)
[control] is an optional option, an indicates what should happen if the access permission is matched. Available values are stop, continue, and break. Stop indicates that no more Access directives should be checked (default, if no flow control is specified), continue indicates that the remaining access permissions in the same access block should be checked, and break indicates that the access block should be broken out of and to continue checking the remaining permissions.

When writing rules to match a dn, one of the following expressions may be used:

<pre>
   dn.base - matches the dn exactly, same as simply writing dn. 
             eg. dn.base="cn=Joe,sn=Schmoe,ou=people,ou=company,ou=com" will look for entries with a dn 
             that exactly matches the given one
   dn.one  - matches dn's one level below the specified dn. 
             eg. dn.one="ou=people,ou=company,ou=com" will match entries right below the people branch
   dn.subtree - inclusively matches dn's below the specified dn. 
                eg. dn.subtree="ou=people,ou=company,ou=com" will match the specified dn as well as all dn's below it.
   dn.children -exclusively matches dn's below the specified dn. 
                eg. dn.children="ou=people,ou=company,ou=com" will only match entries below the specified dn
</pre>

Every access control list should include the following as its first rule block

<pre>
   access to attr=userPasswd
   by anonymous auth
   by self write
   by none break
</pre>

This allow anonymous users to authenticate against the directory, which all users must do before being able to do anything, allows an individual to modify his/her own password, and allows the remaining rules to be checked if the previous did not match.

To enable any user to modify his / her entry:

<pre>
   access to *
   by self write
   by none break
</pre>

Once again if the self write is not matched the remaining rules will be matched.

After all other access blocks, the last should be:

<pre>
   access to * by none
</pre>

which ensures that if nothing else is met, the user who is trying to access the directory is not given permissions.

As for the middle, you may add whatever permission rules to satisfy the needs for your application. Some examples include

<pre>
   access to dn.children="ou=users,ou=people,dc=company,dc=com"
   by dn.children="ou=administrators,ou=people,dc=company,dc=com" write
   by dn.children="ou=managers,ou=people,dc=company,dc=com" read
</pre>

which allows administrators to modify and managers to read regular user's profiles

<u>VI. References</u>
The internet contains a multitude of information concerning LDAP administration and configuration. 
The following sites provided to be useful when researching and setting up the LDAP server.
* <a href="http://www.openldap.org">Official OpenLDAP website</a>
* <a href="http://www.openldap.org/doc/admin23/">Official documentation</a>
* <a href="http://www.ibiblio.org/pub/Linux/docs/HOWTO/other-formats/html_single/LDAP-HOWTO.html">LDAP linux howto</a>
