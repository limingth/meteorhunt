AutoForm.hooks({
  'products-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      Router.go('products.show', {_id: result});
    }
  }
});




Template.newChat.helpers({
  name: function () {
    // http://momentjs.com/
    if (Meteor.user())
      return Meteor.user().profile.name;
    else
      return "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
  },

  avatar_url: function () {
    // http://momentjs.com/
    if (Meteor.user())
      return Meteor.user().profile.avatar_url;
    else
      return "Guest";
  },
});
