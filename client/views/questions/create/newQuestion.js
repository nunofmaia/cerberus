Template.newQuestion.events({
    'click #ask-question': function(e,template) {
        e.preventDefault();
        var post = {
            title : $(template.find('[name=title]')).val(),
            body : $(template.find('[name=body]')).val(),
            authorId : Meteor.userId(),
            date : new Date(),
            upVote : 0,
            downVote : 0,
            voters : [],
            courseId : template.data._id,
            followers: []
        }

        post._id = Questions.insert(post);
        Meteor.call('addQuestion', post._id);

        var history = Session.get('history');
        var route = { template: 'questionsList', params: { _id: template.data._id }}
        history.push(route);
        Session.set('history', history);
        Router.go('question', post);
    },
    'click .button-cancel': function(e, t) {
        Router.go('questionsList', t.data);
    }
});
