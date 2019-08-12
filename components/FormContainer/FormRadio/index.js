import React, { Component } from 'react'
import { Radio } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormRadio extends Component {

  render() {
    const {typeData,onChange,value} = this.props
    return (
        <Radio.Group 
            value={value}
            onChange={(value)=>onChange(value.target.value)}
            style={{height:apiTool.getSize(33),lineHeight:apiTool.getSize(33)}}
        >
            {
                typeData.map((e,i)=>{
                    return (
                        <Radio
                            key={i}
                            value={e.value}
                        >
                            {e.name}
                        </Radio>
                    )
                })
            }
        </Radio.Group>
    )
  }
}