Template.courses.helpers({
    courses: function() {
        var user = Meteor.user();
        if (user) {
            return Courses.find({ id: { $in: user.profile.courses }});
        }
    },
    managing: function() {
    	return Session.get('managingCourses');
    }
});

Template.courses.events({
	'click #manage-courses': function(e, t) {
		console.log('manage courses');
		Session.set('managingCourses', true);
	},
	'click #stop-manage-courses': function(e, t) {
		console.log('ending manage courses');
		Session.set('managingCourses', false);
	},

	'click .label': function(e, t) {
		Meteor.call('unfollowCourse', this.id);
	}
});
