Template.alerts.helpers({
    unseen: function() {
        return this.read? '' : 'unread';
    }
});

Template.alerts.events({
    'click .notification': function(e, t) {
        var history = Session.get('history') || [];
        if (history) {
            var route = { template: 'alerts', params: {} };
            history.push(route);
            Session.set('history', history);
            Notifications.update(this._id, { $set: { read: true } });
            Router.go(this.route.template, this.route.params);
        }
    },
    'click .button-back': function() {
        var history = Session.get('history');
        if (history) {
            var route = history.pop();
            Session.set('history', history);
            Router.go(route.template, route.params);
        }
    }
});