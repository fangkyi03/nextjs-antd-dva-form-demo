import React from 'react'
import { Row, Col } from 'antd';
import 'antd/es/form/style'
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import moment from 'moment'
import FormRef from './FormRef';
import formStore from '../../utils/formStore';
import classNames from 'classnames';
import FormText from './FormText';
import FormInputArea from './FormInputArea';
import FormDateTime from './FormDateTime';
import FormRangePicker from './FormRangePicker';
import FormButton from './FormButton';
import FormCascader from './FormCascader';
import FormGridContainer from './FormGridContainer';
import FormRadio from './FormRadio';
import FormCheckGroup from './FormCheckGroup';
import FormInputNumber from './FormInputNumber';
import FormSwitch from './FormSwitch';
import FormSlider from './FormSlider';
import FormRate from './FormRate';
export default class FormContainer {

    constructor({ formData, ...arg }) {
        this.formData = formData
        this.customChildren = null
        this.destoryNum = 0
        this.errorObj = {}
        this.errorTime = moment().valueOf()
        this._ref = {}
        this._cols = {}
        this.regComponentObj = {}
        this.regRulesObj = {}
        this.colSize = arg.colSize || {
            labelCol: 5,
            wrappCol: 18,
            cols: 24
        }
        this.modelName = (arg.modelList && arg.modelList[0]) || arg.modelName || ''
        this.initStore()
    }

    initFormData = (formData, obj) => {
        formData.forEach((e) => {
            if (Array.isArray(e.keys) && e.keys.length > 0) {
                return this.initFormData(e.keys, obj)
            } else {
                obj[e.key] = e
            }
        })
        return obj
    }

    initStore = () => {
        formStore.addStore(this.getFormName(), (store = { dataSource: {} }) => ({
            subscribe: this.subscribe,
            setNotDisplay:this.setNotDisplay,
            dataSource: store.dataSource || {},
            disable: store.disable || [],
            typeData: store.disable || [],
            formData: this.initFormData(this.formData, {}),
            getRules: this.pushError,
            setFormError:this.setFormError,
            setFormDisable:this.setFormDisable,
            notDisplay:[],
        }))
    }

    replaceFormData = (name,formData) => {
        formStore.replaceForm(name,this.initFormData(formData,{}))
        this.formData = formData
    }

    setFormDisable = (disableArr,isDisable = true) => {
        disableArr.forEach((e)=>{
            if (this._ref[e]) {
                this._ref[e].setProps({
                    disable: isDisable
                })
            }
        })
    }

    setNotDisplay = (notDisplay,isShow) => {
        notDisplay.forEach((e)=>{
            this._cols[e].setShow(isShow)
        })
    }

    setFormError = (error) =>{
        Object.keys(error).forEach((e)=>{
            this._ref[e].setProps({
               error:error[e]
            })
        })
    }

    subscribe = (dataSource) => {
        Object.keys(dataSource).forEach((e) => {
            if (this._ref[e]) {
                const formItem = formStore.getFormItem(this.getFormName(), e)
                this._ref[e].setProps({
                    value: dataSource[e],
                    disable: this.getDisable(formItem),
                    typeData: this.getTypeData(formItem),
                    error: this.getRulesMessage(formItem),
                    notDisplay: this.getNotDisplay(formItem),
                    data: formItem,
                })
            }
        })
    }

    getChildrenData = (item) => {
        return item.keys
    }

    renderCols = ({ item, index }) => {
        return (Component) => {
            return (
                <FormGridContainer
                    key={index}
                    span={item.cols || this.getParentCols() || 8} 
                    ref={(r) => this._cols[item.key] = r}
                >
                    {this.renderNormal({ item, index })(Component)}
                </FormGridContainer>
            )
        }
    }


    getValue = (item) => {
        const dataSource = formStore.getFormData(this.getFormName())
        if (!item.key) return
        return dataSource && dataSource[item.key] ? dataSource[item.key] : item.value || ''
    }

    renderNormal = ({ item, index }) => {
        return (Component) => {
            if (item.name) return this.renderFormItem({ item, index })(Component)
            return this.renderComponent({ item, index })(Component)
        }
    }

    addStoreData = (key, data) => {
        formStore.changeStoreData(this.getFormName(), key, data)
        this.subscribe({ [key]: data })
    }

