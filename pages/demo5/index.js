import React, { Component } from 'react'
import FormView from '../../components/FormView';
import { Button } from 'antd';
import createDva from '../../command/createDva';
import apiTool from '../../command/apiTool';
import Center from '../../components/Center';

@createDva([])
export default class Demo5 extends Component {

    constructor(props) {
        super(props);
        this.form = createDva(['demo5Form'])(FormView)
    }

    // 动态添加编辑框
    onAddInput = async() => {
        const oldForm = await apiTool.getValue(this,'demo5Form')
        apiTool.setValue(this,'demo5Form',{
            data:[
                {
                    type:'input',
                    key:'a' + (oldForm.data || []).length + 1,
                    name: '测试' + (oldForm.data || []).length + 1
                }
            ].concat((oldForm.data || []))
        })
    }

    // 动态添加下拉框
    onAddSelect = async() =>{
        const oldForm = await apiTool.getValue(this, 'demo5Form')
        apiTool.setValue(this, 'demo5Form', {
            data: [
                {
                    type: 'select',
                    key: 'a' + (oldForm.data || []).length + 1,
                    name: '测试' + (oldForm.data || []).length + 1,
                    typeData:[
                        {
                            name:'测试',
                            value:1
                        }
                    ]
                }
            ].concat((oldForm.data || []))
        })
    }

    // 获取表单结构
    getForm = async() => {
        const oldForm = await apiTool.getValue(this, 'demo5Form')
        // 这里放的其实就是可以被回显的表单结构
        console.log('输出oldForm', oldForm)
    }

    // 获取表单数据源
    getFormDataSource = async() => {
        const dataSource = await apiTool.getFormValue(this, 'demo5Form')
        console.log(dataSource)
    }

    renderButtonGroup = () => {
        const data = [
            {
                name:'添加编辑框组件',
                onClick:this.onAddInput
            },
            {
                name:"添加下拉菜单",
                onClick:this.onAddSelect
            },
            {
                name:'获取当前添加表单结构',
                onClick: this.getForm
            },
            {
                name:'获取当前表单数据源',
                onClick: this.getFormDataSource
            }
        ]
        return (
            <Center>
                {
                    data.map((e,i)=>{
                        return (
                            <Button onClick={e.onClick} key={i}>{e.name}</Button>
                        )
                    })
                }
            </Center>
        )
    }

    render() {
        const Form = this.form
        return (
            <div>
                <Form
                />
                {this.renderButtonGroup()}
            </div>
        )
    }
}
