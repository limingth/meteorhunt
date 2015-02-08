
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
    user.skills = [];

    var skills = [];
    for(var i = 0; i < repo.data.length; i++)
    {
      var r = repo.data[i];
      var l = r.language;
      console.log('r.language is ', l);

      if (skills[l] == null)
        skills[l] = 0;
      skills[l]++;
      console.log(skills[l]);
    } 
    console.log (skills);
    console.log (skills.length);
    var i = 0;
    for(var s in skills)
    {
      if (skills.hasOwnProperty(s) && s != 'null')
      {
        console.log (s, ':', skills[s]);
        user.skills[i++] = { language: s, count: skills[s] };
      }
    }

    console.log (user.skills);
  }
  return user;
});
