//libraries
import React, { Component } from 'react';
import Tone from 'tone';
import Slider from 'rc-slider';
import { Handle } from 'rc-slider';
//images
import logo from '../images/logo.svg';
//styles
import '../styles/css/App.css';
//components
import ChordForm from './ChordForm';
import SequenceForm from './SequenceForm';
import ArpeggioForm from './ArpeggioForm';
import PlayerBox from './PlayerBox';

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
      {"time": "0", "note": "C1", "velocity": 0.6},
      {"time": "0:1", "note": "C1", "velocity": 0.6},
      {"time": "0:2", "note": "C1", "velocity": 0.6},
      {"time": "0:3", "note": "C1", "velocity": 0.6},
    ]

    var kick = new Tone.MembraneSynth({
    			"envelope" : {
    				"sustain" : 0,
    				"attack" : 0.02,
    				"decay" : 0.8
    			},
    			"octaves" : 10
    		}).toMaster();

    var kickPart = new Tone.Part(function(time, value){
      kick.triggerAttackRelease(value.note, "8n", time, value.velocity)
    }, testArray)

    kickPart.loop = true
    kickPart.start(0)



    let bassSlider = new VeloRhySlider()
    bassSlider.part.start(0)

    let veloRhySliders = []
    veloRhySliders.push(bassSlider);

    let midSlider = new VeloRhySlider()
    midSlider.part.start(0)

    veloRhySliders.push(midSlider);

    this.setState({
      veloRhySliders: veloRhySliders,
    })





    var counter = 0


    Tone.Transport.schedule(() => {
      this.state.veloRhySliders.forEach((element, i) => {
        let chord = this.state.chords[counter]
        let arpScale = this.state.arpeggioScales[counter].pattern
        element.updateChord(chord)
        element.updateArpScale(arpScale)
      })

      counter++
      if(counter === this.state.chords.length) {
        counter = 0
      }
    }, 0)

    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
    Tone.Transport.start('+0.1')
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
    let veloRhySlider = veloRhySliders[index]
    veloRhySlider.updateRhythm(pattern)
    veloRhySliders[index] = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateVelocityApp
  * @param index - Number
  * @param velocity - Number
  */
  updateVelocityApp(index, velocity) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index]
    veloRhySlider.updateVelocity(velocity)
    veloRhySliders[index] = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateArpScaleApp
  * @param index - Number
  * @param scale - Obect
  */
  updateArpScaleApp(index, scale) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index]
    veloRhySlider.updateArpScale(scale)
    veloRhySliders[index] = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateArpStyleApp
  * @param index - Number
  * @param scale - Obect
  */
  updateArpStyleApp(index, style) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index]
    veloRhySlider.updateArpStyle(style)
    veloRhySliders[index] = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*
  * updateOctaveToApp
  * @param index - Number
  * @param octave - Number
  */
  updateOctaveApp(index, octave) {
    let veloRhySliders = this.state.veloRhySliders.slice()
    let veloRhySlider = this.state.veloRhySliders[index]
    veloRhySlider.updateOctaveTo(octave)
    veloRhySliders[index] = veloRhySlider
    this.setState({veloRhySliders: veloRhySliders})
  }

  /*const handle = (props) => {
  //const { value, dragging, index, ...restProps } = props;
    console.log("hej")
    /*return (

    );*/
  //};*/

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
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="app-chords">
          {this.state.chords}

          {this.state.chords.map((chord, index) => {
            return(
              <div key={index+"D"} className="app-chord-arpeggio">
                <ChordForm key={index+"C"} index={index} chords={TONES} value={chord} updateChordsApp={this.updateChordsApp} />
                <ArpeggioForm key={index+"A"} index={index} arpeggios={ARPEGGIO_SCALES} value={this.state.arpeggioScales[index]} updateArpeggioScalesApp={this.updateArpeggioScalesApp}  />
              </div>
            )
          })}
        </div>
        <div className="app-tempo">
          <Slider min={60} max={180} defaultValue={120} handle={this.updateTempoApp}/>
        </div>
        <div className="player-boxes">
          <PlayerBox index={0} updateOctaveApp={this.updateOctaveApp} updateArpStyleApp={this.updateArpStyleApp} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={RHYTHMS} yPattern={""} />
          <PlayerBox index={1} updateOctaveApp={this.updateOctaveApp} updateArpStyleApp={this.updateArpStyleApp} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={RHYTHMS} yPattern={""} />
        </div>
      </div>
    );
  }
}

export default App;