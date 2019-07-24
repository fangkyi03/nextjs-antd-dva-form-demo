import React, { Component } from 'react'
import {Modal} from 'antd'
import createDva from '../../command/createDva';
import apiTool from '../../command/apiTool';
import FormView from '../FormView';

export default class FormModal extends Component {

  onCancel = () => {
    apiTool.toggleModal(this,this.props.modelList[0],false)
  }

  render() {
    const {isShowModal} = this.props
    return (
        <Modal
            onCancel={this.onCancel}
            visible={isShowModal}
        >
            <FormView {...this.props}/>
        </Modal>
    )
  }
}
