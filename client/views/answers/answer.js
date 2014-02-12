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
        if(t.data.voters.indexOf(userID)) {
            Answers.update({ _id: answer._id }, { $inc: { upVote: 1 }, $push : { voters : userID } });
        }
    },
    'click #downvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        var userID = Meteor.user()._id;
        if(t.data.voters.indexOf(userID)) {
            Answers.update({ _id: answer._id }, { $inc: { downVote: 1 }, $push : { voters : userID } });
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
