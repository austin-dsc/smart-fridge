if( Meteor.isServer ) {
	Accounts.onCreateUser(function(options, user){

		// ------------------------------ Properties ------------------------------ //

		var userProperties = {
			profile: options.profile || {},
			ingredients: []
		};
		user = _.extend(user, userProperties);

		// set email on profile
		if (options.email)
			user.profile.email = options.email;

		// set username on profile
		if (!user.profile.name)
			user.profile.name = user.username;

		// if this is the first user ever, make them an admin
		user.isAdmin = Meteor.users.find({'profile.isDummy': {$ne: true}}).count() === 0 ? true : false;

		return user;
	});
}