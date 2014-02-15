Template.newQuestion.events({
    'click #ask-question': function(e,template) {
        e.preventDefault();
        var post = {
            title : $(template.find('[name=title]')).val(),
            body : $(template.find('[name=body]')).val(),
            authorId : Meteor.userId(),
            date : new Date(),
            courseId : template.data._id,
            followers: []
        }

        post._id = Questions.insert(post);
        Meteor.call('addQuestion', post._id);
        Router.go('question', post);
    },
    'click .button-cancel': function(e, t) {
        console.log('cancel answer');
        Router.go('questionsList', t.data);
    }
});
