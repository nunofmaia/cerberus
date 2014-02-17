Template.badgesList.helpers({
    badges: function() {
        var user = Meteor.user();
        if (user) {
            return Badges.find({ _id: { $in: user.profile.badges }});
        }
    }
});