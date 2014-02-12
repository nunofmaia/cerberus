Template.question.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    },
    courseName : function() {
        return Courses.findOne( { _id : this.courseId  }).name;
    },
    followed: function() {
    	var id = this._id;
    	var found = _.find(Meteor.user().profile.followed_questions, function(questionID) {
    		console.log(questionID, id);
    		return questionID === id;
    	});

    	console.log(found);

    	return found;
    }
});

Template.question.events({
	'click #follow-question': function(e, t) {
		Meteor.call('followQuestion', this._id);
	},
	'click #unfollow-question': function(e, t) {
		Meteor.call('unfollowQuestion', this._id);
	}
});
