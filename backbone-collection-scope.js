(function() {

  var root     = this,
      Backbone = root.Backbone,
      _        = root._;

  var CollectionScope = Backbone.CollectionScope = function(collection) {
    var initialCollection = collection;
    this.result = function() {
      return initialCollection;
    };
    _.each(collection.scopes, function(method, key) {
      var contextMethod = _.bind(method, collection);
      this[key] = function() {
        var scopedModels     = contextMethod(),
            scopedCollection = new collection.constructor(scopedModels);
        return new CollectionScope(scopedCollection);
      };
    }, this);
  };

  var ScopedCollection = Backbone.ScopedCollection = {
    scoped: function() {
      return new CollectionScope(this);
    }
  };

}).call(this);