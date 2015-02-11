Template.productsShow.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
    	console.log ('user loggin, in productsShow');
      IonModal.open('newComment', {productId: template.data.product._id});
    } else {
    	console.log ('user NOT loggin, in productsShow');
      IonModal.open('signIn');
    }
  }
});


Template._comment.helpers({
  datePosted: function () {
  	// http://momentjs.com/
    return moment(this.createdAt).fromNow();;
  },
});
