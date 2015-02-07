
Accounts.onLogin(function(options) {
  Meteor.users.update({ _id: options.user._id }, {
    $set: { lastActiveAt: new Date() }
  });
  console.log ("user onLogin");
});

Accounts.onCreateUser(function (options, user) {
  if (user.services.github) {
    var accessToken = user.services.github.accessToken,
        result,
        profile;

    result = Meteor.http.get("https://api.github.com/user", {
      headers: {"User-Agent": "Meteor/1.0"},

      params: {
        access_token: accessToken
      }
    });

    repo = Meteor.http.get("https://api.github.com/user/repos", {
      headers: {"User-Agent": "Meteor/1.0"},

      params: {
        access_token: accessToken
      }
    });

    if (result.error)
      throw result.error;

    profile = _.pick(result.data,
      "name",  
      "login",
      "avatar_url",
      "url",
      "company",
      "blog",
      "location",
      "email",
      "bio",
      "html_url");

    user.profile = result.data;
    user.repo = repo;
    console.log ('all repos number is ', repo.data.length);
    user.login = {};
    user.loginpos = {};
    user.loginaddr = {};
    user.loginzip = {};
  }
  return user;
});
