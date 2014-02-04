Meteor.startup(function() {
    Fenix = new FenixClient();
});

Meteor.methods({
    authenticate: function (code) {
      Fenix.setCode(code);
      var person = Fenix.getPerson();
      var user = Meteor.users.findOne({username: person.username });
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