import React, { Component } from 'react'

export default class Center extends Component {
  render() {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        {this.props.children}
      </div>
    )
  }
}
