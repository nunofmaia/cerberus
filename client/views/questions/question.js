Template.question.helpers({
    authorName : function() {
        var user = Meteor.users.findOne(this.authorId)
        if (user) {
            return user.profile.shortName;
        }
    },
    courseAcronym : function() {
        var course = Courses.findOne( { _id : this.courseId  })
        if (course) {
            return course.specialAcronym;
        }
    },
    followed: function() {
    	var id = this._id;
        var user = Meteor.user();
        if (user) {
        	var found = _.find(user.profile.followed_questions, function(questionID) {
        		console.log(questionID, id);
        		return questionID === id;
        	});

        	return found;
        }
    }
});

Template.question.events({
	'click #follow-question': function(e, t) {
		Meteor.call('followQuestion', this._id);
	},
	'click #unfollow-question': function(e, t) {
		Meteor.call('unfollowQuestion', this._id);
	},
    'click .button-back': function() {
        var route = Session.get('previousRoute');
        if (route) {
            Session.set('previousRoute', null);
            Router.go(route.route, route.params);
        }
    }
});
