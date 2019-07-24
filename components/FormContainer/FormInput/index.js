import React, { Component, PureComponent } from 'react'
import { Input } from 'antd';

export default class FormInput extends PureComponent {

  render() {
    const {value,onChange,disable} = this.props
    return (
        <Input value={value} onChange={onChange} disabled={disable}/>
    )
  }
}
