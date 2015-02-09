Template.signIn.events({
  'click [data-action=sign-in]': function (event, template) {
    //Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
    Meteor.loginWithGithub({ loginStyle: "redirect" }, function (error) {
      if (error) {
        alert(error);
        console.log ("redirect err ", error);
      } else {
        //IonModal.close();
        console.log ("redirect ok, now render other pages ", error);
        //UI.insert(UI.render(Template.signIn), document.body);
        Router.go('/profile');
      }
    });
  }
});
