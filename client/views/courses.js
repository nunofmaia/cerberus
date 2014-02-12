Template.courses.helpers({
    courses: function() {
        var user = Meteor.user();
        if (user) {
            return Courses.find({ id: { $in: user.profile.courses }});
        }
    }
});
