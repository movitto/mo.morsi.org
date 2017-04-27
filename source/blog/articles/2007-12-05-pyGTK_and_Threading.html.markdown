---
title: pyGTK and Threading
date: 2007-12-05
tags: pygtk
---

I am in the process of adding a gnome gui interface to my soon-to-be released project. Incorporating Python, GTK, and Glade, I've run into several quirky issues relating to running threads and sharing access to GTK widgets. Often I will see a worker thread hanging until the window is closed, at which point it resumes operation, or a more serious error:

<pre>
Gtk-ERROR **: file gtktextlayout.c: line 1990 (gtk_text_layout_get_line_display): should not be reached
</pre>

which indicates an illegal cross-thread boundary violation.

After much searching, I found <a href="http://www.pardon-sleeuwaegen.be/antoon/python/page0.html">this site</a> which fills in the story concerning pyGTK and threading very nicely.

First lets import the threading and gtk libraries we need:
<pre>
import threading
try:
   import pygtk
   pygtk.require("2.0")
except:
try:
   import gtk
   import gtk.glade
except:
   sys.exit(1)
</pre>

Next lets create a class which will be responsible for loading a window created in glade and operating on it
<pre>
class MyWindow:
    def __init__(self):
        self.wTree = gtk.glade.XML('foofile.glade', 'mywindow')
        dic = { 'on_button_click' : self.button_click }
        self.wTree.signal_auto_connect(dic)

    def button_click(self, widget):
        # create worker thread
        threading.Thread(target=self.run).start()

   # running in worker thread
    def run(self):
        self.wTree.get_widget('widget_name').do_something()
</pre>

The problem is the worker thread is trying to access the gtk widget created in the original thread, which throws the aforementioned exception. Luckily we can easily instruct python to pop into a gtk created thread, and then run the code, which does not result in the boundry violation. This is done easily by surrounding the widget access call with:
<pre>
 gtk.gdk.threads_enter()
 self.wTree.get_widget('widget_name').do_something()
 gtk.gdk.threads_leave()
</pre>

Of course, for this to work, gtk will need to initialize its threading system, which you must explicitly do before you invoke gtk main:
<pre>
if __name__ == "__main__":
    hwg = MyWindow()
    gtk.gdk.threads_init()
    gtk.main()
</pre>

Of course this is a simple example, but you so long as you initialize the gtk threading system, and pop into gtk threads before accessing / operating on widgets, you should have no problems with threading. 
