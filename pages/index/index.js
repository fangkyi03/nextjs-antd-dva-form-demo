import React, { Component } from 'react'
import apiTool from '../../command/apiTool';
import {Button, Input} from 'antd'
import styles  from './index.less'
import Link from 'next/link'
import createDva from '../../command/createDva';
import FormModal from '../../components/FormModal/index';
import FormView from '../../components/FormView';

@createDva([])
class Index extends Component {

  constructor(props) {
    super(props);
    this.toggleDisplay = true
    this.formView = createDva(['FormView'])(FormView)
    this.formView1 = createDva(['FormView1'])(FormView)
    this.formModal = createDva(['FormModal'])(FormModal)
    this.formData = [
      // 测试组1
      this.getFormHeaderGroup(),
    ]
    this.formData1 = [
      // 测试组1
      this.getFormHeaderGroup1(),
    ]
  }
  
  getFormHeaderGroup = () =>{
    return {
      type: 'group',
      cols:24,
      labelCol:6,
      wrappCol:5,
      keys:Array(500).fill({}).map((e,i)=>({
        type:'input',
        name:'测试' + i,
        key:'a' + i,
        cols:12,
        rules:[
          {
            required:true
          }
        ]
      }))
    }
  }

  getFormHeaderGroup1 = () => {
    return {
      type: 'group',
      cols: 24,
      labelCol: 6,
      wrappCol: 5,
      keys: Array(10).fill({}).map((e, i) => ({
        type: 'select',
        name: '下拉' + i,
        key: 'a' + i,
        cols: 12,
        typeData:[
          {
            name:'测试下拉',
            value:1
          }
        ],
        rules: [
          {
            required: true
          }
        ]
      }))
    }
  }

  onButtonDown = () =>{
    apiTool.setFormValue(this,'FormView',{
      a1:'',
      a2:Math.random() * 1001,
      a3: Math.random() * 1001,
      a4:1
    })
  }

  onToggleDisplay = () =>{
    this.toggleDisplay = !this.toggleDisplay
    apiTool.toggleFormNotDisplay(this, 'FormView', ['a1', 'a2'], this.toggleDisplay)
  }

  onShowModal = () =>{
    apiTool.toggleModal(this,'FormModal')
  }
  
  onSetDisableDown = () => {
    apiTool.setFormDisable(this,'FormView',['a1','a4'])
    apiTool.setFormDisable(this,'FormModal',['a1','a2','a4'])
  }

  render() {
    const NewFormView = this.formView
    const NewFormModal = this.formModal
    const NewFormView1 = this.formView1
    return (
      <div style={{paddingTop:apiTool.getSize(30)}}>
        <NewFormView data={this.formData}/>
        <NewFormView1 data={this.formData1} />
        <NewFormModal data={this.formData}/>
        <div style={{display:'flex',justifyContent:'center'}}>
          <Button onClick={this.onButtonDown}>点击刷新数据</Button>
          <Button onClick={this.onToggleDisplay}>切换显示</Button>
          <Button onClick={this.onShowModal}>显示弹窗modal</Button>
          <Button onClick={this.onSetDisableDown}>设置表单禁用</Button>
        </div>
      </div>
    )
  }
}

export default createDva([])(Index)