    onChange = (value, item) => {
        this.addStoreData(item.key, value)
    }

    onHelpAnimEnd = () => {
        console.log('动画结束')
    }

    getTypeData = (item) => {
        const { typeData = {} } = this.getFormStore()
        return typeData[item.key] || item.typeData || []
    }

    getNotDisplay = (item) => {
        const { notDisplay = [] } = this.getFormStore()
        return !notDisplay.indexOf(item.key) == -1
    }

    getRule = (rule, value, item) => {
        const data = {
            required: {
                reg: /\S/,
                msg: '请输入' + (item.name || '') + '内容'
            },
            maxLen: {
                err: value.length > (rule.value || 10),
                msg: '输入内容超过长度'
            }
        }
        if (!rule.type && !rule.reg) {
            if (!data['required'].reg.test(value)) {
                return rule.msg || data['required'].msg
            } else {
                return ''
            }
        } 
        if (rule.reg) {
            if (!rule.reg.test(value)) {
                return rule.msg || '请输入内容';   
            }else {
                return ''
            }
        }
        if (data[rule.type].reg && !data[rule.type].reg.test(value)) {
            return rule.msg || data[rule.type].msg
        } else if (data[rule.type].err) {
            return rule.msg || data[rule.type].msg
        } else {
            return ''
        }
    }

    getRules = (item) => {
        if (item.rules && item.rules.length > 0) {
            for (let i = 0; i < item.rules.length; i++) {
                const retData = this.getRule(item.rules[i], this.getValue(item), item)
                if (retData) {
                    return retData
                }
            }
        }
        return null
    }

    getFormName = () => {
        return this.modelName
    }

    addError = (item) => {
        const { error = {} } = this.getFormStore()
        if (error[item.key] !== this.errorObj[item.key]) {
            formStore.changeError(this.getFormName(), this.errorObj)
        }
    }

    isEqual = () => {
        return JSON.stringify(this.props.error) == JSON.stringify(this.errorObj)
    }

    getRef = () => {
        return this._ref
    }

    pushError = (item) => {
        const ret = this.getRules(item)
        this.errorObj[item.key] = ret
        this.addError(item)
        return ret;
    }

    getFormStore = () => {
        return formStore.getFormStore(this.getFormName())
    }

    getRulesMessage = (item) => {
        if (item.rules && item.rules.length > 0) {
            this.pushError(item)
            const { error = {} } = this.getFormStore()
            if (error[item.key]) {
                return error[item.key]
            } else {
                return ''
            }
        } else {
            return ''
        }
    }

    getDisable = (item) => {
        const { disable = [] } = this.getFormStore()
        return disable.indexOf(item.key) !== -1
    }

    getOtherEvent = (item) => {
        const obj = {}
        Object.keys(item).forEach((e)=>{
            if (e.indexOf('on') !== -1) {
                obj[e] = item[e]
            }
        })
        return obj
    }

    renderComponent = ({ item, index }) => {
        return (Component) => {
            return (
                <FormRef
                    ref={(r) => this._ref[item.key] = r}
                    onChange={(value) => this.onChange(value, item)}
                    key={item.key}
                    value={this.getValue(item)}
                    disable={this.getDisable(item)}
                    typeData={this.getTypeData(item)}
                    notDisplay={this.getNotDisplay(item)}
                    data={item}
                    {...this.getOtherEvent(item)}
                >
                    <Component
                        style={item.style}
                    />
                </FormRef>
            )
        }
    }

    renderFormItem = ({ item, index }) => {
        return (Component) => {
            return (
                <Row key={index} className={'ant-form-item'}>
                    {this.renderLabel(item)}
                    {this.renderWraper(item)(Component)}
                </Row>
            )
        }
    }

    getLabelCol = (item) => {
        const { colSize } = this.getParentColSize()
        return item.labelCol || colSize.labelCol || 8
    }

    getParentColSize = () => {
        return { colSize: this.colSize }
    }

    getWrapperCol = (item) => {
        const { colSize } = this.getParentColSize()
        return item.wrappCol || colSize.wrappCol || 8
    }

    getRequired = (item) => {
        if (item.rules) {
            return item.rules.some((e) => e.required == true)
        } else {
            return false
        }
    }

