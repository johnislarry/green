var registerStdin = require('./registerListener').registerStdin;
var toChar = require('./utils').toChar;
var toOrd = require('./utils').toOrd;
var wavePlayer = require('./wavePlayer');
var play = wavePlayer.play;
var stop = wavePlayer.stop;
var MAPPED_KEYS = {
	'q': 'c',
	'2': 'c#',
	'w': 'd',
	'3': 'd#',
	'e': 'e',
	'r': 'f',
	'5': 'f#',
	't': 'g',
	'6': 'g#',
	'y': 'a',
	'7': 'a#',
	'u': 'b',
	'i': 'c',
	'9': 'c#',
	'o': 'd',
	'0': 'd#',
	'p': 'e',
};

function main() {
	var subject = registerStdin();
	var subscription = subject.subscribe(function(ord) {
	  if (ord === 3) {
	    // Ctrl+C
	    process.exit();
	  }
	  if (MAPPED_KEYS.hasOwnProperty(toChar(ord))) {
	    play(MAPPED_KEYS[toChar(ord)]);
	  }
	  console.log(MAPPED_KEYS[toChar(ord)]);
	});
}

main();
