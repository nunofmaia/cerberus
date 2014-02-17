Template.answer.helpers({
    authorName : function() {
        var user = Meteor.users.findOne(this.authorId)
        if (user) {
            return user.profile.shortName;
        }
    },
    questionAuthor: function() {
        var question = Questions.findOne(this.questionId);
        return question.authorId === Meteor.userId();
    },
    answerAuthor: function() {
        return this.authorId === Meteor.userId();
    },
    likeOrAccept: function() {
        var question = Questions.findOne(this.questionId);
        return question.authorId === Meteor.userId() | this.authorId !== Meteor.userId();
    },
    acceptedAnswer: function() {
        return this.accepted ? 'accepted-answer' : '';
    },
    photo: function() {
        var user = Meteor.users.findOne(this.authorId);
        if (user) {
            return 'data:' + user.profile.photo.type + ';base64,' + user.profile.photo.data;
        }
    }
});

Template.answer.events({
    'click #upvote': function (e, t) {
        e.preventDefault();
        var userID = Meteor.userId();
        var question = Questions.findOne(t.data.questionId);
        if (!_.contains(this.voters, userID) && (userID !== this.authorId)) {
            Answers.update({ _id: this._id }, { $inc: { upVote: 1 }, $push : { voters : userID } });
            //notification
            var message = Meteor.user().profile.shortName + ' voted the answer up.';
            var route = {
                template: 'question',
                params: {
                    courseId: question.courseId,
                    _id: question._id
                }
            };
            var usersIds = question.followers || [];
            usersIds.push(this.authorId);
            createNotification(usersIds, message, route);
            Meteor.call('incPoints', this.authorId, 5);
        }
    },
    'click #downvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        var userID = Meteor.user()._id;
        var question = Questions.findOne(t.data.questionId);
        if (!_.contains(answer.voters, userID) && Meteor.userId() !== answer.authorId) {
            Answers.update({ _id: answer._id }, { $inc: { downVote: 1 }, $push : { voters : userID } });
            //notification
            var message = Meteor.user().profile.shortName + ' voted the answer down.';
            var route = {
                template: 'question',
                params: {
                    courseId: question.courseId,
                    _id: question._id
                }
            };
            var usersIds = question.followers || [];
            usersIds.push(answer.authorId);
            createNotification(usersIds, message, route);
        }
    },
    'click .user-name': function(e, t) {
        var question = Questions.findOne(this.questionId);
        if (question) {
            var history = Session.get('history');
            var route = { template: 'question', params: { _id: question._id, courseId: question.courseId }}
            history.push(route);
            Session.set('history', history);
            Router.go('userProfile', { _id: this.authorId });
        }
    },
    'click #accept-answer': function(e, t) {
        Answers.update({ _id: this._id }, { $set: { accepted: true } });
        Meteor.call('incPoints', this.authorId, 10);
        //notification
        var usersIds = [];
        usersIds.push(this.authorId);
        var question = Questions.findOne(this.questionId);
        var message = Meteor.user().profile.shortName + ' accepted your answer.';
        var route = {
            template: 'question',
            params: {
                courseId: question.courseId,
                _id: question._id
            }
        };
        createNotification(usersIds, message, route);
    },
    'click #unaccept-answer': function(e, t) {
        Answers.update({ _id: this._id }, { $set: { accepted: false } });
        Meteor.call('incPoints', this.authorId, -10);
        //notification
        var usersIds = [];
        usersIds.push(this.authorId);
        var question = Questions.findOne(this.questionId);
        var message = Meteor.user().profile.shortName + ' declined your answer.';
        var route = {
            template: 'question',
            params: {
                courseId: question.courseId,
                _id: question._id
            }
        };
        createNotification(usersIds, message, route);
    }
});
