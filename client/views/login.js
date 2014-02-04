Template.login.helpers({
    'authUrl': function() {
        var client = new FenixClient();
        return client.getAuthUrl();
    }
})