
Accounts.onLogin(function(options) {
  Meteor.users.update({ _id: options.user._id }, {
    $set: { lastActiveAt: new Date() }
  });
  console.log ("============== User onLogin ==============");
  getUserInfo(options, options.user); 

  Meteor.users.update({ _id: options.user._id }, {
    $set: { skills: options.user.skills }
  });
});

function getUserInfo(options, user) {
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
	      "name",  // Li Ming
	      "login", // limingth
	      "avatar_url", // picture
	      "url", // api.github.com/users/limingth
	      "company",	// AKAEDU
	      "blog",		// www.lumit.org
	      "location",	// Beijing 
	      "email",		// limingth@gmail.com
	      "bio",		// null
	      "public_repos",	// 61
	      "followers",		// 184
	      "html_url");	// https://github.com/limingth

	    //user.profile = result.data;
	    user.profile = profile;
	    console.log ('1 user profile is ', user.profile);

	    user.login = {};
	    user.loginpos = {};
	    user.loginaddr = {};
	    user.loginzip = {}; 
	    user.repos = [];
	    user.skills = [];

	    //user.repo = repo;
	    for (var i = 0; i < repo.data.length; i++)
	    {
		    user.repos[i] = _.pick(repo.data[i],
		      "name",
		      "description",
		      "html_url",
		      "language");
	    }
	    console.log ('2 user repos is ', user.repos);
	    
	    var skills = [];
	    var i = 0;
	    var j = 0;
	    for(i = 0; i < repo.data.length; i++)
	    {
	      var r = repo.data[i];
	      var l = r.language;
	      //console.log('r.language is ', l);

	      if (skills[l] == null)
	        skills[l] = 0;
	      skills[l]++;
	      //console.log(skills[l]);
	    } 
	    console.log (skills);

	    i = 0;
	    for(var s in skills)
	    {
	      if (skills.hasOwnProperty(s) && s != 'null')
	      {
	        console.log ('Add to user.skills[] :', s, skills[s]);
	        user.skills[i++] = { language: s, count: skills[s] };
	      }
	    }

	    user.skills.sort( function (a, b) {
	    	if (a.count > b.count) 
	    		return -1;
	    	if (a.count < b.count) 
	    		return 1;
	    	return 0;
	    });

	    console.log ('3 User skills is ', user.skills);
	  }
}

Accounts.onCreateUser(function (options, user) {
  console.log ("============== User onCreate ==============");
	getUserInfo(options, user);
  return user;
});
