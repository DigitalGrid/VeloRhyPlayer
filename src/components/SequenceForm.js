//libraries
import React, { Component } from 'react'
//components
import { FormControl } from 'react-bootstrap';

export default class SequenceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.renderSequences = this.renderSequences.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateSequences(this.props.sequences[event.target.selectedIndex])
  }

  renderSequences(sequences) {
    return sequences.map((sequence, index) => {
      return(
        <option key={index} value={sequence.pattern}>{sequence.name}</option>
      )
    });
  }

  render() {
    return(
      <span className="custom-dropdown custom-dropdown--color">
        <FormControl className="custom-dropdown__select custom-dropdown__select--color" componentClass="select" value={this.props.value} onChange={this.handleChange}>
          {this.renderSequences(this.props.sequences)}
        </FormControl>
      </span>
    );
  }
}
