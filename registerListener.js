var Rx = require('rx');

module.exports.registerStdin = function() {
	var subject = new Rx.Subject();
	var stdin = process.openStdin();
	process.stdin.setRawMode(true)

	stdin.on('data', function(data) {
	  subject.onNext(data[0]);
	});

	return subject;
}
