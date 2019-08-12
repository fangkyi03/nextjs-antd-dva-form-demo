import React, { Component } from 'react'
import apiTool from '../../command/apiTool';
import {Button, Input} from 'antd'
import styles  from './index.less'
import Link from 'next/link'
import createDva from '../../command/createDva';
import FormModal from '../../components/FormModal/index';
import FormView from '../../components/FormView';
import formStore from '../../utils/formStore';

@createDva([])
class Index extends Component {

  constructor(props) {
    super(props);
    this.toggleDisplay = true
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
      // keys:[
      //   // {
      //   //   type:'inputSelect',
      //   //   name:'测试',
      //   //   cols:24
      //   // },
      //   {
      //     type:'inputSelect',
      //     key:'a2',
      //     name:'测试1',
      //     cols:24
      //   }
      // ]
      keys:Array(1000).fill({}).map((e,i)=>({
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
    formStore.changeDataSource('FormView', {
      a2:Math.random() * 10,
      a3:Math.random() * 10,
    })
  }

  render() {
    return (
      <div style={{paddingTop:apiTool.getSize(30),display:'flex'}}>
        <div style={{ display: 'flex',flexDirection:'column',width:500,height:2000 }}>
          <div onClick={this.onButtonDown}>div按钮测试流畅</div>
          <Button onClick={this.onButtonDown}>button刷新数据测试卡顿</Button>
        </div>
        <div style={{display:'flex',flexDirection:'column',flex:1}}>
          <FormView data={this.formData} modelName={'FormView'} />
        </div>
      </div>
    )
  }
}

export default Index