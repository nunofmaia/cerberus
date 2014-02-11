Template.answer.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
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
    }
});
