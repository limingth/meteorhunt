Meteor.users.before.insert(function (userId, doc) {
  doc.profile.votedProductIds = [];
});

Meteor.users.helpers({
  votedProducts: function () {
    return Products.find({_id: {$in: this.profile.votedProductIds}});
  }
});


AllUsers = new Mongo.Collection();

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

AllUsers.search = function(query) {
  if (!query) {
    return;
  }

  // http://docs.mongodb.org/manual/reference/method/db.collection.find/
  // http://docs.mongodb.org/manual/reference/operator/query/or/#op._S_or
  return Meteor.users.find({
    $or:
    [
      { skills: {
            $elemMatch: {
              language: { $regex: RegExp.escape(query), $options: 'i' }
            }
          }
      },
      { repos: {
            $elemMatch: {
              name: { $regex: RegExp.escape(query), $options: 'i' }
            }
          }
      },
      { repos: {
            $elemMatch: {
              description: { $regex: RegExp.escape(query), $options: 'i' }
            }
          }
      },
      {
        'profile.name': { $regex: RegExp.escape(query), $options: 'i' }
      },
      {
        'profile.email': { $regex: RegExp.escape(query), $options: 'i' }
      },
      {
        'profile.login': { $regex: RegExp.escape(query), $options: 'i' }
      }
    ]
  });
};

