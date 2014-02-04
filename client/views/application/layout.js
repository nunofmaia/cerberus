Template.layout.events({
    'click .button': function (event, template) {
        var container = template.find('#container');
        $(container).toggleClass('slide');
    }
});
