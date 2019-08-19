import React, { Component } from 'react'
import { Checkbox } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormCheckGroup extends Component {

  render() {
    const {typeData,value,onChange,data,...arg} = this.props
    return (
        <Checkbox.Group
            value={value || []}
            style={{lineHeight:apiTool.getSize(33)}}
            onChange={onChange}
            {...data.props}
            {...arg}
        >
            {
                typeData.map((e,i)=>{
                    return (
                        <Checkbox
                            key={i}
                            value={e.value}
                        >
                            {e.name}
                        </Checkbox>
                    )
                })
            }
        </Checkbox.Group>
    )
  }
}
