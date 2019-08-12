import React, { Component } from 'react'
import { InputNumber } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormInputNumber extends Component {

  render() {
    const {onChange,value} = this.props
    return (
        <InputNumber
            onChange={onChange}
            value={value}
            // style={{height:apiTool.getSize(33)}}
        />
    )
  }
}
