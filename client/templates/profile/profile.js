Template.profile.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }
};

Template.profile.allUsers = function () {
       
  //return Meteor.users.find({'profile.name': reponame}, {limit:1, sort:{updatedAt:1}}); 
  //return Meteor.users.find({}, {limit:1, sort:{updatedAt:1}});  
  return Meteor.users.find({}, {limit:10, sort:{updatedAt:1}});
  //return Meteor.users.find();
}
