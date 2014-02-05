Template.question.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    }
});
