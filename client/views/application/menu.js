Template.menu.helpers({
    courses: function() {
        var user = Meteor.user();
        if (user) {
            return Courses.find({ _id: { $in: user.profile.courses }});
        }
    },
    alerts: function() {
        var alerts = Notifications.find({usersIds: Meteor.userId(), read: false }, {sort: {date: -1}} );
        if (alerts) {
            return alerts.count();
        }
    },
    hasAlerts: function() {
        var alerts = Notifications.find({usersIds: Meteor.userId(), read: false }, {sort: {date: -1}} );
        if (alerts) {
            return alerts.count() > 0? true : false;
        }
    }
});