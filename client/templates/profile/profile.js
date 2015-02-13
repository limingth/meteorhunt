Template.profile.rendered = function () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    //IonModal.open('signIn');
    //Meteor.render 'signIn';
    //UI.insert(UI.render(Template.signIn), document.body)
  }
};


Template.chat.rendered = function () {
    //Meteor.render('http://welog.us');
};

