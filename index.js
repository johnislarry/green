var portAudio = require('portaudio');

var playSineWave = function(note, octave)
{
    const factor = Math.pow(2, (1/12));
    var sampleRate = 44100;

    var notes = {
        'a' : 0,
        'a#': 1,
        'b' : 2,
        'c' : 3,
        'c#': 4,
        'd' : 5,
        'd#': 6,
        'e' : 7,
        'f' : 8,
        'f#': 9,
        'g' : 10,
        'g#': 11
    };
  
    var tableSize = 44100/(440*Math.pow(factor,notes[note]));

    var buffer = new Buffer(tableSize);
    for (var i = 0; i < tableSize; i+= 1) {
        buffer[i] = (Math.sin((i / tableSize) * 3.1415927 * 2.0) * 127);
    }

    portAudio.getDevices(function(err, devices) {
        console.log(devices);
    });

    portAudio.open({
        channelCount: 1,
        sampleFormat: portAudio.SampleFormat8Bit,
        sampleRate: sampleRate
    }, function (err, pa) {
        // send samples to be played
        for (var i = 0; i < 5 * sampleRate / tableSize; i++) {
        pa.write(buffer);
    }

    // start playing
    pa.start();

    // stop playing 1 second later
    setTimeout(function () {
      pa.stop();
    }, 1 * 1000);
  });
};

playSineWave('G');
