//libraries
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

//styles
import '../styles/css/PlayerBox.css';

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
        <SliderBox index={this.props.index} xMethod={this.props.xMethod} yMethod={this.props.yMethod} xPattern={this.props.xPattern} yPattern={this.props.yPattern} />

        <Row className="show-grid options-box row-centered">
          <Col className="col-centered" xs={6} md={6}>
            <SequenceForm sequences={ARPEGGIO_STYLES} value={this.state.arpeggioStyle.value} updateSequences={this.updateArpeggioStyle} />
          </Col>
          <Col className="col-centered" xs={6} md={6}>
            <NumberForm numbers={OCTAVES} value={this.state.octave} updateNumbers={this.updateOctave} />
          </Col>
        </Row>
      </div>
    );
  }
}
