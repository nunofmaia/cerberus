Template.question.helpers({
    authorName : function() {
        var user = Meteor.users.findOne(this.authorId)
        if (user) {
            return user.profile.shortName;
        }
    },
    courseName : function() {
        var course = Courses.findOne( { _id : this.courseId  })
        if (course) {
            return course.acronym;
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
        var history = Session.get('history');
        if (history) {
            var route = history.pop();
            Session.set('history', history);
            Router.go(route.template, route.params);
        }
    }
});
