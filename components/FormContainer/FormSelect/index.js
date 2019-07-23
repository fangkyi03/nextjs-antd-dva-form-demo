import React, { Component } from 'react'
import {Select} from 'antd'

export default class FormSelect extends Component {

  render() {
    const {typeData = []} = this.props
    console.log('输出typeData',typeData)
    return (
        <Select style={{width:'100%'}}>
            {
                typeData.map((e,i)=>{
                    return (
                        <Select.Option 
                            value={e.value} 
                            key={i}
                        >
                            {e.name}
                        </Select.Option>
                    )
                })
            }
        </Select>
    )
  }
}
