---
title: More ActiveRecord Funkiness
date: 2009-10-27
---

Another caveat to look out for when using activerecord, especially for those of you who are using <a href="http://api.rubyonrails.org/classes/ActiveRecord/Acts/NestedSet/ClassMethods.html">the nested set</a> module and have <a href="http://github.com/rails/rails/commit/0d922885fb54c19f04680482f024452859218910">optimistic locking</a> turned on (which I'm guessing by the timestamp on that patch is making its ways to the Linux repos just about now).

It turns out when you go to destroy a model object in a nested set, it first updates the lft and rgt attributes before running the correct delete query against the db. eg

```
UPDATE "pools" SET lft = CASE WHEN lft > 13 THEN (lft - 2) ELSE lft END, rgt = CASE WHEN rgt > 13 THEN (rgt - 2 ELSE rgt END WHERE (1 = 1) 
....
DELETE FROM "pools" WHERE "id" = 8 AND "lock_version" = 0
....
```

Unfortunately when optimistic locking is enabled (as it seems to be by default now), activerecord will detect the record has already been updated before it attempts to destroy it and will throw a "StaleObjectError" reporting "Attempted to delete a stale object". The object being used to perform the update, no longer reflects the current db state (granted it's only "lock_version", the db field used to perform lock checks, that is inconsistent, but that is enough to throw it off).

The only work around which I know of right now, save fixing ActiveRecord itself, is to use delete instead of destroy, which obviously is not optimal and doesn't work for all cases. I need to look into this issue some more myself, and will follow up with a better fix if I find it. Until then <a href="http://marcostoledo.com/">this</a> also may help
