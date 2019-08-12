import React, { Component } from 'react'
import { Switch } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormSwitch extends Component {

  render() {
    const {onChange,value} = this.props
    return (
      <Switch onChange={onChange} checked={!!value} defaultChecked={true}/>
    )
  }
}
