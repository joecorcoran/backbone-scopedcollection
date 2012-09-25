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

It makes your collection methods chainable. I like the chainable Underscore methods, but they don't play nicely with custom collection methods. You could set up scopes to do the following, for example:

```javascript
posts.scoped().inCategory('personal').byAuthor('anna').published().result();
```

## Isn't the `scoped()` and `result()` thing a bit nasty?

Yeah, maybe. It's a similar approach to using `chain()` and `value()` with Underscore. I can't find a cleaner way without introducing confusion and ambiguity.

## What is a scope?

A function added to the `scopes` object literal when you extend Backbone.Collection. The function will be executed in the context of the collection (`this` inside the function refers to the collection). It returns an array of models. You'll probably want to use Collection methods like `where` and `filter`.