import React, { Component } from 'react'
import FormCard from '../../components/FormCard';
import { Button } from 'antd';
import Center from '../../components/Center';
import apiTool from '../../command/apiTool';
import createDva from '../../command/createDva';

@createDva([])
export default class Demo6 extends Component {

    constructor(props) {
        super(props);
        // 这里写的是所有动态表单的事件绑定
        // 因为动态表单的关系 如果想下次进来还绑定事件 这里就需要这样做 否则事件无法绑定
        this.formEvent = {
            b1: {
                onClick: this.onAdd
            }
        }
        // 这种card的数组结构的 只改变data里面的值 但是长度不变的情况下 需要把pure改成false
        // 否则在react-redux里面会被diff掉 不会刷新页面
        this.formCard = createDva(['demo6'], { option: { pure: false } })(FormCard)
    }

    componentDidMount() {
        apiTool.setValue(this, 'demo6', {
            data: [
                {
                    title: '卡片1',
                    data: [
                        {
                            name: '测试1',
                            type: 'input',
                            key: 'a1',
                            rules: [
                                {
                                    required: true,
                                }
                            ]
                        },
                        {
                            name: '测试2',
                            type: 'input',
                            key: 'a2'
                        },
                        {
                            name: '动态添加',
                            type: 'button',
                            title: '点击添加',
                            key: 'b1'
                        }
                    ]
                },
                {
                    title: '卡片2',
                    data: [
                        {
                            name: '测试3',
                            type: 'input',
                            key: 'a3'
                        },
                        {
                            name: '测试4',
                            type: 'input',
                            key: 'a4'
                        }
                    ]
                }
            ]
        })
    }

    onAdd = async () => {
        const oldForm = await apiTool.getValue(this, 'demo6')
        const newForm = Object.assign({}, oldForm)
        newForm.data[0].data.unshift({
            type: 'input',
            name: '测试测试' + newForm.data[0].data.length + 1,
            key: 't' + newForm.data[0].data.length
        })
        apiTool.setValue(this, 'demo6', { data: newForm.data })
    }

    onSumbit = () => {
        apiTool.sumbitForm(this,'demo6',({error,dataSource})=>{
            if (!error) {
                alert('表单通过')
            }else {
                alert('表单不通过')
            }
        })
    }

    onReset = () => {
        apiTool.resetForm(this, 'demo6')
    }

    renderButton = () => {
        const data = [
            {
                name: '提交',
                onClick: this.onSumbit
            },
            {
                name: '重置',
                onClick: this.onReset
            },
        ]
        return (
            <Center>
                {
                    data.map((e, i) => {
                        return (
                            <Button onClick={e.onClick} key={i}>{e.name}</Button>
                        )
                    })
                }
            </Center>
        )
    }

    render() {
        const FormCardView = this.formCard
        return (
            <div>
                <FormCardView formEvent={this.formEvent} />
                {this.renderButton()}
            </div>
        )
    }
}
