---
title: Difference between delete and destroy in ActiveRecord
date: 2009-11-03
---

This is well documented, but I keep running into the same issue and never learn from my mistakes. ;-)

When you invoke 'destroy' or 'destroy_all' on an ActiveRecord object, the ActiveRecord 'destruction' process is initiated, it analyzes the class you're deleting, it determines what it should do for dependencies, runs through validations, etc. 

When you invoke 'delete' or 'delete_all' on an object, ActiveRecord merely tries to run the 'DELETE FROM tablename WHERE conditions' query against the db, performing no other ActiveRecord-level tasks. 

This also holds true for the :dependent option passed into the ActiveRecord::Association methods (belongs_to, has_one, has_many, has_and_belongs_to_many)

Thus if you have a circular dependency between two model classes, and you want to delete both related records when one is deleted, one of the :dependent clauses _must_ be :destroy and the other :delete. if both are set to :destroy you'll have an infinite loop resulting in a "SystemStackError: stack level too deep" exception.

For example

```
class Person < ActiveRecord::Base
  has_one :address, :dependent => :destroy
  validate_presence_of :address
end

class Address < ActiveRecord::Base
  belongs_to :person, :dependent => :delete
  validates_presence_of :person
end
```

With this scenario, you are free to add a foreign key constraint to the person_id field of the addresses table and everything will still behave as expected. Best of luck.
