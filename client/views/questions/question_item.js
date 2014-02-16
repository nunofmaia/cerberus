Template.questionItem.helpers({
	acceptedAnswer: function() {
		return Answers.findOne({ questionId: this._id, accepted: true });
	},

	answers: function() {
		return Answers.find({ questionId: this._id }).fetch();
	}
});

Template.questionItem.events({
    'click .question-item': function(e, t) {
        var history = Session.get('history');
        var route = { template: 'questionsList', params: { _id: this.courseId }}
        history.push(route);
        Session.set('history', history);
        console.log(this);
        Router.go('question', this);
    }
});