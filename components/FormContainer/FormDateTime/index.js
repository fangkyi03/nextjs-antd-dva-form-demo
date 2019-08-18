import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment'

export default class FormDateTime extends Component {

  render() {
    const {onChange,data,value,disable} = this.props
    console.log('输出时间',value)
    return (
        <DatePicker
          value={moment(value)}
          mode={data.type.replace('date', '').toLocaleLowerCase()}
          onChange={onChange}
          disabled={disable}
          {...data.props}
        />
    )
  }
}
