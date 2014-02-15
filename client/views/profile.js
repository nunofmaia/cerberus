Template.profile.helpers({
	photo: function() {
		var user = Meteor.user();
		if (user) {
			return 'data:' + user.profile.photo.type + ';base64,' + user.profile.photo.data;
		}
	},
    roles: function() {
        var user = Meteor.user();
        if (user) {
            var roles = [];
            _.map(user.profile.roles, function(v) {
                if (v.registrations) {
                    _.each(v.registrations, function (r) {
                        roles.push(r.acronym);
                    })
                }
            });
            return roles.join(', ');
        }

    }
});