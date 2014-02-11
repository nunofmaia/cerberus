Meteor.startup(function() {
    Fenix = new FenixClient();
    if (Courses.find().count() === 0) {
      processCourses();
    }
});

Meteor.methods({
    authenticate: function (code) {
      Fenix.setCode(code);
      var person = Fenix.getPerson();
      var user = Meteor.users.findOne({username: person.username });
      var courses = Fenix.getCourses().enrolments;
      var userCourses = [];
      _.map(courses, function(course) {
        var c = Courses.findOne({ name: course.name });
            if (c) {
              userCourses.push(c._id);
            }
        });

      _.extend(person, {
        points: 0,
        ranking: 0,
        questions: [],
        answers: [],
        courses: userCourses,
        followed_questions: [],
        badges: []
      });

      if (!user) {
        Accounts.createUser({
          username: person.username,
          email: person.email,
          password: 'cerberus',
          profile: person
        });
      }

    return person.username;
    },

    addQuestion : function(questionID) {
        Meteor.users.update({ _id : Meteor.userId()}, { $addToSet : { 'profile.questions' : questionID }});
    },

    addAnswer : function(answerID) {
        Meteor.users.update({ _id : Meteor.userId()}, { $addToSet : { 'profile.answers' : answerID }});
    }
});

function processCourses() {
  var degrees = Fenix.getDegrees();
  var degrees_courses = {};
  _.map(degrees, function(degree) {
    degrees_courses[degree.id] = Fenix.getDegreeCourses(degree.id);
  });

  var courses = _.chain(degrees_courses).values().flatten().uniq(function(item) {
    return item.id;
  }).value();

  _.map(courses, function(course) {
    Courses.insert({
      id: course.id,
      name: course.name,
      acronym: course.acronym
    });
  });
    console.log('courses done');
}
