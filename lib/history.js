CerberusHistory = function() {
	this.history = [];
}

CerberusHistory.prototype.push = function(route) {
	this.history.push(route);
}

CerberusHistory.prototype.isEmpty = function() {
	return !this.history.length;
}

CerberusHistory.prototype.pop = function() {
	var route = this.history.pop();
	return route;
}

CerberusHistory.prototype.erase = function() {
	this.history = [];
}

CerberusHistory.prototype.log = function() {
	console.log(this.history);
}