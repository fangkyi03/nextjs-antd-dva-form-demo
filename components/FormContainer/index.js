import React from 'react'
import { Row, Col, Checkbox } from 'antd';
import apiTool from '../../command/apiTool';
import 'antd/es/form/style'
import FormSelect from './FormSelect';
import FormInput from './FormInput';
export default class FormContainer {

    static defaultProps = {
        colSize: {
            labelCol: 8,
            wrappCol: 16,
        }
    }

    constructor({ formData, ...arg }) {
        this.formData = formData
        this.props = arg
        this.customChildren = null
        this.destoryNum = 0
    }

    getChildrenData = (item) => {
        return item.keys
    }

    renderCols = ({ item, index }) => {
        return (Component) => {
            return (
                <Col span={item.cols || 8}>
                    {this.renderNormal({ item, index })(Component)}
                </Col>
            )
        }
    }

    getValue = (item) => {
        const { dataSource = {} } = this.props
        if (!item.key) return
        return dataSource[item.key] ? dataSource[item.key] : item.value || ''
    }

    renderNormal = ({ item, index }) => {
        return (Component) => {
            if (item.name) return this.renderFormItem({ item, index })(Component)
            return this.renderComponent({ item, index })(Component)
        }
    }

    onChange = (value, item) => {
        if (item.type == 'input') {
            apiTool.setFormValue(this, this.props.modelList[0], { [item.key]: value.currentTarget.value })
        }
    }

    onHelpAnimEnd = () => {
        console.log('动画结束')
    }

    getTypeData = (item) =>{
        const {typeData = {}} = this.props
        return typeData[item.key] || item.typeData || []
    }

    onDestory = () =>{
        if (this.destoryNum == 0) {
            this.destoryNum += 1;
            setTimeout(() => {
                console.log('输出延迟')
            },100)
        }else {
            this.destoryNum += 1;
        }
    }

    getNotDisplay = (item) =>{
        const {notDisplay = []} = this.props
        return notDisplay.indexOf(item.key) == -1
    }

    renderComponent = ({ item, index }) => {
        return (Component) => {
            return (
                <div className={'ant-form-item-control'} key="help">
                    <span className={'ant-form-item-children'}>
                        <Component
                            key={index}
                            value={this.getValue(item)}
                            typeData={this.getTypeData(item)}
                            style={item.style}
                            onChange={(value) => this.onChange(value, item)}
                        />
                    </span>
                    {/* <Animate
                        transitionName="show-help"
                        component=""
                        transitionAppear
                        key="help"
                        onEnd={this.onHelpAnimEnd}
                    >
                        <div className={`ant-form-explain`} key="help">
                            1123123
                        </div>
                    </Animate> */}
                </div>
            )
        }
    }

    renderFormItem = ({ item, index }) => {
        return (Component) => {
            return (
                <Row key={index} className={'ant-row ant-form-item'}>
                    {this.renderLabel(item)}
                    {this.renderWraper(item)(Component)}
                </Row>
            )
        }
    }

    getLabelCol = (item) => {
        const { colSize } = this.props
        return item.labelCol || colSize.labelCol || 8
    }

    getWrapperCol = (item) => {
        const { colSize } = this.props
        return item.wrappCol || colSize.wrappCol || 8
    }

    renderLabel = (item) => {
        const labelCol = this.getLabelCol(item)
        return (
            <Col span={labelCol} className={'ant-form-item-label'}>
                <label className={'ant-form-item-required'} title={item.name}>{item.name}</label>
                {/* <div style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end',padding: '5px 11px', }}>{item.name}</div> */}
            </Col>
        )
    }

    renderWraper = (item) => {
        const wrappCol = this.getWrapperCol(item)
        return (Component) => {
            return (
                <Col span={wrappCol}>
                    {this.renderComponent({ item })(Component)}
                </Col>
            )
        }
    }


    renderChildren = ({ item, index }) => {
        return (Component) => {
            const isNotDisplay = this.getNotDisplay(item)
            if (!isNotDisplay) return null
            const fun = [this.renderNormal, this.renderCols][Number(!!item.cols)]
            return fun({ item, index })(Component)
        }
    }

    renderGroup = (item) =>{
        const groupCol = item.cols || 24
        return (Component) =>{
            return (
                <Col span={groupCol}>
                    <Row gutter={item.gutter || 8} className={'ant-row ant-form-item'}>
                        {Component}
                    </Row>
                </Col>
            )
        }
    }

    renderItemGroup = (item) =>{
        const wrappCol = this.getWrapperCol(item)
        return (Component) =>{
            return (
                <Col span={item.cols || 8}>
                    <Row gutter={item.gutter || 5} className={'ant-row ant-form-item'}>
                        {this.renderLabel(item)}
                        <Col span={wrappCol}>
                            {Component}
                        </Col>
                    </Row>
                </Col>
            )
        }
    }

    setCustomChildren (callBack){
        this.customChildren = callBack;
    }

    getCustomChildren = ({item}) =>{
        if (this.customChildren) {
            const retData = this.customChildren(item)
            if (React.isValidElement(retData)){
                return retData
            }else if (Array.isArray(retData)) {
                return this.getChildrenMap(retData)
            } else if (retData.type){
                return this.getChildren({item:retData})
            }else {
                return
            }
        }else {
            return null
        }
    }

    getChildren = (data) => {
        switch (data.item.type) {
            case 'input':
                return this.renderChildren(data)(FormInput)
            case 'select':
                return this.renderChildren(data)(FormSelect)
            case 'checkBox':
                return this.renderChildren(data)(Checkbox)
            case 'group':
                return this.renderGroup(data.item)(this.getChildrenMap(data.item.keys));
            case 'itemGroup':
                return this.renderItemGroup(data.item)(this.getChildrenMap(data.item.keys.map((e)=>({...e,name:null}))))
            default:
                return this.getCustomChildren(data)
        }
    }

    getChildrenMap = (data = this.formData) => {
        return data.map((e, index) => {
            return this.getChildren({ item: e, index })
        })
    }

    getRow = (children, gutter = 10) => {
        return (
            <Row gutter={gutter}>
                {children}
            </Row>
        )
    }

    bindData = (data) => {
        this.props = data
    }
}
