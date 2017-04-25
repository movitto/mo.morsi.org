---
title: Generating a random number in vim
date: 2009-11-06
---

In the department of things I've spent far too much time working on, I just wrote a vim script that allows you to automatically insert a random number into the file you're editing. It probably could use a little work, but does what I need it to do (easily generate random numbers for test fixtures). To use it yourself, add the following to your ~/.vimrc:

<code lang="vim">
" generate random number at end of current line 
function! s:Rand(max)
y a         
redir @b    
ruby << EOF
  rmax = VIM::evaluate("a:max")
  rmax = nil if rmax == ""
  printf rand(rmax).to_s
EOF
redir END 
let @a = strpart(@a, 0, strlen(@a) - 1)
let @b = strpart(@b, 1, strlen(@b) - 1)
let @c = @a . @b
.s/.*/\=@c/g
endfunction
command! -nargs=? Rand :call <SID>Rand(<q-args>)
nmap <F6> :Rand <CR>
nmap <F7> :Rand 100<CR>
nmap <F8> :Rand 100000<CR>
</code>

When using vim, simply enter command mode and type :Genrand &lt;maxnumber&gt; to generate a random number and insert it at the end of the line. Alternatively, simply hit &lt;F7&gt; to generate and insert a random number between 1 and 100.

Here are <a href="http://items.sjbach.com/97/writing-a-vim-plugin">some</a> <a href="http://orestis.gr/blog/2008/08/10/scripting-vim-with-python/">useful</a> links pertaining to scripting in vim.
