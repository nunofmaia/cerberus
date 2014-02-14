Notifications = new Meteor.Collection('notifications');

// Notifications.allow({
// 	update: ownsDocument
// });

createNotification = function(usersIds, message, route) {
	var users = _.reject(usersIds, function(user) {
		return user === Meteor.userId();
	});
	if (users.length > 0) {
		Notifications.insert({
			usersIds: users,
			message: message,
			route: route,
            date : new Date(),
			read: false,
			seen: false
		});
	}
};

