Template.home.helpers({
    notifications: function() {
        //return Notifications.find({ $query: { usersIds: Meteor.userId() }, $orderby: { date : -1 }});
        return Notifications.find({usersIds: Meteor.userId()}, {sort: {date: -1}} );
    }
});

Template.home.events({
	'click .notification': function(e, t) {
        Router.go(this.route.template, this.route.params);
    }
});