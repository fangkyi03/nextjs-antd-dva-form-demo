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
    this.formView = createDva(['FormView'])(FormView)
    this.formData = [
      // 测试组1
      this.getFormHeaderGroup()
    ]
  }
  
  getFormHeaderGroup = () =>{
    return {
      type: 'group',
      cols:24,
      keys: [
        {
          type: 'input',
          name: '测试1',
          key: 'a1',
          cols: 4
        },
        {
          type: 'input',
          name: '测试2',
          key: 'a2',
          cols: 4,
        },
        {
          type: 'input',
          name: '测试3',
          key: 'a3',
          cols: 4
        },
      ]
    }
  }

  onButtonDown = () =>{
    apiTool.setFormValue(this,'FormView',{
      a1:Math.random() * 10900,
      a2:Math.random() * 1001
    })
  }

  onToggleDisplay = () =>{
    apiTool.setValue(this,'FormView',{
      notDisplay:Math.random() * 1 ? ['a1','a2']:[]
    })
  }

  render() {
    const NewFormView = this.formView
    return (
      <div>
        <NewFormView
          data={this.formData}
          colSize={{
            labelCol: 8,
            wrappCol: 16,
          }}
        />
        <Button onClick={this.onButtonDown}>点击刷新数据</Button>
        <Button onClick={this.onToggleDisplay}>切换显示</Button>
      </div>
    )
  }
}

export default createDva([])(Index)