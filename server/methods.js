Meteor.methods({
  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  }
});

Meteor.methods({
  'Comments.add': function (_id) {
  	console.log ('Comments.add called')
    if (!Meteor.user()) {
      return;
    }

    console.log ('Products.update called');
    console.log ('comment id', _id);
    var productId = Comments.findOne({_id: _id}).productId;

    console.log ('product id ', productId);
    Products.update({_id: productId}, {$inc: {numberOfComments: 1}});
    //Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  }
});

