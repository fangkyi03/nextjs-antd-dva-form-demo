import React, { Component, PureComponent } from 'react'
import { Input } from 'antd';

export default class FormInput extends PureComponent {

  render() {
    const { value, data, onChange, disable, style, arg} = this.props
    return (
      <Input 
        disabled={disable} 
        ref={(r) => this.ref = r} 
        onChange={(value)=>onChange(value.currentTarget.value)} 
        value={value} 
        style={style}
        {...data.props}
        {...arg}
      />
    )
  }
}
