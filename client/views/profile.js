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

    },
    points : function() {
        var user = Meteor.user();
        if (user) {
    	    var rankings = Rankings.findOne({ userId : user._id })
            if (rankings) {
                return rankings.points;
            }
        }
    },
    ranking : function() {
        var user = Meteor.user();
        if (user) {
    	    var rankings = Rankings.find({}, { sort : { points : -1 } }).fetch();
    	    rankings  = _.map(rankings, function(elem) {
    	        return elem.userId;
    	    });
    	    return _.indexOf(rankings, user._id, true) + 1;
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

    },
    points : function() {
        var user = this;
        if (user) {
    	    return Rankings.findOne({ userId : user._id }).points;
        }
    },
    ranking : function() {
        var user = this;
        if (user) {
    	    var rankings = Rankings.find({}, { sort : { points : -1 } }).fetch();
    	    rankings  = _.map(rankings, function(elem) {
    	        return elem.userId;
    	    });
    	    return _.indexOf(rankings, user._id, true) + 1;
        }
    }
});

Template.userProfile.events({
    'click .button-back': function() {
        var history = Session.get('history');
        if (history) {
            var route = history.pop();
            Session.set('history', history);
            Router.go(route.template, route.params);
        }
    }
})
