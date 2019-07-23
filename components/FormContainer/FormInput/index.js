import React, { Component } from 'react'
import { Input } from 'antd';

export default class FormInput extends Component {

  render() {
    const {value,onChange} = this.props
    return (
        <Input value={value} onChange={onChange}/>
    )
  }
}
