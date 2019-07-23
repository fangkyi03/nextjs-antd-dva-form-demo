import React, { Component } from 'react'
import {Select} from 'antd'

export default class FormSelect extends Component {

  render() {
    const {typeData = [],value} = this.props
    return (
        <Select style={{width:'100%'}} value={value} onChange={this.props.onChange}>
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
