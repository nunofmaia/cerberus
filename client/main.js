Session.set('homeTab', 'Alerts');

Session.set('history', []);

$(document).click(function(e) {
	$('#container').removeClass('slide');
});

Deps.autorun(function() {
	if ( Questions.find({authorId: Meteor.userId()}).count() === 1) {
		var badge = Badges.findOne({name: 'Student'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
	        var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
		}
	}
	if ( Questions.find({authorId: Meteor.userId()}).count() === 25) {
		var badge = Badges.findOne({name: 'Publisher'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
	        var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
	    }
	}
	if ( Questions.find({authorId: Meteor.userId()}).count() === 100) {
		var badge = Badges.findOne({name: 'Philosopher'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
	        var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
	    }
	}
	if ( Answers.find({authorId: Meteor.userId()}).count() === 1) {
		var badge = Badges.findOne({name: 'Newbie'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
			var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
	    }
	}
	if ( Answers.find({authorId: Meteor.userId()}).count() === 25) {
		var badge = Badges.findOne({name: 'Teacher'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
			var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
	    }
	}
	if ( Answers.find({authorId: Meteor.userId()}).count() === 100) {
		var badge = Badges.findOne({name: 'Expert'});
		var user = Meteor.user();
		if(!_.contains(user.profile.badges, badge._id)) {
			Meteor.users.update({ _id: Meteor.userId()}, { $addToSet: { 'profile.badges': badge._id } });
			var message = 'Congratulations! You have won the badge ' + badge.name + ': ' + badge.description;
	        var route = {
	            template: 'profile',
	            params: { _id: Meteor.userId() }
	        };
	        createSelfNotification(message, route);
	    }
	}
});