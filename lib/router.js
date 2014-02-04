Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path : '/'
    });

    this.route('questionsList', {
        path : '/questions'
    });

    this.route('newQuestion' ,{
        path : '/question/create'
    });

    this.route('question', {
        path : '/question/:_id',
        data : function() { 
            return Questions.findOne(this.params._id); 
        }
    });

    this.route('login', {
        layoutTemplate: 'clean-layout'
    });
    this.route('auth', {
        path: '/auth/callback',
        action: function () {
            Meteor.call('authenticate', this.params.code, function(err, username) {
                console.log(username);
                Meteor.loginWithPassword({ username: username }, 'cerberus', function(err) {
                    console.log('Problem with login: ', err);
                });
            });

            this.redirect(Router.routes.home.path());
        }
    });
    this.route('logout', {
        action: function() {
            Meteor.logout(function (err) {
                if (err) {
                    console.error(err);
                }

            });

            this.redirect(Router.routes.login.path());
        }
    });
});

