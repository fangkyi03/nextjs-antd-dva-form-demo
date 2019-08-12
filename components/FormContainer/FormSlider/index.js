import React, { Component } from 'react'
import { Slider } from 'antd';

export default class FormSlider extends Component {
  render() {
    const {data,onChange,value} = this.props
    return (
        <Slider
            value={value}
            onChange={onChange}
            min={data.min || 1}
            max={data.max || 100}
        />
    )
  }
}
