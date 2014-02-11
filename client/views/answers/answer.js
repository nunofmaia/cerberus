Template.answer.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    }
});

Template.answer.events({
    'click #upvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        Answers.update({ _id: answer._id }, { $inc: { upVote: 1 } });
    },
    'click #downvote': function (e, t) {
        e.preventDefault();
        var answer = t.data;
        Answers.update({ _id: answer._id }, { $inc: { downVote: 1 } });
    },
    'click .img-circle': function(e, t) {
        var answer = t.data;
        Router.go('userProfile', { _id: answer.authorId });
    }
});
