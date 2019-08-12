import React, { Component } from 'react'
import { Rate } from 'antd';

export default class FormRate extends Component {
  render() {
    const {data,value,onChange} = this.props
    return (
        <Rate
          value={Number(value)}
          onChange={onChange}
          {...data.props}
        />
    )
  }
}
