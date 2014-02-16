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
        var route = Session.get('previousRoute');
        if (route) {
            Session.set('previousRoute', null);
            Router.go(route.route, route.params);
        }
    },
    'click #upvote': function (e, t) {
        e.preventDefault();
        var userID = Meteor.userId();
        if (!_.contains(this.voters, userID) && (userID !== this.authorId)) {
            Questions.update({ _id: this._id }, { $inc: { upVote: 1 }, $push : { voters : userID } });
            //notification
            var message = Meteor.user().profile.shortName + ' voted your question up.';
            var route = {
                template: 'question',
                params: {
                    courseId: this.courseId,
                    _id: this._id
                }
            };
            var usersIds = [];
            usersIds.push(this.authorId);
            createNotification(usersIds, message, route);
            Meteor.call('incPoints', this.authorId, 1);
        }
    },
    'click #updown': function (e, t) {
        e.preventDefault();
        var userID = Meteor.userId();
        if (!_.contains(this.voters, userID) && (userID !== this.authorId)) {
            Questions.update({ _id: this._id }, { $inc: { upDown: 1 }, $push : { voters : userID } });
            //notification
            var message = Meteor.user().profile.shortName + ' voted your question down.';
            var route = {
                template: 'question',
                params: {
                    courseId: this.courseId,
                    _id: this._id
                }
            };
            var usersIds = [];
            usersIds.push(this.authorId);
            createNotification(usersIds, message, route);
            Meteor.call('incPoints', this.authorId, -1);
        }
    }
});
