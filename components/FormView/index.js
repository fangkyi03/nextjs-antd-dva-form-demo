import React, { Component } from 'react'
import FormContainer from '../FormContainer';
import apiTool from '../../command/apiTool';

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
    apiTool.setValue(this, this.props.modelList[0], {
      formData: props.data,
      notDisplay: [],
      required: [],
      error: {},
      disable: []
    })
  }

  onGetRef = () => {
  }

  render() {
    this.form.bindData(this.props)
    return (
      <div>
        {
          this.form.getRow(
            this.form.getChildrenMap()
          )
        }
        <div onClick={this.onGetRef}>点击获取ref</div>
      </div>
    )
  }
}
