import React, { Component } from 'react'
import { Slider } from 'antd';

export default class FormSlider extends Component {
  render() {
    const { data, onChange, value, disable,event} = this.props
    return (
        <Slider
            value={Number(value)}
            onChange={onChange}
            min={data.min || 1}
            max={data.max || 100}
            disabled={disable}
            // {...arg}
            {...event}
        />
    )
  }
}
