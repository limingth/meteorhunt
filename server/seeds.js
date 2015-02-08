Meteor.startup(function() {
  var users = [
    {
      emails: [{
        address: 'nick@exygen.io',
        verified: false,
        primary: true
      }],
      profile: {
        name: 'nickw'
      },
      services: {
        'meteor-developer': {
          id: '2jefqB8rsQ2q3TuRW',
          username: 'nickw',
          emails: [{
            address: 'nick@exygen.io',
            verified: false,
            primary: true
          }]
        }
      }
    }
  ];

  var products = [
    {
      url: 'http://maodou.io/goals/246',
      name: '一个月学会使用meteor开发网站',
      tagline: 'Meteor Web'
    },
    {
      url: 'http://maodou.io/goals/245',
      name: '用oc开发一个完整的应用程序',
      tagline: 'oc Objective-C xcode iOS'
    },
		{
      url: 'http://maodou.io/goals/244',
      name: '一个半月学会android',
      tagline: 'Android Web'
    },
  ];

  if (Meteor.users.find({}).count() === 0) {
    _(users).each(function (user) {
      //Meteor.users.insert(user);
    });
  }

  var author = Meteor.users.find().fetch()[0];
  if (Products.find({}).count() === 0) {
    _(products).each(function (product) {
      Products.insert({
        url: product.url,
        name: product.name,
        tagline: product.tagline,
        createdAt: new Date()
      });
    });
  }
});
