FenixEduConfig = function (consumerKey, consumerSecret, callbackUrl, baseUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.callbackUrl = callbackUrl;
    this.baseUrl = baseUrl || 'https://fenix.tecnico.ulisboa.pt';
    this.accessToken = '';
    this.refreshToken = '';
    this.expirationTime = null;
};

FenixEduConfig.prototype = {
    getConsumerKey: function () {
        return this.consumerKey;
    },
    getConsumerSecret: function () {
        return this.consumerSecret;
    },
    getCallbackUrl: function () {
        return this.callbackUrl;
    },
    getAccessToken: function () {
        return this.accessToken;
    },
    setAccessToken: function (accessToken) {
        this.accessToken = accessToken;
    },
    getRefreshToken: function () {
        return this.refreshToken;
    },
    setRefreshToken: function (refreshToken) {
        this.refreshToken = refreshToken;
    },
    getExpirationTime: function () {
        return this.expirationTime;
    },
    setExpirationTime: function (time) {
        this.expirationTime = time;
    },
    getBaseUrl: function () {
        return this.baseUrl;
    }
}

FenixClient = function () {
    this.config = new FenixEduConfig('7065221206121',
        'GDt1WJADObbgkng87v3dPFVyiSvm2kAK3CzX722U3qVZuLM1kdP3NwMJassG2yd7xUZmNGFS9h8nRURYi46AgZEUW51ycjpMv5AaJnY1CmKIBZ4ZzFZ',
        'http://localhost:3000/auth/callback');
    this.code = '';
};

FenixClient.prototype = (function () {

    var PUBLIC_BASE = '/api/fenix/v1';
    var PRIVATE_BASE = PUBLIC_BASE;

    return {
        constructor: FenixClient,
        getAuthUrl: function () {
            var url = this.config.getBaseUrl() + '/oauth/userdialog?client_id=' + this.config.getConsumerKey()
                + '&redirect_uri=' + this.config.getCallbackUrl();
            return url;
        },
        _publicRequest: function (method, endpoint, params, headers) {
            var options = {
                params: params || {},
                headers: headers || {}
            };
            var res = method(endpoint, options);
            return res.data;
        },
        _privateRequest: function (method, endpoint, params, headers) {
            var reqParams = params || {};
            reqParams.access_token = this.config.getAccessToken();

            var options = {
                params: reqParams,
                headers: headers || {}
            }

            var res = method(endpoint, options);
            return res.data;
        },
        _requestAccessToken: function () {
            var url = this.config.getBaseUrl() + '/oauth/access_token';
            var params = {
                client_id: this.config.getConsumerKey(),
                client_secret: this.config.getConsumerSecret(),
                redirect_uri: this.config.getCallbackUrl(),
                code: this.code,
                grant_type: 'authorization_code'
            }
            var headers = { 'content-type': 'application/x-www-form-urlencoded' };
            var options = {
                params: params,
                headers: headers
            }

            var res = HTTP.post(url, options);

            if (!res.error_key) {
                var currentTime = new Date().getTime();
                this.config.setAccessToken(res.data.access_token);
                this.config.setRefreshToken(res.data.refresh_token);
                this.config.setExpirationTime(currentTime + res.data.expires_in);
            }

        },
        setCode: function (code) {
            this.code = code;
            this._requestAccessToken();
        },
        getAbout: function () {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/about';
            return this._publicRequest(HTTP.get, endpoint);
        },
        getAcademicTerms: function () {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/academicterms';
            return this._publicRequest(HTTP.get, endpoint);
        },
        getCourse: function (id) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/courses/' + id;
            return this._publicRequest(HTTP.get, endpoint);
        },
        getCourseEvaluations: function (id) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/courses/' + id + '/evaluations';
            return this._publicRequest(HTTP.get, endpoint);
        },
        getCourseStudents: function (id) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/courses/' + id + '/students';
            return this._publicRequest(HTTP.get, endpoint);
        },
        getDegrees: function (academicTerm) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/degrees';
            var params = {
                academicTerm: academicTerm || ''
            }
            return this._publicRequest(HTTP.get, endpoint, params);
        },
        getDegree: function (id, year) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/degrees/' + id;
            var params = {
                year: year || ''
            }
            return this._publicRequest(HTTP.get, endpoint, params);
        },
        getDegreeCourses: function (id, year) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/degrees/' + id + '/courses';
            var params = {
                academicTerm: year || ''
            }
            return this._publicRequest(HTTP.get, endpoint, params);
        },
        getSpaces: function () {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/spaces';
            return this._publicRequest(HTTP.get, endpoint);
        },
        getSpace: function (id) {
            var endpoint = this.config.getBaseUrl() + PUBLIC_BASE + '/spaces/' + id;
            return this._publicRequest(HTTP.get, endpoint);
        },
        getPerson: function () {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person';
            return this._privateRequest(HTTP.get, endpoint);
        },
        getClassesCalendar: function (format) {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/calendar/classes';
            var params = { format: format || 'json' };
            return this._privateRequest(HTTP.get, endpoint, params);
        },
        getEvaluationCalendar: function (format) {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/calendar/evaluations';
            var params = { format: format || 'json' };
            return this._privateRequest(HTTP.get, endpoint, params);
        },
        getEvaluations: function (id) {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/evaluations/' + id;
            return this._privateRequest(HTTP.post, endpoint);
        },
        enrolInEvaluation: function (id, action) {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/evaluations' + id;
            var params = { enrol: action || '' };
            return this._privateRequest(HTTP.get, endpoint, params);
        },
        getCurriculum: function () {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/curriculum';
            return this._privateRequest(HTTP.get, endpoint);
        },
        getCourses: function (academicTerm) {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/courses';
            var params = {
                academicTerm: academicTerm || ''
            };
            return this._privateRequest(HTTP.get, endpoint, params);
        },
        getPayments: function () {
            var endpoint = this.config.getBaseUrl() + PRIVATE_BASE + '/person/payments';
            return this._privateRequest(HTTP.get, endpoint);
        }

    }
})();
