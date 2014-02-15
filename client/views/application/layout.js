Template.layout.events({
    'click .navbar-toggle': function (event, template) {
    	event.stopPropagation();
		var container = template.find('#container');
		$(container).toggleClass('slide');

    }
});

Template.layout.helpers({
    'historyEmpty': function() {
        return Cerberus.isEmpty();
    },

    'pageTitle': function() {
        return Session.get('title');
    }
});
