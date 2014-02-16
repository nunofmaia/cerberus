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
    	return Courses.findOne({_id: this.courseId}).specialAcronym;
    }
});

Template.home.events({
	'click .notification': function(e, t) {
        var history = Session.get('history') || [];
        history.push(this.route);
        Session.set('history', history);
        Router.go(this.route.template, this.route.params);
    },
    'click .ranking-person': function(e, t) {
        var history = Session.get('history') || [];
        var route = { template: 'home', params: {}};
        history.push(route);
        Session.set('history', history);
        Router.go('userProfile', { _id: this._id });
    },
    'click .raq-question': function(e, t) {
        var history = Session.get('history') || [];
        var route = { template: 'home', params: {}};
        history.push(route);
        Session.set('history', history);
        Router.go('question', { _id: this._id, courseId: this.courseId });
    }
});