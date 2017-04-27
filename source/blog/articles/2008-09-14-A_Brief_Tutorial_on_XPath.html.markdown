---
title: A Brief Tutorial on XPath
date: 2008-09-14
tags: xpath
---

Since its been over a month since my last post, I feel one is long overdue. Today's entry is about <a href="http://en.wikipedia.org/wiki/XPath_1.0">XPath</a>, a language that allows for the traversal / retrieval of nodes in an XML document (note that at the time of writing this <a href="http://en.wikipedia.org/wiki/XPath_2.0">XPath 2.0</a>; which adds additional type logic, operators, among other things; is now <a href="http://www.w3.org/TR/xpath20/">an official standard</a>, but I will not dive into the additional features in this entry). 

For this document, lets assume you are working on, and want to traverse the following HTML document (yes I realize HTML is not a strict subset of XML but for the purpose of the article, and in actual practice, XPath can be used to traverse html documents (and is often employed to do so, see my <a href="https://www.redhat.com/archives/ovirt-devel/2008-August/msg00251.html">write up</a> on integrating the <a href="http://selenium.openqa.org/">Selenium</a> web interface test suite into my current professional project <a href="http://ovirt.org/">oVirt</a>))

```
<html>
  <head>
   <title>Hello World</title>
  </head>
  <body>
   <div id="intro" class="content">Would you like to know something about me?</div>
   <div class="content">
     <p>My favorite foods</p>
     <ul>
       <li>Pizza</li>
       <li>Burritos</li>
       <li>Pasta</li>
     </ul>
   </div>
   <br/>
 </body>
</html>
```

Similar to Unix-like operating systems "/" indicates root, but unlike standard filesystems "/" does not correspond to any particular node. To start with something easy, to get the title of the web page, one would simply pass the following XPath into the search method of the library they are using 

```
  /html/head/title
```

which would return the "Hello World" string. We could use a similar, full path lookup to retrieve the contents of the introduction div, but rather a simpler method would be to employ the "self or descendent" directive "//" in conjunction with the attribute directive "@" to find the div with the "intro" id attribute like so

```
  //div[@id='intro']
```

This essentially tells XPath to search for a div with the "intro" id starting at the root element. Note there are many ways to accomplish the same thing, for example we would have started at the body element and ignore any divs elsewhere in the document (once again, that wouldn't appear in standard html but bear with me for this example) like so

```
  /html/body//div[@id="intro"]
```

If multiple elements match, for example when looking up list elements that appear in any unordered list like so,

```
  //ul/li
```

A list of elements will be returned, or alternatively you can specify an index to retrieve a specified element (<b>very important note</b> indices are 1 based, eg index '0' is invalid) like so

```
  //ul/li[2]
```

If you do not have a definitive element type in mind, you can match 'all elements' using the '*' operator. For example to return both the paragraph and unordered list under the second div in the body, you would use the following statement

```
  /html/body/div[2]/*
```

XPath also provides many functions useful in retrieving and transforming information stored in the document (technically all the aformentioned locators / specifiers are simply shorthand abbreviations for various XPath functions), for example to retrieve the number of list elements in the document, one could use the count function

```
  count(//ul/li)
```

Or to return div containing only text data (eg not other nodes) one would
  
```
  //div/text()
```

which would resolve to the first / 'intro' div in the example.
<br/>
I have barely touched upon the power of XPath in this guide, and have not even discussed additions which XPath 2.0 adds to the language, but hopefully this will give you a starting point which to expand and dive into the universe of XML traversal / lookup.
