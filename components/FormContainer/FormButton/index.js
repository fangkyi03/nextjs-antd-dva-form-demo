import React, { Component } from 'react'
import { Button } from 'antd';

export default class FormButton extends Component {
  render() {
    const {data} = this.props
    return (
      <Button
        type={data.buttonType}
        onClick={data.onClick}
        {...data.props}
      >
          {data.name || data.title}
      </Button>
    )
  }
}
