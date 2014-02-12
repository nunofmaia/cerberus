Template.home.helpers({
    notifications: function() {
        return Notifications.find({ usersIds: Meteor.userId()});
    }
});

Template.home.events({
	'click .notification': function(e, t) {
        Router.go(this.route.template, this.route.params);
    }
});