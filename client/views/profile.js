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

Template.userProfile.helpers({
    photo: function() {
        return 'data:' + this.profile.photo.type + ';base64,' + this.profile.photo.data;
    },
    roles: function() {
        var user = this;
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

Template.userProfile.events({
    'click .button-back': function() {
        var history = Session.get('history');
        if (history) {
            var route = history.pop();
            Session.set('history', history);
            console.log('going back');
            Router.go(route.template, route.params);
        }
    }
})