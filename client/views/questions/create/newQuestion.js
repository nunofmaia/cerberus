Template.newQuestion.events({
    'submit form': function(e,template) {
        e.preventDefault();
        var post = {
            title : $(e.target).find('[name=title]').val(),
            body : $(e.target).find('[name=body]').val(),
            authorId : Meteor.userId(),
            date : new Date(),
            courseId : template.data._id
        }

        post._id = Questions.insert(post);
        Meteor.call('addQuestion', post._id);
        Router.go('question', post);
    }
});
