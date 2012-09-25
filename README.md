# Backbone.CollectionScope

An experiment in adding scopes to `Backbone.Collection`.

```javascript
var posts = Backbone.Collection.extend({
  scopes: {
    published: function() {
      return this.where({ published: true });
    }
  }
});

posts.scoped().published().result(); // returns a collection containing only viewed posts
```

## Why?

It makes your collection functions chainable. I like the chainable Underscore functions that are available to Backbone collections, but they are called on the array of models within a collectiona and not on the collection itself, so they don't play nicely with any custom collection functions you may write.

In some cases, it would be nice to set up scopes on a collection to do the following, for example:

```javascript
posts.scoped().inCategory('personal').byAuthor('anna').published().result();
```

## What is a scope?

A function added to the `scopes` object literal when you extend Backbone.Collection. The function will be executed in the context of the collection (meaning: `this` inside the function body refers to the collection). It returns an array of models. You'll probably want to use `Backbone.Collection` methods like `where` and `filter` to do the work.

## Isn't the `scoped()` and `result()` thing a bit messy looking?

Yeah, maybe. It's a similar approach to using `chain()` and `value()` with Underscore. The `scoped` function returns a wrapped object (an instance of `Backbone.CollectionScope`), and a wrapped object is returned by every chained scope until `result` finally returns a modified collection. It's inspired by `ActiveRecord::Relation` from Rails. I haven't found a cleaner way without introducing confusion and ambiguity. If you have any ideas, I'd love to chat about it.