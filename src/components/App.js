//libraries
import React, { Component } from 'react';
import classNames from 'classnames';
import Tone from 'tone';
import Slider, { Handle } from 'rc-slider';
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap';

//styles
import '../styles/css/App.css';

//components
import ChordForm from './ChordForm';
import ArpeggioForm from './ArpeggioForm';
import PlayerBox from './PlayerBox';
import Analyser from './Analyser';
import SliderBox from './SliderBox';

//constants
import { TONES, RHYTHMS, ARPEGGIO_SCALES, RHYTHMS_SNARE, RHYTHMS_KICK } from '../js/constants';

//js
import VeloRhySlider from '../js/VeloRhySlider';
import { bassSynth, lowSynth, midSynth, highSynth, kickSynth, snareSynth } from '../js/synths'

class App extends Component {
  constructor() {
    super();

    this.state = {
      chords: ["D", "G", "A", "F"],
      "playing": false,
      currentChord: -1,
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
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  componentWillMount() {
    let veloRhySliders = []

    let kickSlider = new VeloRhySlider(kickSynth.fan(this.state.fft));
    kickSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":kickSlider, "followChords":false, "xPattern": RHYTHMS_KICK, "yPattern": ""});

    let snareSlider = new VeloRhySlider(snareSynth.fan(this.state.fft), false);
    snareSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":snareSlider, "followChords":false, "xPattern": RHYTHMS_SNARE, "yPattern": ""});

    let bassSlider = new VeloRhySlider(bassSynth.fan(this.state.fft))
    bassSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":bassSlider, "followChords":true, "xPattern": RHYTHMS, "yPattern": ""});

    let lowSlider = new VeloRhySlider(lowSynth.fan(this.state.fft));
    lowSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":lowSlider, "followChords":true, "xPattern": RHYTHMS, "yPattern": ""});

    let midSlider = new VeloRhySlider(midSynth.fan(this.state.fft))
    midSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":midSlider, "followChords":true, "xPattern": RHYTHMS, "yPattern": ""});

    let highSlider = new VeloRhySlider(highSynth.fan(this.state.fft))
    highSlider.part.start(0)
    veloRhySliders.push({"veloRhySlider":highSlider, "followChords":true, "xPattern": RHYTHMS, "yPattern": ""});

    this.setState({
      veloRhySliders: veloRhySliders
    })

    /*
    * -----------------------------
    */

    Tone.Transport.schedule(() => {
      let currentChord = this.state.currentChord
      currentChord++

      if(currentChord === this.state.chords.length) {
        currentChord = 0
      }

      this.state.veloRhySliders.forEach((element, i) => {
        if(element.followChords) {
          let chord = this.state.chords[currentChord]
          let arpScale = this.state.arpeggioScales[currentChord].pattern
          element.veloRhySlider.updateChord(chord)
          element.veloRhySlider.updateArpScale(arpScale)
        }
      })

      this.setState({currentChord:currentChord})
    }, 0)

    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
    //Tone.Transport.start('+0.1')
  }

  /*
  * start or stop player
  */
  togglePlaying() {
    if(this.state.playing) {
      Tone.Transport.stop();
      this.setState({playing: false});
    } else {
      Tone.Transport.start('+0.1');
      this.setState({playing: true});
    }
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
              <h4>Click and drag stuff and make some music</h4>
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
                    <Col className={classNames("col-centered", "col-max", "app-chord", this.state.currentChord === index ? "active-chord" : "")} key={"col-"+index} xs={6} md={2}>
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
              <div className="app-play">
                <Button bsSize="large" onClick={this.togglePlaying}>
                  <Glyphicon glyph={this.state.playing ? "pause" : "play"} />
                </Button>
              </div>
            </Row>

            <Row className="show-grid">
              <div className="app-player-boxes">
                {this.state.veloRhySliders.map((veloRhySlider, index) => {
                  if(veloRhySlider.followChords) {
                    return(
                      <Col key={"col-chords-"+index} xs={6} md={3}>
                        <div key={"app-player-box-"+index} className="app-player-box">
                          <PlayerBox index={index} updateOctaveApp={this.updateOctaveApp} updateArpStyleApp={this.updateArpStyleApp} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={veloRhySlider.xPattern} yPattern={veloRhySlider.yPattern} />
                        </div>
                      </Col>
                    )
                  }
                })}
              </div>
            </Row>
            <Row className="show-grid row-centered">
              <div className="app-drum-sliders">
                {this.state.veloRhySliders.map((veloRhySlider, index) => {
                  if(!veloRhySlider.followChords) {
                    return(
                      <Col key={"col-drums-"+index} className="col-centered" id={"col-drums-"+index} xs={6} md={3}>
                        <SliderBox index={index} xMethod={this.updateRhythmApp} yMethod={this.updateVelocityApp} xPattern={veloRhySlider.xPattern} yPattern={veloRhySlider.yPattern} />
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
