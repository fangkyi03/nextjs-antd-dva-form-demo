import React, { Component, PureComponent } from 'react'
import { Input } from 'antd';

export default class FormInput extends PureComponent {

  render() {
    const {value,onChange,disable} = this.props
    return (
      <Input disabled={disable} ref={(r) => this.ref = r} onChange={onChange} value={value}/>
    )
  }
}
