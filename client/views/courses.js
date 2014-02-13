Template.courses.helpers({
    courses: function() {
        var user = Meteor.user();
        if (user) {
            return Courses.find({ id: { $in: user.profile.courses }});
        }
    },
    managing: function() {
    	return Session.get('managingCourses');
    },
    searchedCourses: function() {
        var query = Session.get('query');
        if (query && query !== '') {
            var regex = '^.*' + query + '.*$';
            return Courses.find({ $or: [
                { name: { $regex: regex, $options: 'i' } },
                { acronym: { $regex: regex, $options: 'i' } }]}, { limit: 10 });
        }
    },
    query: function() {
        return Session.get('query');
    },
    notFollowed: function() {
        return !_.contains(Meteor.user().profile.courses, this.id);
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

	'click .unfollow-course': function(e, t) {
		Meteor.call('unfollowCourse', this.id);
	},
    'click .follow-course': function(e, t) {
        Meteor.call('followCourse', this.id);
    },
    'keyup #search': function(e, t) {
        Session.set('query', $(e.target).val());
    }
});
