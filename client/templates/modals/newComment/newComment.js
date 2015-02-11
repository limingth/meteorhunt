AutoForm.hooks({
  'comments-new-form': {
    onSuccess: function (operation, result, template) {
    	console.log ('comments new form ok');

    	// here result is the comment._id 
    	Meteor.call('Comments.add', result);
      IonModal.close();
    }
  }
});

