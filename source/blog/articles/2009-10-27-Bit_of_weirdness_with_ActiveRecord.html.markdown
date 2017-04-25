---
title: Bit of weirdness with ActiveRecord
date: 2009-10-27
---

Figure I'd pass on a bit of weirdness concerning Ruby's <a href="http://ar.rubyonrails.org/">ActiveRecord</a>. Apparently when two models class are associated via rails the association takes place through a custom ActiveRecord association class, eg if a host model has many instances of the nic model, host.nics will be an instance of ActiveRecord::Associations::AssociationProxy and _not_ a mere array of nics. AssociationProxy acts very similarily to an array, providing the expected functionality to get/set associated classes.

All of this is as expected, the weirdness arising from the fact a call to host.nics.class would return the 'Array' class and not 'AssociationProxy'. This is because AssociationProxy hijacks many methods and uses them for its own purposes, including the 'class' method.

To access an array from an instance of AssociationProxy, merely call the 'all' method, eg

```
host.nics.all.find { |nic| some_test }
```

Trying to call the 'find' method on nics directly will result in an ActiveRecord error: "Couldn't find Nic without an ID" as the AssociationProxy find method is called instead of the one you want.

Read <a href="http://stackoverflow.com/questions/1099533/ruby-types-of-collections-in-activerecord">this for more information.
