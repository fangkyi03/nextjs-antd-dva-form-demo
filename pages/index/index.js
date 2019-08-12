import React, { Component } from 'react'
import FormView from '../../components/FormView';
import apiTool from '../../command/apiTool';
import { Button } from 'antd';
import createDva from '../../command/createDva';

@createDva([])
export default class Demo1 extends Component {

    constructor(props) {
        super(props);
        this.formData = [
            {
                name: 'radio',
                type: 'radio',
                key: 'a1',
                typeData: [
                    {
                        name: '1',
                        value: 1
                    },
                    {
                        name: '2',
                        value: 2
                    },
                    {
                        name: '3',
                        value: 3
                    },
                    {
                        name: '4',
                        value: 4
                    }
                ],
                rules: [
                    {
                        required: true
                    }
                ]
            },
            {
                key: 'a2',
                type: 'select',
                name: 'select',
                wrappCol: 3,
                typeData: [
                    {
                        name: '测试1',
                        value: 1
                    },
                    {
                        name: '测试2',
                        value: 2
                    }
                ],
                rules: [
                    {
                        required: true
                    }
                ]
            },
            {
                type: 'checkBox',
                name: 'checkbox',
                key: 'a3',
                typeData: [
                    {
                        name: '1',
                        value: 1
                    },
                    {
                        name: '2',
                        value: 2
                    },
                    {
                        name: '3',
                        value: 3
                    },
                    {
                        name: '4',
                        value: 4
                    }
                ],
                rules: [
                    {
                        required: true
                    }
                ]
            },
            {
                key: 'a4',
                type: 'inputArea',
                name: 'TextArea',
                wrappCol: 10,
                style: { maxHeight: apiTool.getSize(100) }
            },
            {
                name: '数字选择',
                type: 'inputNumber',
                key: 'a5'
            },
            {
                name: '选择',
                type: 'switch',
                key: 'a6'
            },
            {
                name: '日期选择',
                type: 'dateTime',
                key: 'a7'
            },
            {
                name: '年份',
                type: 'dateYear',
                key: 'a8'
            },
            {
                name: '月',
                type: 'dateMonth',
                key: 'a9'
            },
            {
                name: '卡片上传文件',
                type: 'imageUpload',
                key: 'a10',
                wrappCol:10
            },
            {
                name: '范围选择',
                type: 'slider',
                key: 'a11',
                wrappCol: 10
            },
            {
                name: '星星',
                type: 'rate',
                key: 'a12'
            }
        ]
    }

    onSumbit = () => {
        apiTool.sumbitForm(this, 'demo1', ({ error}) => {
            if (!error) {
                alert('表单通过')
            }else {
                alert('表单不通过')
            }
        })
    }

    onReset = () => {
        apiTool.resetForm(this, 'demo1')
    }

    onChangeRadio = () => {
        apiTool.setFormValue(this, 'demo1', {
            a1: 3
        })
    }

    onUpload = async() => {
        const upload = await apiTool.getFormValue(this, 'demo1','a10')
        apiTool.setFormValue(this, 'demo1', {
            a11:50,
            a12:3,
            a10: [{
                uid:Math.random() * 1000,
                name:'xxx',
                thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                response: {
                    uid:'xxx',
                    name: "xxx.png",
                    status: "done",
                    thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                }
            }].concat(upload || [])
        })
    }

    onSetAll = () =>{
        apiTool.setFormValue(this, 'demo1', {
            a1:Math.floor(Math.random() * 4),
            a2: Math.floor(Math.random() * 4),
            a3: [Math.floor(Math.random() * 4)],
            a4:Math.random() * 1000,
            a5:Math.random() * 1000,
            a6:1,
            a7:'2019-01-02',
            a8:'2019-01-02',
            a9:'2019-08-02',
            a10: [{
                uid: Math.random() * 1000,
                name: 'xxx',
                thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                response: {
                    uid: 'xxx',
                    name: "xxx.png",
                    status: "done",
                    thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                }
            }],
            a11: Math.floor(Math.random() * 100),
            a12: Math.floor(Math.random() * 5),
        })
    }

    renderFootButton = () => {
        const data = [
            {
                name: '提交',
                onClick: this.onSumbit
            },
            {
                name: '重置',
                onClick: this.onReset
            },
            {
                name: "上传文件",
                onClick: this.onUpload
            },
            {
                name: '改变radio值',
                onClick: this.onChangeRadio
            },
            {
                name:'随机设置所有值',
                onClick:this.onSetAll
            }
        ]
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    data.map((e,i) => {
                        return (
                            <Button
                                key={i}
                                onClick={() => e.onClick && e.onClick()}
                            >
                                {e.name}
                            </Button>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                <FormView
                    modelName={'demo1'}
                    data={this.formData}
                    colSize={{
                        labelCol: 10,
                        wrappCol: 14,
                        cols: 24
                    }}
                />
                {/* 底部按钮 */}
                {this.renderFootButton()}
            </div>
        )
    }
}
