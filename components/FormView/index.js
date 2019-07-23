import React, { Component } from 'react'
import FormContainer from '../FormContainer';

export default class FormView extends Component {

  constructor(props) {
    super(props);
    this.form = new FormContainer({formData:props.data,...props})
  }
  
  render() {
    this.form.bindData(this.props)
    return this.form.getRow(
      this.form.getChildrenMap()
    )
  }
}
