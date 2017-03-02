//library
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';
//styles
import '../styles/css/SliderBox.css';

export default class SliderBox extends Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 1,
      yVal: 0,
      xOldPosition: -999,
      yOldPosition: -999,
    }

    this.handleChange = this.handleChange.bind(this);
    this.updatePattern = this.updatePattern.bind(this);
    this.getArrayPosition = this.getArrayPosition.bind(this);
  }

  handleChange(pos) {
    let xVal = pos.x
    let yVal = Math.round((1-pos.y) * 100) / 100;

    this.updatePattern(this.props.index, xVal, "x", this.props.xPattern, this.state.xOldPosition)
    this.updatePattern(this.props.index, yVal, "y", this.props.yPattern, this.state.yOldPosition)

    this.setState({
      x: pos.x,
      y: pos.y,
      yVal: yVal
    });
  }

  /*
  *
  */
  updatePattern(index, data, direction, patternInfo, oldPosition) {
    if(patternInfo) {
      let arrayPosition = this.getArrayPosition(data, patternInfo)
      if(arrayPosition !== oldPosition) {
        if(direction === "x") {
          this.setState({xOldPosition: arrayPosition})
        } else {
          this.setState({yOldPosition: arrayPosition})
        }
        let sequence = patternInfo[arrayPosition].pattern
        if(direction === "x") {
          this.props.xMethod(index, sequence)
        } else {
          this.props.yMethod(index, sequence)
        }
      }
    } else {
      if(direction === "x") {
        this.props.xMethod(index, data)
      } else {
        this.props.yMethod(index, data)
      }
    }
  }

  /*
  * getArrayPosition (helper method) - send in a value and an array and get a position (index) in the array
  * @param value - Number - 0-1
  * @param list - Array/Object
  * @return i - Number
  */
  getArrayPosition(value, list) {
    let patternsLength = list.length
    let delta = 1/patternsLength

    for(var i = 0; i<patternsLength; i++) {
      if((value < Math.round((delta+(i*delta))*100)/100 && value >=  Math.round((i*delta)*100)/100) || i===patternsLength-1) {
        return i
      }
    }
  }

  render() {
    return (
      <div className="slider-box">
        <InputSlider
          className="slider slider-xy"
          axis='xy'
          x={this.state.x}
          xmax={1}
          y={this.state.y}
          ymax={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
