Template.question.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).profile.shortName;
    },
    courseName : function() {
        return Courses.findOne( { _id : this.courseId  }).acronym;
    },
    followed: function() {
    	var id = this._id;
    	var found = _.find(Meteor.user().profile.followed_questions, function(questionID) {
    		console.log(questionID, id);
    		return questionID === id;
    	});

    	return found;
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
