//libraries
import React, { Component } from 'react';
//components
import SliderBox from './SliderBox';
import SequenceForm from './SequenceForm';
import NumberForm from './NumberForm';
//constants
import { RHYTHMS, ARPEGGIO_SCALES, ARPEGGIO_STYLES, OCTAVES } from '../js/constants';

export default class PlayerBox extends Component {
  constructor() {
    super();

    this.state = {
      arpeggioStyle: ARPEGGIO_STYLES[0],
      octave: 2,
    }

    this.updateArpeggioStyle = this.updateArpeggioStyle.bind(this);
    this.updateOctave = this.updateOctave.bind(this);
  }

  updateArpeggioStyle(arpeggioStyle) {
    this.props.updateArpStyleApp(this.props.index, arpeggioStyle.pattern)
    this.setState({
      arpeggioStyle: arpeggioStyle
    })
  }

  updateOctave(octave) {
    this.props.updateOctaveApp(this.props.index, Number(octave))
    this.setState({
      octave: octave
    })
  }

  render() {
    return (
      <div className="player-box">
        <div className="slider-box">
          <SliderBox index={this.props.index} xMethod={this.props.xMethod} yMethod={this.props.yMethod} xPattern={this.props.xPattern} yPattern={this.props.yPattern} />
        </div>
        <div className="options-box">
          {this.state.arpeggioStyle.pattern}
          <SequenceForm sequences={ARPEGGIO_STYLES} value={this.state.arpeggioStyle.value} updateSequences={this.updateArpeggioStyle} />
          {this.state.octave}
          <NumberForm numbers={OCTAVES} value={this.state.octave} updateNumbers={this.updateOctave} />
        </div>
      </div>
    );
  }
}
