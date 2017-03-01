//libraries
import React, { Component } from 'react'

//styles
import '../styles/css/Form.css';

//components
import { FormControl } from 'react-bootstrap';

export default class ChordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.renderChords = this.renderChords.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateChordsApp(this.props.index, event.target.value)
  }

  renderChords(chords) {
    return chords.map((chord, index) => {
      return(
        <option key={index} value={chord}>{chord}</option>
      )
    });
  }



  render() {
    return(
      <span className="custom-dropdown custom-dropdown--color">
        <FormControl className="custom-dropdown__select custom-dropdown__select--color" componentClass="select" value={this.state.value} onChange={this.handleChange}>
          {this.renderChords(this.props.chords)}
        </FormControl>
      </span>
    );
  }
}
