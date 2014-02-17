Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() {
        var userId = Meteor.userId();
        return [Meteor.subscribe('userCourses', userId),
            Meteor.subscribe('recentAlerts', userId),
            Meteor.subscribe('recentQuestions'),
            Meteor.subscribe('allUsers')]
    }
    // loadingTemplate: 'loading',
});

Router.map(function() {
    this.route('home', {
        path : '/activity',
        loadingTemplate: 'activityLoading',
        after: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect('login');
            }
        }
    });

    this.route('questionsList', {
        path : '/courses/:_id/questions',
        loadingTemplate: 'questionsListLoading',
        waitOn: function() {
            return Meteor.subscribe('courseQuestions', this.params._id);
        },
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
        loadingTemplate: 'questionLoading',
        waitOn: function() {
            return Meteor.subscribe('questionAnswers', this.params._id);
        },
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
        layoutTemplate: 'layout',
        //loadingTemplate: 'loginLoading',
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
        loadingTemplate: 'coursesLoading',
        waitOn: function() {
            return Meteor.subscribe('allCourses');
        }
    });
    this.route('userProfile', {
        path: '/users/:_id/profile',
        waitOn: function() {
            return Meteor.subscribe('user', this.params._id);
        },
        data: function() {
            return { user: Meteor.users.findOne(this.params._id) };
        }
    });
    this.route('alerts', {
        waitOn: function() {
            var userId = Meteor.userId();
            if (userId) {
                return Meteor.subscribe('userAlerts', userId);
            }
        },
        data: function() {
            return { alerts: Notifications.find({}, { sort: { date: -1 } }) };
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