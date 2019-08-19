import React, { Component } from 'react'
import { Switch } from 'antd';
import apiTool from '../../../command/apiTool';

export default class FormSwitch extends Component {

  render() {
    const { onChange, value, data, disable,...arg} = this.props
    return (
      <Switch onChange={onChange} checked={!!value} defaultChecked={true} disabled={disable} {...data.props} {...arg} />
    )
  }
}
