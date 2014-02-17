Template.answersList.helpers({
    answers: function() {
        var an = Answers.find({ questionId : this._id }, { sort : {  accepted : -1, upVote : -1, date : -1  } });
        console.log(an.fetch());
        return an;
    }
})
