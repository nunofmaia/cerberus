Template.courses.helpers({
    courses: function() {
        var user = Meteor.user();
        if (user) {
            return Courses.find({ _id: { $in: user.profile.courses }});
        }
    }
});
