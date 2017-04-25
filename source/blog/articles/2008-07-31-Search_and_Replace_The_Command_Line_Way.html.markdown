---
title: Search and Replace The Command Line Way
date: 2008-07-31
---

```
find ./ -name *.<i>extension</i> -exec  sed -i 's/<i>find</i>/<i>replace</i>/g' {} \;
```

Replace <i>extension</i> of the extension of the files you want to search in (or use any other regex)
Replace <i>find</i> with what your looking for
Replace <i>replace</i> with what you want to replace your query with.

<b>Warning</b> there is no undo and if your not using revision control or have backups you can seriously mess things up.
