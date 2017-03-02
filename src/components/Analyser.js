//libraries
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Measure from 'react-measure'

//styles
import '../styles/css/Analyser.css';


export default class Analyser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: {
        width: -1,
        height: -1
      }
    }

    this.drawFFT = this.drawFFT.bind(this);
    this.loop = this.loop.bind(this);
    this.onMeasure = this.onMeasure.bind(this);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this).firstChild
    this.ctx = this.canvas.getContext('2d')
    this.loop()
  }

  drawFFT(values) {
    this.ctx.clearRect(0, 0, this.state.dimensions.width, this.state.dimensions.height);
  	let barWidth = this.state.dimensions.width / this.props.fft.size;
  	for (let i = 0, len = values.length; i < len; i++){
  		let val = values[i] / 255;
  		let x = this.state.dimensions.width * (i / len);
  		let y = val * this.state.dimensions.height;
      this.ctx.fillStyle = "rgba(59, 186, 189, " + val + ")";
      this.ctx.fillRect(x, this.state.dimensions.height - y, barWidth, this.state.dimensions.height);
  	}
  }

  loop() {
    requestAnimationFrame(this.loop);
    //get the fft data and draw it
  	let fftValues = this.props.fft.analyse();
  	this.drawFFT(fftValues);
  }

  onMeasure(dimensions) {
    this.setState({
      dimensions
    })
  }

  render() {
    let { width, height } = this.state.dimensions

    return(
      <Measure onMeasure={this.onMeasure}>
        <div className="analyser">
          <canvas width={width} height={200} />
        </div>
      </Measure>
    );
  }
}
