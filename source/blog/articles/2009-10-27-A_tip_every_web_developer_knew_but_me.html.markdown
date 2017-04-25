---
title: A tip every web developer knew but me
date: 2009-10-27
---

Funny how the simplest things will slip by you (or at least you'll forget and have to remind yourself from time to time).

Lets say you have two divs, one contained within another, where the child has some floating style and the parent does not. Depending on the amount of content in the parent and child divs, you may see it spill out of the parent like so:

<div style="padding-left: 20px; width: 60%;">
<div style="border-bottom: 1px solid black" id="css_example_parent">
  <div style="float: left;" id="css_example_child">
    Alot of content<br/>
    goes in the child div<br/>
    to illustrate the problem<br/>
   </div>
   &nbsp;
</div>
</i>
<div style="clear:both;"></div>
</div>

Notice how the bottom border goes through the text. The markup to generate this is:
<code type="html">
<div style="border-bottom: 1px solid black" id="css_example_parent">
  <div style="float: left;" id="css_example_child">
    Alot of content<br/>
    goes in the child div<br/>
    to illustrate the problem<br/>
   </div>
   &nbsp;
</div>
</code>

To fix this simply add a "&lt;div style="clear:both;"&gt;&lt;/div&gt;" as the <b>very last element of the  container div</b> like so:

<code type="html">
<div style="border-bottom: 1px solid black" id="css_example_parent">
  <div style="float: left;" id="css_example_child">
    Alot of content<br/>
    goes in the child div<br/>
    to illustrate the problem<br/>
   </div>
   &nbsp;
   <div style="clear:both;"></div>
</div>
</code>


Resulting in:
<div style="padding-left: 20px; width: 60%;">
<div style="border-bottom: 1px solid black" id="css_example_parent">
  <div style="float: left;" id="css_example_child">
    Alot of content<br/>
    goes in the child div<br/>
    to illustrate the problem<br/>
   </div>
   &nbsp;
   <div style="clear:both;"></div>
</div>
</div>

<a href="http://www.positioniseverything.net/easyclearing.html">Read more on the subject</a>
