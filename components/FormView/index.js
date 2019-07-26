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
      </div>
    )
  }
}
