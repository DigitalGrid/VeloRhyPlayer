//libraries
import Tone from 'tone';

/*
* effects
*/
let freeverb = new Tone.Freeverb().toMaster();
freeverb.dampening.value = 100;

let filter = new Tone.Filter(5000, "lowpass");

let drumCompress = new Tone.Compressor({
  "threshold" : -30,
  "ratio" : 6,
  "attack" : 0.3,
  "release" : 0.1
});

let distortion = new Tone.Distortion({
  "distortion" : 0.4,
  "wet" : 0.4
});

let basslineDistortion = new Tone.Distortion(2.5);

let basslineDelay = new Tone.FeedbackDelay(0.25);


/*
* synths
*/

/*
* rhytmic synths (drums)
*/

export let kickSynth = new Tone.MembraneSynth({
  "envelope" : {
    "sustain" : 0,
    "attack" : 0.02,
    "decay" : 0.8
  },
  "octaves" : 10,
  "volume": -6
}).toMaster();


export let snareSynth = new Tone.NoiseSynth({
  "noise" : {
    "type" : "pink"
  },
  "volume" : -12,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.2,
    "sustain" : 0.05
  },
  "filterEnvelope" : {
    "attack" : 0.001,
    "decay" : 0.1,
    "sustain" : 0
  }
}).connect(freeverb).toMaster();

/*
* melodic synths
*/

//bass synth
export let bassSynth = new Tone.FMSynth({
  "modulationIndex" : 12.22,
  "envelope" : {
    "attack" : 0.01,
    "decay" : 0.2
  },
  "modulation" : {
    "type" : "square"
  },
  "modulationEnvelope" : {
    "attack" : 0.2,
    "decay" : 0.01
  },
  "volume": -8
}).connect(freeverb).toMaster();

//low synth
export let lowSynth = new Tone.FMSynth({
  "volume": -18
});
lowSynth.chain(basslineDistortion, basslineDelay);
lowSynth.chain(basslineDistortion, Tone.Master);

//mid synth
export let midSynth = new Tone.Synth({
  "envelope": {
    "attack": 0.04
  },
  "volume": -12
}).connect(freeverb).toMaster();


//high synth
export let highSynth = new Tone.Synth({
  "oscillator": {
    "detune": 0,
    "type": "custom",
    "partials" : [2, 1, 2, 2],
    "phase": 0,
    "volume": 0
  },
  "envelope": {
    "attack": 0.005,
    "decay": 0.3,
    "sustain": 0.2,
    "release": 1,
  },
  "portamento": 0.01,
  "volume": -10
}).toMaster();
