//libraries
import React, { Component } from 'react'
//components
import { FormControl } from 'react-bootstrap';

export default class NumberForm extends Component {
  constructor(props) {
    super(props);

    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.renderNumbers = this.renderNumbers.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateNumbers(event.target.value)
  }

  renderNumbers(numbers) {
    return numbers.map((number, index) => {
      return(
        <option key={index} value={number}>{number}</option>
      )
    });
  }



  render() {
    return(
      <span className="custom-dropdown custom-dropdown--color">
        <FormControl className="custom-dropdown__select custom-dropdown__select--color" componentClass="select" value={this.state.value} onChange={this.handleChange}>
          {this.renderNumbers(this.props.numbers)}
        </FormControl>
      </span>
    );
  }
}
