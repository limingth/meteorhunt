Template.settings.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
    	console.log('User logout!');
      IonModal.close();
      Router.go('/profile');
    });
  }
});
