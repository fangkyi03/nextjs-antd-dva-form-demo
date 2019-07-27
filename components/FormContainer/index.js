import React from 'react'
import { Row, Col } from 'antd';
import 'antd/es/form/style'
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import moment from 'moment'
import FormRef from './FormRef';
import formStore from '../../utils/formStore';
import classNames from 'classnames';
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
        this.errorObj = {}
        this.errorTime = moment().valueOf()
        this._ref = {}
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
        formStore.addStore(this.getFormNmae(), {
            subscribe: this.subscribe,
            dataSource: {},
            disable: [],
            typeData: [],
            formData: this.initFormData(this.formData, {})
        })
    }

    subscribe = (dataSource) => {
        Object.keys(dataSource).forEach((e) => {
            const formItem = formStore.getFormItem(this.getFormNmae(), e)
            this._ref[e].setProps({
                value: this.getValue(formItem),
                disable: this.getDisable(formItem),
                typeData: this.getTypeData(formItem),
                error: this.getRulesMessage(formItem)
            })
        })
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
        const dataSource = formStore.getFormData(this.getFormNmae())
        if (!item.key) return
        return dataSource[item.key] ? dataSource[item.key] : item.value || ''
    }

    renderNormal = ({ item, index }) => {
        return (Component) => {
            if (item.name) return this.renderFormItem({ item, index })(Component)
            return this.renderComponent({ item, index })(Component)
        }
    }

    addStoreData = (key, data) => {
        formStore.changeStoreData(this.getFormNmae(), key, data)
        this.subscribe({ [key]: data })
    }

    onChange = (value, item) => {
        switch (item.type) {
            case 'input':
                this.addStoreData(item.key, value.currentTarget.value)
                break;
            default:
                this.addStoreData(item.key, value)
                break;
        }
    }

    onHelpAnimEnd = () => {
        console.log('动画结束')
    }

    getTypeData = (item) => {
        const { typeData = {} } = this.getFormStore()
        return typeData[item.key] || item.typeData || []
    }

    onDestory = () => {
        if (this.destoryNum == 0) {
            this.destoryNum += 1;
            setTimeout(() => {
                console.log('输出延迟')
            }, 100)
        } else {
            this.destoryNum += 1;
        }
    }

    getNotDisplay = (item) => {
        const { notDisplay = [] } = this.props
        return notDisplay.indexOf(item.key) == -1
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
        if (!rule.type) {
            if (!data['required'].reg.test(value)) {
                return rule.msg || data['required'].msg
            } else {
                return ''
            }
        } else if (data[rule.type].reg && !data[rule.type].reg.test(value)) {
            return rule.msg || data[rule.type].msg
        } else if (data[rule.type].err) {
            return rule.msg || data[rule.type].msg
        } else {
            return ''
        }
    }

    getRules = (item) => {
        for (let i = 0; i < item.rules.length; i++) {
            const retData = this.getRule(item.rules[i], this.getValue(item), item)
            if (retData) {
                return retData
            }
        }
        return null
    }

    getFormNmae = () => {
        return this.props.modelName
    }

    addError = (item) => {
        const { error = {} } = this.getFormStore()
        if (error[item.key] !== this.errorObj[item.key]) {
            formStore.changeError(this.getFormNmae(), this.errorObj)
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
    }

    getFormStore = () => {
        return formStore.getFormStore(this.getFormNmae())
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
        const { disable = [] } = this.props
        return disable.indexOf(item.key) !== -1
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
                    // error={this.getRulesMessage(item)}
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
        const { colSize } = this.props
        return item.labelCol || colSize.labelCol || 8
    }

    getWrapperCol = (item) => {
        const { colSize } = this.props
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

    renderChildren = ({ item, index }) => {
        return (Component) => {
            const isNotDisplay = this.getNotDisplay(item)
            if (!isNotDisplay) return null
            const fun = [this.renderNormal, this.renderCols][Number(!!item.cols)]
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

    setCustomChildren(callBack) {
        this.customChildren = callBack;
    }

    getCustomChildren = ({ item }) => {
        if (this.customChildren) {
            const retData = this.customChildren(item)
            if (React.isValidElement(retData)) {
                return retData
            } else if (Array.isArray(retData)) {
                return this.getChildrenMap(retData)
            } else if (retData.type) {
                return this.getChildren({ item: retData })
            } else {
                return
            }
        } else {
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

    getRow = (children, gutter = 10) => {
        return (
            <Row gutter={gutter}>
                {children}
            </Row>
        )
    }
}
