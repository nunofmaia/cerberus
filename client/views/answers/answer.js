Template.answer.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    }
});
