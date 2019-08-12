import React, { Component } from 'react'
import apiTool from '../../../command/apiTool';

export default class FormText extends Component {
  render() {
    const { value } = this.props
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: apiTool.getSize(33)
        }}
      >
        {value}
      </div>
    )
  }
}
