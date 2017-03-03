//libraries
import React, { Component } from 'react';
import Tone from 'tone';
import Slider, { Handle } from 'rc-slider';
import { Grid, Row, Col } from 'react-bootstrap';

//styles
import '../styles/css/App.css';

//components
import ChordForm from './ChordForm';
import ArpeggioForm from './ArpeggioForm';
import PlayerBox from './PlayerBox';
import Analyser from './Analyser';
import SliderBox from './SliderBox';


//constants
import { TONES, RHYTHMS, ARPEGGIO_SCALES } from '../js/constants';
//js
import VeloRhySlider from '../js/VeloRhySlider';


class App extends Component {
  constructor() {
    super();

    this.state = {
      chords: ["D", "G", "A", "F"],
      arpeggioScales: [ARPEGGIO_SCALES[0], ARPEGGIO_SCALES[0], ARPEGGIO_SCALES[0], ARPEGGIO_SCALES[0]],
      veloRhySliders: [],
      fft: new Tone.Analyser("fft", 64),
    }

    this.updateChordsApp = this.updateChordsApp.bind(this);
    this.updateRhythmApp = this.updateRhythmApp.bind(this);
    this.updateVelocityApp = this.updateVelocityApp.bind(this);
    this.updateArpScaleApp = this.updateArpScaleApp.bind(this);
    this.updateArpStyleApp = this.updateArpStyleApp.bind(this);
    this.updateOctaveApp = this.updateOctaveApp.bind(this);
    this.updateArpeggioScalesApp = this.updateArpeggioScalesApp.bind(this);
    this.updateTempoApp = this.updateTempoApp.bind(this);
  }

  componentWillMount() {

    var testArray = [
      {"time": "0", "note": "G0", "velocity": 0.8},
      {"time": "0:1", "note": "G0", "velocity": 0.8},
      {"time": "0:2", "note": "G0", "velocity": 0.8},
      {"time": "0:3", "note": "G0", "velocity": 0.8},
    ]

    var testArray2 = [
      {"time": "0:1", "velocity": 0.3},
      {"time": "0:3", "velocity": 0.3},
    ]

    var freeverb = new Tone.Freeverb().toMaster();
    freeverb.dampening.value = 100;


    //the synth settings
		var synthSettings = {
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
			"volume": -20
		};

    var midSynth = new Tone.FMSynth({
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
			}
		}).connect(freeverb);



    //DRUMS//
	//and a compressor
	var drumCompress = new Tone.Compressor({
		"threshold" : -30,
		"ratio" : 6,
		"attack" : 0.3,
		"release" : 0.1
	}).toMaster();
	var distortion = new Tone.Distortion({
		"distortion" : 0.4,
		"wet" : 0.4
	});






    var kick = new Tone.MembraneSynth({
    			"envelope" : {
    				"sustain" : 0,
    				"attack" : 0.02,
    				"decay" : 0.8
    			},
    			"octaves" : 10
    		}).toMaster();

    /*var kickPart = new Tone.Part(function(time, value){
      kick.triggerAttackRelease(value.note, "8n", time, value.velocity)
    }, testArray)

    kickPart.loop = true
    kickPart.start(0)*/

    //SNARE PART
  	/*var snare = new Tone.Sampler({
  		"url" : "../../audio/lala.wav",
  		"envelope" : {
  			"attack" : 0.01,
  			"decay" : 0.05,
  			"sustain" : 0
  		},
  	}).chain(distortion, drumCompress);

  	var snarePart = new Tone.Sequence(function(time, velocity){
  		snare.triggerAttackRelease(0, "8n", time, velocity);
  	}, [null, 1, null, [1, 0.3]])*/

    /*var sampler = new Tone.Sampler("../../audio/snare.mp3", function(){
	    //repitch the sample down a half step

	    sampler.triggerAttack(-1);
    }).toMaster();*/

    //var player = new Tone.Player("../../audio/snare.mp3")

