Template.home.helpers({
    notifications: function() {
        return Notifications.find({usersIds: Meteor.userId()}, {sort: {date: -1}} );
    },
    ranking: function() {
    	return Meteor.users.find({},{sort: {'profile.points': -1}, limit: 10});
    },
    raq: function() {
    	var user = Meteor.user();
    	if (user) {
    		return Questions.find({ courseId: { $in: user.profile.courses }}, {sort: {date: -1}, limit: 10});
    	}
    },
    photo: function() {
        var user = Meteor.users.findOne(this._id);
        if (user) {
            return 'data:' + user.profile.photo.type + ';base64,' + user.profile.photo.data;
        }
    },
    courseName: function() {
    	var course = Courses.findOne({_id: this.courseId})
        if (course) {
            return course.specialAcronym;
        }
    },
    alertsTab: function() {
        return Session.get('homeTab') === 'Alerts';
    },
    raqTab: function() {
        return Session.get('homeTab') === 'RAQ';
    },
    rankingTab: function() {
        return Session.get('homeTab') === 'Ranking';
    }
});

Template.home.events({
	'click .notification': function(e, t) {
        Router.go(this.route.template, this.route.params);
    },
    'click .ranking-person': function(e, t) {
    	if(this._id === Meteor.userId()) {
    		Router.go('profile', { _id: this._id });
    	} else {
        	Router.go('userProfile', { _id: this._id });
    	}
    },
    'click .button-bar .button': function(e, t) {
        Session.set('homeTab', $(e.target).html());
    }
});