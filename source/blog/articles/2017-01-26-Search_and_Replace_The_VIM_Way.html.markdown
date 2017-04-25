---
title: Search and Replace The VIM Way
date: 2017-01-26
tags: vim, grep, sed
---

Did you know that it is 2017 and the <a href="https://en.wikipedia.org/wiki/Vim_(text_editor)">VIM</a> editor <b>still</b> does not have a decent multi-file search and replacement mechanism?! While you can always <a href="http://vim.wikia.com/wiki/Search_and_replace_in_multiple_buffers#Replacing_current_word">roll your own</a>, it's rather cumbersome, and even though some would say this isn't in the spirit of an editor such as VIM, a large <a href="http://vimawesome.com/">community</a> has emerged around extending it in ways to behave more like a traditional <a href="https://en.wikipedia.org/wiki/Integrated_development_environment">IDE</a>.

Having <a href="http://mo.morsi.org/blog/node/240">written</a> about doing something similar to this via the cmd line a while back, and having refactored a large amount of code recently that involved lots of renaming, I figured it was time to write a plugin to do just that, rename strings across source files, using <a href="https://en.wikipedia.org/wiki/Grep">grep</a> and <a href="https://en.wikipedia.org/wiki/Sed">sed</a>

<hr/>

Before we begin, it should be noted that this is of most use with a 'rooting' plugin like <a href="http://vimawesome.com/plugin/rooter">vim-rooter</a>. By using this, you will ensure vim is always running in the root directory of the project you are working on, regardless of the file being modified. Thus all search & replace commands will be run relative to the top project dir.

To install vsearch, we use <a href="https://github.com/VundleVim/Vundle.vim">Vundle</a>. Setup & installation of that is out of scope for this article, but I highly recommend familiarizing yourself with Vundle as it's the best Vim plugin management system (in my opinion).

Once Vundle is installed, using vsearch is as simple as adding the following to your ~/.vim/vimrc:

  Plugin 'movitto/vim-vsearch'

Restart Vim and run :PluginInstall to install vsearch from github. Now you're good to go!

<hr/>

vsearch provides two commands :VSearch and :VReplace.

<b>VSearch</b> simply runs grep and displays the results, without interrupting the buffer you are currently editing.


<a href="https://raw.githubusercontent.com/movitto/vim-vsearch/master/doc/vsearch.gif"><img src="https://raw.githubusercontent.com/movitto/vim-vsearch/master/doc/vsearch.gif" width="75%" height="75%"/></a>

<b>VReplace</b> runs a search in a similar manner to VSearch but also performs and in-memory string replacement using the specified args. This is displayed to the user who is prompted for comfirmation. Upon receiving it, the plugin then executes sed and reports the results.


<a href="https://raw.githubusercontent.com/movitto/vim-vsearch/master/doc/vreplace.gif"><img src="https://raw.githubusercontent.com/movitto/vim-vsearch/master/doc/vreplace.gif" width="75%" height="75%"/></a>
