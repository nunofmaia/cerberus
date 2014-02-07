Template.layout.events({
    'click .navbar-toggle': function (event, template) {
    	event.stopPropagation();
    	if (Cerberus.isEmpty()) {
    		var container = template.find('#container');
    		$(container).toggleClass('slide');
    	} else {
    		var previousRoute = Cerberus.pop();
    		Router.go(previousRoute.route, previousRoute.params);
    	}
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
