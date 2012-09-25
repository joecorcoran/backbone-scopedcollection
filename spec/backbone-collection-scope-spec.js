describe('backbone-collection-scope', function() {
  var Post, PostCollection, posts;
  beforeEach(function() {
    Post           = Backbone.Model.extend();
    PostCollection = Backbone.Collection.extend({
      model: Post,
      scopes: {
        published: function() {
          return this.filter(function(model) {
            return model.get('published') === true;
          });
        },
        viewed: function() {
          return this.filter(function(model) {
            return model.get('viewed') === true;
          });
        }
      }
    });
    posts = new PostCollection([
      { title: 'foo',  published: true,  viewed: true },
      { title: 'bar',  published: false, viewed: true },
      { title: 'baz',  published: true,  viewed: false },
      { title: 'quux', published: false, viewed: false }
    ]);
  });
  describe('Collection scoped method', function() {
    it('returns a CollectionScope object', function() {
      expect(posts.scoped()).toEqual(jasmine.any(Backbone.CollectionScope));
    });
  });
  describe('CollectionScope object', function() {
    it('has scope methods as object properties', function() {
      var propMethods  = _.keys(posts.scoped());
      expect(propMethods).toContain('published');
      expect(propMethods).toContain('viewed');
    });
    it('has result method as object property which returns collection', function() {
      expect(posts.scoped().result()).toBe(posts);
    });
    describe('a scope method', function() {
      it('returns a new CollectionScope object', function() {
        expect(posts.scoped().published()).toEqual(jasmine.any(Backbone.CollectionScope));
      });
      it('executes scope method in context of collection', function() {
        expect(posts.scoped().published().result().pluck('title')).toEqual(['foo', 'baz']);
      });
      it('can be successfully chained', function() {
        expect(posts.scoped().published().viewed().result().pluck('title')).toEqual(['foo']);
      });
    });
  });
});