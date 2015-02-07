Meteor.publish('products', function() {
  return Products.find();
});

Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});

Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Products.find({_id: {$in: user.profile.votedProductIds}});
        }
      }
    ]
  };
});

Meteor.publish("allUsers", function (opts) {
  var opts = opts || {}; 
  var search = (opts.filterGeohash) ? {geohash:opts.filterGeohash} : {}; 
  var userFields = { 
    'loginpos':1,  'loginaddr':1,  'loginzip':1,  'everything':1,
    'profile.name':1, 'profile.geohash':1, 'profile.login':1, 'profile.location':1,
    'profile.avatar_url':1, 'profile.blog':1, 'profile.html_url':1,
    updatedAt:1
  };  
  // userFields = {}
  // var res = Meteor.users.find( search ,{fields: userFields, sort:{updatedAt:-1} } );
  var res = Meteor.users.find( search ,{fields: userFields } );

  return res;
});
