var portAudio = require('portaudio');

module.exports.play = function(note, octave, waveType)
{
    const factor = Math.pow(2, (1/12));
    var sampleRate = 44100;
    var baseFreq = 440;
    var baseOctave = 4;

    var NOTES = {
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
    
    var semitonesFromBase = (octave - baseOctave) * 12 + NOTES[note];
  
    var tableSize = sampleRate/(baseFreq*Math.pow(factor,semitonesFromBase));

    var buffer;
    
    switch(waveType) {
        case 'sine':
            buffer = createSineWave(tableSize);
            break;
        case 'saw':
            buffer = createSawWave(tableSize);
            break;
        case 'square':
            buffer = createSquareWave(tableSize);
        case 'random':
            buffer = createRandomWave(tableSize);
    }

    var audioObj;

    portAudio.open({
        channelCount: 1,
        sampleFormat: portAudio.SampleFormat8Bit,
        sampleRate: sampleRate
    }, function (err, pa) {
        audioObj = pa;
        // send samples to be played
        for (var i = 0; i < 5 * sampleRate / tableSize; i++) {
            pa.write(buffer);
        }

    // start playing
    pa.start();
  });
  return audioObj;
};

module.exports.stop = function(audioObj)
{
  audioObj.stop();  
};

var createSineWave = function(tableSize)
{
    var buffer = new Buffer(tableSize);
    for (var i = 0; i < tableSize; i+= 1) {
        buffer[i] = (Math.sin((i / tableSize) * 3.1415927 * 2.0) * 127);
    }
    return buffer;
};

var createSawWave = function(tableSize)
{
    var buffer = new Buffer(tableSize);
    for (var i = 0; i < tableSize; i+= 1) {
        buffer[i] = -128 + (256*i / (tableSize - 1));
    }
    return buffer;
};

var createSquareWave = function(tableSize)
{
    var buffer = new Buffer(tableSize);
    var halfwayPoint = Math.floor(tableSize / 2);
    for (var i = 0; i < halfwayPoint; i+= 1) {
        buffer[i] = 127;
    }
    for (var i = halfwayPoint; i < tableSize; i += 1) {
        buffer[i] = -128;
    }
    return buffer;
};

var createRandomWave = function(tableSize)
{
    var buffer = new Buffer(tableSize);
    for (var i = 0; i < tableSize; i+= 1) {
        buffer[i] = 256*Math.random() - 128;
    }
    return buffer;
};