    renderLabel = (item) => {
        const labelCol = this.getLabelCol(item)
        const labelClass = classNames({
            ['ant-form-item-required']: this.getRequired(item)
        })
        return (
            <Col span={labelCol} className={'ant-form-item-label'}>
                <label className={labelClass} title={item.name}>{item.name}</label>
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

    getParentCols = () => {
        return this.getParentColSize().colSize.cols
    }

    renderChildren = ({ item, index }) => {
        return (Component) => {
            const fun = [this.renderNormal, this.renderCols][Number(!!(item.cols || this.getParentCols()))]
            return fun({ item, index })(Component)
        }
    }

    renderGroup = (item) => {
        const groupCol = item.cols || 24
        return (Component) => {
            return (
                <Col span={groupCol}>
                    <Row gutter={item.gutter || 8} className={'ant-row'}>
                        {Component}
                    </Row>
                </Col>
            )
        }
    }

    renderItemGroup = (item) => {
        const wrappCol = this.getWrapperCol(item)
        return (Component) => {
            return (
                <Col span={item.cols || this.getParentCols()}>
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

    setCustomChildren(callBack) {
        this.customChildren = callBack;
    }

    addFormData = (item) => {
        const formData = this.initFormData([item], {}) || {}
        const store = this.getFormStore()
        Object.keys(formData).forEach((e) => {
            if (!store.formData[e]) {
                store.formData[e] = formData[e]
            }
        })
    }

    getCustomChildren = ({ item }) => {
        const obj = this.regComponentObj[item.type]
        if (obj) {
            if (obj.prototype.render) {
                this.addFormData(item)
                return this.renderChildren({ item })(obj)
            } else if (typeof obj == 'function') {
                const funData = obj(item)
                if (Array.isArray(funData)) {
                    this.addFormData({ type: 'itemGroup', keys: funData })
                    return this.getChildren({ item: { type: 'itemGroup', keys: funData } })
                } else if (React.isValidElement(funData)) {
                    this.addFormData(item)
                    return this.renderChildren({ item })(() => funData)
                } else if (funData) {
                    this.addFormData(funData)
                    return this.getChildren({ item: funData })
                } else {
                    return null
                }
            }
        } else {
            return null
        }
    }

    getChildren = (data) => {
        const type = typeof data.item.type == 'function' ? data.item.type(this.props) : data.item.type
        switch (type) {
            case 'text':
                return this.renderChildren(data)(FormText)
            case 'input':
                return this.renderChildren(data)(FormInput)
            case 'select':
                return this.renderChildren(data)(FormSelect)
            case 'checkBox':
                return this.renderChildren(data)(FormCheckGroup)
            case 'inputArea':
                return this.renderChildren(data)(FormInputArea)
            case 'dateYear':
            case 'dateTime':
            case 'dateMonth':
            case 'dateDate':
            case 'dateDecade':
                return this.renderChildren(data)(FormDateTime)
            case 'rangePicker':
                return this.renderChildren(data)(FormRangePicker)
            case 'button':
                return this.renderChildren(data)(FormButton)
            case 'cascader':
                return this.renderChildren(data)(FormCascader)
            case 'radio':
                return this.renderChildren(data)(FormRadio)
            case 'inputNumber':
                return this.renderChildren(data)(FormInputNumber)
            case 'switch':
                return this.renderChildren(data)(FormSwitch)
            case 'slider':
                return this.renderChildren(data)(FormSlider)
            case 'rate':
                return this.renderChildren(data)(FormRate)
            case 'group':
                return this.renderGroup(data.item)(this.getChildrenMap(data.item.keys));
            case 'itemGroup':
                return this.renderItemGroup(data.item)(this.getChildrenMap(data.item.keys.map((e) => ({ ...e, name: null }))))
            default:
                return this.getCustomChildren(data)
        }
    }

    getChildrenMap = (data = this.formData) => {
        return data.map((e, index) => {
            return this.getChildren({ item: e, index })
        })
    }

    regComponet = (name, Component) => {
        this.regComponentObj[name] = Component
    }

    getRow = (children, gutter = 10) => {
        return (
            <Row gutter={gutter}>
                {children}
            </Row>
        )
    }
}
