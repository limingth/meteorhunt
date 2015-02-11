Template.signIn.events({
  'click [data-action=sign-in]': function (event, template) {
    //Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
    Meteor.loginWithGithub( function (error) {
      if (error) {
        //alert(error);
        console.log ("redirect err ", error);
      } else {
        //IonModal.close();
        //UI.insert(UI.render(Template.signIn), document.body);
        Router.go('/profile');
        console.log ("redirect ok, now render other pages ", error);
      }
    });
  }
});
