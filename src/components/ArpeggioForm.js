//libraries
import React, { Component } from 'react'
//components
import { FormControl } from 'react-bootstrap';

export default class ArpeggioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.renderArpeggios = this.renderArpeggios.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateArpeggioScalesApp(this.props.index, this.props.arpeggios[event.target.selectedIndex])
  }

  renderArpeggios(arpeggios) {
    return arpeggios.map((arpeggio, index) => {
      return(
        <option key={index} value={arpeggio.pattern}>{arpeggio.name}</option>
      )
    });
  }



  render() {
    return(
      <FormControl componentClass="select" value={this.state.value} onChange={this.handleChange}>
        {this.renderArpeggios(this.props.arpeggios)}
      </FormControl>
    );
  }
}
