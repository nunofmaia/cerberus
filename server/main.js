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
      var terms = Fenix.getAcademicTerms();
      var currentTerm = _.last(_.sortBy(_.keys(terms), function (term) { return term; }));
      var userCourses = [];
      _.map(courses, function(course) {
        var c = Courses.findOne({ name: course.name });
            if (c) {
              userCourses.push(c.id);
            }
        });

      _.extend(person, {
        shortName: shortName(person.name),
        points: 0,
        ranking: 0,
        questions: [],
        answers: [],
        courses: userCourses,
        followed_questions: [],
        badges: [],
        academicTerm: currentTerm
      });

      if (!user) {
        Accounts.createUser({
          username: person.username,
          email: person.email,
          password: 'cerberus',
          profile: person
        });
      } else {
        if (user.profile.academicTerm !== currentTerm) {
          Meteor.users.update({ _id: user._id}, { $addToSet: { 'profile.courses': { $each: userCourses } }, academicTerm: currentTerm });
        }
      }

    return person.username;
    },

    addQuestion : function(questionID) {
        Meteor.users.update({ _id : Meteor.userId()}, { $addToSet : { 'profile.questions' : questionID }});
    },

    addAnswer : function(answerID) {
        Meteor.users.update({ _id : Meteor.userId()}, { $addToSet : { 'profile.answers' : answerID }});
    },
    followQuestion: function(questionID) {
      Meteor.users.update({ _id: Meteor.userId() }, { $addToSet: { 'profile.followed_questions': questionID } });
      Questions.update({ _id: questionID }, { $addToSet: { 'followers': Meteor.userId() } });
    },
    unfollowQuestion: function(questionID) {
      Meteor.users.update({ _id: Meteor.userId() }, { $pull: { 'profile.followed_questions': questionID } });
      Questions.update({ _id: questionID }, { $pull: { 'followers': Meteor.userId() } });
    },
    unfollowCourse: function(courseID) {
      Meteor.users.update({ _id: Meteor.userId() }, { $pull: { 'profile.courses': courseID } });
    },
    followCourse: function(courseID) {
      Meteor.users.update({ _id: Meteor.userId() }, { $push: { 'profile.courses': courseID } });
    },
    incPoints: function(userId, points) {
      var user = Meteor.users.findOne(userId);
      Meteor.users.update({ _id: userId }, { $inc: { 'profile.points': points } });
    }
});

function processCourses() {
  var terms = Fenix.getAcademicTerms();
  var currentTerm = _.last(_.sortBy(_.keys(terms), function (term) { return term; }));
  var degrees = Fenix.getDegrees();
  var degrees_courses = {};
  _.map(degrees, function(degree) {
    degrees_courses[degree.id] = Fenix.getDegreeCourses(degree.id, currentTerm);
  });

  var courses = _.chain(degrees_courses).values().flatten().uniq(function(item) {
    return item.name;
  }).value();

  _.map(courses, function(course) {
    Courses.insert({
      id: course.id,
      name: course.name,
      acronym: course.acronym,
      specialAcronym: specialAcron(course.name, course.acronym)
    });
  });
    console.log('courses done');
}

function shortName(name) {
  var res = name.split(' ');
  return res[0] + ' ' + res[res.length - 1];
}

function specialAcron(name, acron) {
  var special = acron.replace(/[^a-zA-Z]+$/g,'');
  if (special.length === 1) {
    special = name;
  }
  // var nameS = name.split(' ');
  // var temp = nameS[nameS.length - 1];
  // if( temp.length < 3 | temp === 'III') {
  //   special = special + ' ' + temp;
  // }
  return special;
}




