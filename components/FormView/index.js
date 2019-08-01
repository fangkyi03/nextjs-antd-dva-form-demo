import React, { Component } from 'react'
import FormContainer from '../FormContainer';
import apiTool from '../../command/apiTool';
import FormSelect from '../FormContainer/FormSelect';
import FormInput from '../FormContainer/FormInput';

export default class FormView extends Component {

  static defaultProps = {
    colSize: {
      labelCol: 8,
      wrappCol: 10,
    }
  }

  constructor(props) {
    super(props);
    this.form = new FormContainer({ formData: props.data, ...props })
    this.form.regComponet('selectNew',FormInput)
    this.form.regComponet('inputSelect',(item)=>{
      return {
        ...item,
        type:'itemGroup',
        keys: [
          {
            name: '测试1',
            type: 'input',
            key: 'a1',
            cols: 10,
            rules: [
              {
                required: true
              }
            ]
          },
          {
            name: '测试2',
            type: 'select',
            key: 'a2',
            cols: 10
          }
        ],
        rules: [
          {
            required: true
          }
        ]
      }
    })
  }

  onGetRef = () => {
  }

  render() {
    return this.form.getRow(
      this.form.getChildrenMap()
    )
  }
}
