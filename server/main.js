Meteor.startup(function() {
    Fenix = new FenixClient();
});

Meteor.methods({
    authenticate: function (code) {
      Fenix.setCode(code);
      var person = Fenix.getPerson();
      var user = Meteor.users.findOne({username: person.username });
      _.extend(person, {
        points: 0,
        ranking: 0,
        questions: [],
        answers: [],
        courses: [],
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
}
});