
Template.recent.helpers({

  products: function () {
  //return Meteor.users.find({'profile.name': reponame}, {limit:1, sort:{updatedAt:1}}); 
  //return Meteor.users.find({}, {limit:1, sort:{updatedAt:1}});  
  //  return Meteor.users.find({}, {limit:100, sort:{lastActiveAt:-1}});
    return Products.find({}, {limit:100, sort:{'numberOfVotes':-1, 'numberOfComments':-1}});
  //return Meteor.users.find();
  }
});
