//libraries
import React, { Component } from 'react'

//styles
import '../styles/css/Form.css';

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
      <span className="custom-dropdown custom-dropdown--color">
        <FormControl className="custom-dropdown__select custom-dropdown__select--color" componentClass="select" value={this.state.value} onChange={this.handleChange}>
          {this.renderArpeggios(this.props.arpeggios)}
        </FormControl>
      </span>
    );
  }
}
