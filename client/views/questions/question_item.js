Template.questionItem.helpers({
	acceptedAnswer: function() {
		return Answers.findOne({ questionId: this._id, accepted: true });
	},

	answers: function() {
		return Answers.find({ questionId: this._id }).fetch();
	}
});