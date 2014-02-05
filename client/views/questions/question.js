Template.question.helpers({
    authorName : function() {
        return Meteor.users.findOne(this.authorId).username;
    },
    courseName : function() {
        return Courses.findOne( { _id : this.courseId  }).name;
    }
});
