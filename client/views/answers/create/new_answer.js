Template.newAnswer.events({
    'click #answer-question': function(e, template) {
        e.preventDefault();
        var answer = {
            body: $(template.find('[name=body]')).val(),
            authorId: Meteor.userId(),
            date: new Date(),
            questionId: template.data._id,
            upVote : 0,
            downVote : 0,
            voters : [],
            accepted: false
        }

        var message = Meteor.user().profile.shortName + ' answered to the question ' + template.data.title + '.';
        var route = {
            template: 'question',
            params: {
                courseId: template.data.courseId,
                _id: template.data._id
            }
        };
        var usersIds = template.data.followers || [];
        usersIds.push(template.data.authorId);
        answer._id = Answers.insert(answer);
        createNotification(usersIds, message, route);
        Meteor.call('addAnswer', answer._id);
        Router.go('question', template.data);
    }
});

