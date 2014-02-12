Template.answer.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    },
    author: function() {
        return this.authorId === Meteor.userId();
    },
    accepted: function() {
        return this.accepted ? 'accepted-answer' : '';
    }
});

Template.answer.events({
    'click #upvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        var userID = Meteor.user()._id;
        var question = Questions.findOne(t.data.questionId);
        if(answer.voters.indexOf(userID)) {
            Answers.update({ _id: answer._id }, { $inc: { upVote: 1 }, $push : { voters : userID } });
            var message = Meteor.user().profile.shortName + ' voted the answer up.';
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
    'click #downvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        var userID = Meteor.user()._id;
        var question = Questions.findOne(t.data.questionId);
        if(t.data.voters.indexOf(userID)) {
            Answers.update({ _id: answer._id }, { $inc: { downVote: 1 }, $push : { voters : userID } });
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
    'click .img-circle': function(e, t) {
        var answer = t.data;
        Router.go('userProfile', { _id: answer.authorId });
    },
    'click #accept-answer': function(e, t) {
        Answers.update({ _id: this._id }, { $set: { accepted: true } });
    }
});
