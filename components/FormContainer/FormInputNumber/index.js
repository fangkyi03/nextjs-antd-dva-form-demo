import React, { Component } from 'react'
import { InputNumber } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormInputNumber extends Component {

  render() {
    const {onChange,value,data,arg} = this.props
    return (
        <InputNumber
            onChange={onChange}
            value={value}
            {...data.props}
            {...arg}
            // style={{height:apiTool.getSize(33)}}
        />
    )
  }
}
