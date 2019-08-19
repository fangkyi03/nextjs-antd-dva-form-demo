import React, { Component } from 'react'
import { Button } from 'antd';

export default class FormButton extends Component {
  render() {
    const { data, disable,event} = this.props
    return (
      <Button
        disabled={disable}
        type={data.buttonType}
        onClick={data.onClick}
        {...data.props}
        {...event}
      >
          {data.title}
      </Button>
    )
  }
}
