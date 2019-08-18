import React, { Component } from 'react'
import Dynamic from 'next/dynamic'
const BraftEditor = Dynamic(import('../../Rich'),{ssr:false})
export default class FormRich extends Component {
  render() {
    const {data,...arg} = this.props
    return (
        <BraftEditor
            placeholder={'请输入内容'}
            style={{border:'1px solid #3333'}}
            controls={[
                'undo', 'redo', 'separator',
            ]}
            {...arg}
            {...data.props}
        />
    )
  }
}
