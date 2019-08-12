import React, { Component } from 'react'
import FormContainer from '../FormContainer';
import apiTool from '../../command/apiTool';
import FormImageUpload from '../FormImageUpload'

export default class FormView extends Component {

  constructor(props) {
    super(props);
    this.form = new FormContainer({
      formData: props.data,
      colSize: {
        labelCol: 5,
        wrappCol: 18,
        cols: 24
      },
      ...props
    })
    this.form.regComponet('imageUpload',FormImageUpload)
    this.form.regComponet('inputSelect', (item) => {
      return {
        ...item,
        type: 'itemGroup',
        keys: [
          {
            type: 'input',
            cols: 10,
            ...item.keys[0]
          },
          {
            type: 'select',
            cols: 14,
            ...item.keys[1]
          }
        ],
        rules: [
          {
            required: item.required
          }
        ]
      }
    })
  }

  render() {
    return this.form.getRow(
      this.form.getChildrenMap()
    )
  }
}
