
Template.trending.helpers({

  allUsers: function () {
  //return Meteor.users.find({'profile.name': reponame}, {limit:1, sort:{updatedAt:1}}); 
  //return Meteor.users.find({}, {limit:1, sort:{updatedAt:1}});  
  //  return Meteor.users.find({}, {limit:100, sort:{lastActiveAt:-1}});
    return Meteor.users.find({}, {limit:100, sort:{'profile.followers':-1, 'profile.public_repos':-1}});
  //return Meteor.users.find();
  }
});
