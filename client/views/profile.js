Template.profile.helpers({
	photo: function() {
		var user = Meteor.user();
		if (user) {
			return 'data:' + user.profile.photo.type + ';base64,' + user.profile.photo.data;
		}
	}
});