import React, { Component } from 'react'
import { Input } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormInputArea extends Component {
  render() {
    const { value, onChange, data, disable, arg} = this.props
    return (
        <Input.TextArea
            value={value}
            onChange={(value) => onChange(value.currentTarget.value)}
            placeholder={data.placeholder}
            style={{height:apiTool.getSize(200),...data.style}}
            disabled={disable}
            {...data.props}
            {...arg}
        />
    )
  }
}