    //snarePart.loop = true;
    //snarePart.start(0);


    var snare = new Tone.NoiseSynth({
      "noise" : {
        "type" : "brown"
      },
			"volume" : -5,
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

    /*var snarePart = new Tone.Part(function(time, value){
      snare.triggerAttackRelease("8n", time, value.velocity)
    }, testArray2)

    snarePart.loop = true
    snarePart.start(0)*/

    /*
    * ----------------------------
    */



var bassline = new Tone.FMSynth();
var basslineVolume = new Tone.Volume(-5.25);
var basslineDistortion = new Tone.Distortion(2.5);
var basslineDelay = new Tone.FeedbackDelay(0.25);

bassline.chain(basslineDistortion, basslineDelay);
bassline.chain(basslineDistortion, basslineVolume);
bassline.chain(basslineVolume, Tone.Master);


var bassline2 = new Tone.FMSynth();
var basslineVolume = new Tone.Volume(-5.25);
var basslineDistortion = new Tone.Distortion(2.5);
var basslineDelay = new Tone.FeedbackDelay(0.25);

bassline2.chain(basslineDistortion, basslineDelay);
bassline2.chain(basslineDistortion, basslineVolume);
bassline2.chain(basslineVolume, Tone.Master);


    let veloRhySliders = []

    let kickSlider = new VeloRhySlider(kick.fan(this.state.fft));
    kickSlider.part.start(0)

    veloRhySliders.push({"veloRhySlider":kickSlider, "followChords":false});

    let snareSlider = new VeloRhySlider(snare.fan(this.state.fft), false);
    snareSlider.part.start(0)

    veloRhySliders.push({"veloRhySlider":snareSlider, "followChords":false});

    let bassSlider = new VeloRhySlider(bassline.fan(this.state.fft));
    bassSlider.part.start(0)


    veloRhySliders.push({"veloRhySlider":bassSlider, "followChords":true});

    let midSlider = new VeloRhySlider(bassline2)
    midSlider.part.start(0)

    veloRhySliders.push({"veloRhySlider":midSlider, "followChords":true});

    let highSlider = new VeloRhySlider(midSynth.fan(this.state.fft).toMaster())
    highSlider.part.start(0)

    veloRhySliders.push({"veloRhySlider":highSlider, "followChords":true});

    let topSlider = new VeloRhySlider(new Tone.Synth(synthSettings).fan(this.state.fft).toMaster())
    topSlider.part.start(0)

    veloRhySliders.push({"veloRhySlider":topSlider, "followChords":true});

    this.setState({
      veloRhySliders: veloRhySliders
    })

    /*
    * -----------------------------
    */

    var counter = 0


    Tone.Transport.schedule(() => {
      this.state.veloRhySliders.forEach((element, i) => {
        if(element.followChords) {
          let chord = this.state.chords[counter]
          let arpScale = this.state.arpeggioScales[counter].pattern
          element.veloRhySlider.updateChord(chord)
          element.veloRhySlider.updateArpScale(arpScale)
        }
      })

      counter++
      if(counter === this.state.chords.length) {
        counter = 0
      }
    }, 0)

    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true

    //Tone.Buffer.onload = function(){
      Tone.Transport.start('+0.1')
  //  };




  }

  /*
  * updateChordApp
  * @param position - Number
  * @param chord - String
  */
  updateChordsApp(position, chord) {
    let chords = this.state.chords.slice();
    chords[position] = chord;

    this.setState({
      chords: chords
    })
  }

  /*
  * updateArpeggioScalesApp
  * @param position - Number
  * @param arpeggioScale - Object
  */
  updateArpeggioScalesApp(position, arpeggioScale) {
    let arpeggioScales = this.state.arpeggioScales.slice();
    arpeggioScales[position] = arpeggioScale;

    this.setState({
      arpeggioScales: arpeggioScales
    })
  }

  /*
  * updateRhythmApp
  * @param index - Number
  * @param pattern - Object
  */
  updateRhythmApp(index, pattern) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = veloRhySliders[index].veloRhySlider
    veloRhySlider.updateRhythm(pattern)
    veloRhySliders[index].veloRhySlider = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateVelocityApp
  * @param index - Number
  * @param velocity - Number
  */
  updateVelocityApp(index, velocity) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index].veloRhySlider
    veloRhySlider.updateVelocity(velocity)
    veloRhySliders[index].veloRhySlider = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateArpScaleApp
  * @param index - Number
  * @param scale - Obect
  */
  updateArpScaleApp(index, scale) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index].veloRhySlider
    veloRhySlider.updateArpScale(scale)
    veloRhySliders[index].veloRhySlider = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateArpStyleApp
  * @param index - Number
  * @param scale - Obect
  */
  updateArpStyleApp(index, style) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index].veloRhySlider
    veloRhySlider.updateArpStyle(style)
    veloRhySliders[index].veloRhySlider = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateOctaveToApp
  * @param index - Number
  * @param octave - Number
  */
  updateOctaveApp(index, octave) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index].veloRhySlider
    veloRhySlider.updateOctaveTo(octave)
    veloRhySliders[index].veloRhySlider = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  updateTempoApp(props) {
    const { value, dragging, index, ...restProps } = props;
    Tone.Transport.bpm.value = value;
    return(
      <Handle {...restProps} />
    )
  }


  render() {
    return (
      <div className="app">

        <Grid>
          <div className="app-header">
            <div className="app-title">
              <h1>VeloRhyPlayer</h1>
            </div>
          </div>

          <div className="app-body">
            <Row className="show-grid">
              <div className="app-analyser">
                <Analyser fft={this.state.fft} />
              </div>
            </Row>

            <Row className="show-grid">
              <div className="app-tempo">
                <Slider min={60} max={180} defaultValue={120} handle={this.updateTempoApp}/>
              </div>
            </Row>

            <Row className="show-grid row-centered">
              <div className="app-chords">
                {this.state.chords.map((chord, index) => {
                  return(
                    <Col className="col-centered col-max app-chord" key={"col-"+index} xs={6} md={2}>
                      <div key={"app-chord-arpeggio-"+index} className="app-chord-arpeggio">
                        <ChordForm key={"chordform-"+index} index={index} chords={TONES} value={chord} updateChordsApp={this.updateChordsApp} />
                        <ArpeggioForm key={"arpeggioform-"+index} index={index} arpeggios={ARPEGGIO_SCALES} value={this.state.arpeggioScales[index]} updateArpeggioScalesApp={this.updateArpeggioScalesApp}  />
                      </div>
                    </Col>
                  )
                })}
              </div>
            </Row>

            <Row className="show-grid">
              <div className="app-player-boxes">
                {this.state.veloRhySliders.map((veloRhySlider, index) => {
                  if(veloRhySlider.followChords) {
                    return(
                      <Col  key={"col-chords-"+index} xs={6} md={3}>
                        <div key={"app-player-box-"+index} className="app-player-box">
                          <PlayerBox index={index} updateOctaveApp={this.updateOctaveApp} updateArpStyleApp={this.updateArpStyleApp} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={RHYTHMS} yPattern={""} />
                        </div>
                      </Col>
                    )
                  }
                })}
              </div>
            </Row>
            <Row className="show-grid">
              <div className="app-drum-sliders">
                {this.state.veloRhySliders.map((veloRhySlider, index) => {
                  if(!veloRhySlider.followChords) {
                    return(
                      <Col key={"col-drums-"+index} id={"col-drums-"+index} xs={6} md={3}>
                        <SliderBox index={index} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={RHYTHMS} yPattern={""} />
                      </Col>
                    )
                  }
                })}
              </div>
            </Row>
          </div>
        </Grid>

      </div>
    );
  }
}

export default App;
