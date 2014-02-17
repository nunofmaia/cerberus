Template.questionsList.helpers({
    courseAcronym : function() {
        var course = Courses.findOne({ _id: this._id });
        if (course) {
            return course.specialAcronym;
        }
    }
});