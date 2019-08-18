import React, { Component } from 'react'
import { DatePicker } from 'antd';

export default class FormRangePicker extends Component {
  render() {
    const { onChange, data, disable} = this.props
    return (
        <DatePicker.RangePicker
            onChange={onChange}
            disabled={disable}
            {...data.props}
        />
    )
  }
}
