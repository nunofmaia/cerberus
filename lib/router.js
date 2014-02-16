Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('home', {
        path : '/activity',
        after: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect('login');
            }
        }
    });

    this.route('questionsList', {
        path : '/courses/:_id/questions',
        data : function() {
            return  { questions : Questions.find( { courseId : this.params._id }, {sort: {date: -1}} ) , _id : this.params._id };
        }
    });

    this.route('newQuestion' ,{
        path : '/courses/:_id/questions/create',
        data : function() {
            return Courses.findOne(this.params._id);
        }
    });


    this.route('question', {
        path : '/courses/:courseId/questions/:_id',
        data : function() {
            return Questions.findOne(this.params._id);
        }
    });

    this.route('newAnswer', {
        path : '/courses/:courseId/questions/:_id/answer',
        data : function() {
            return Questions.findOne(this.params._id);
        }
    });

    this.route('login', {
        layoutTemplate: 'clean-layout',
        path: '/',
        after: function() {
            if (Meteor.loggingIn() || Meteor.user()) {
                //cleanPreviousRoutes();
                this.redirect('home');
            }
        }
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

            //cleanPreviousRoutes();
            this.redirect(Router.routes.login.path());
        }
    });

    this.route('profile', {

    });

    this.route('courses', {

    });
    this.route('userProfile', {
        path: '/users/:_id/profile',
        data: function() {
            return { user: Meteor.users.findOne(this.params._id) };
        }
    });
});


function PreviousRoute(routeName, routeParams) {
    var route = {
        route: routeName,
        params: routeParams || {}
    };

    var previousRoutes = Session.get('previousRoutes') || [];
    previousRoutes.push(route);
    Session.set('previousRoutes', previousRoutes);
}

function cleanPreviousRoutes() {
    Session.set('previousRoutes', []);
}