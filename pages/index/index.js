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
    this.formData = [
      // 测试组1
      this.getFormHeaderGroup(),
      // 测试2
      this.getFormHeaderGroup1()
    ]
  }
  
  getFormHeaderGroup = () =>{
    return {
      type: 'group',
      cols:24,
      labelCol:6,
      wrappCol:5,
      keys: [
        {
          type: 'input',
          name: '测试1',
          key: 'a1',
          rules:[
            {
              required:true,
            },
            {
              type:'maxLen',
              value:10,
              msg:'输入内容超过10位'
            }
          ]
        },
        {
          type: 'input',
          name: '测试2',
          key: 'a2',
        },
        {
          type: 'input',
          name: '测试3',
          key: 'a3',
        },
      ]
    }
  }

  getFormHeaderGroup1 = () => {
    return {
      type: 'group',
      cols: 24,
      keys: [
        {
          type: 'select',
          name: '测试4',
          key: 'a4',
          typeData:[
            {
              name:'测试1',
              value:1
            },
            {
              name:'测试2',
              value:2
            }
          ]
        },
      ]
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

  onTestError = () =>{
    apiTool.setFormError(this,'FormView',{a1:'错误'})
  }

  render() {
    const NewFormView = this.formView
    return (
      <div style={{paddingTop:apiTool.getSize(30)}}>
        <NewFormView
          data={this.formData}
          colSize={{
            labelCol: 8,
            wrappCol: 5,
          }}
        />
        <Button onClick={this.onButtonDown}>点击刷新数据</Button>
        <Button onClick={this.onToggleDisplay}>切换显示</Button>
        <Button onClick={this.onTestError}>测试错误显示</Button>
      </div>
    )
  }
}

export default createDva([])(Index)