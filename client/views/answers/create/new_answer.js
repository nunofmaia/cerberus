Template.newAnswer.events({
    'submit form': function(e, template) {
        e.preventDefault();
        var answer = {
            body: $(e.target).find('[name=body]').val(),
            authorId: Meteor.userId(),
            date: new Date(),
            questionId: template.data._id,
            upVote : 0,
            downVote : 0
        }

        Answers.insert(answer);
        Router.go('question', template.data);
    }
});
