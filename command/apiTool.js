import Router from 'next/router'

// 发送接口请求
export const send = function send(thz, payload) {
    thz.props.dispatch({ type: 'fetch/send', payload })
}

// 获取model数据
export const getValue = function getValue(thz,modelName) {
    return thz.props.dispatch({type:`${modelName}/getValue`,payload:{modelName}})
}

// 对指定的model进行赋值
export const setValue = function setValue(thz, modelName, payload) {
    thz.props.dispatch({ type: `${modelName}/setValue`, payload })
}

// 清除model列表
export const clearList = function (thz, payload) {
    payload.forEach((e) => {
        thz.props.dispatch({ type: `${e}/clear` })
    })
}

// 获取路由参数
export const getRouterParams = function (thz) {
    return thz.props.routerParams
}

// 获取vw尺寸
export const getSize = function (size) {
    return size / 19.2 + 'vw'
}

// 路由跳转
export const jumpRouter = function (router, routerParams) {
    Router.push('/' + router)
}

// 控制弹出层modal是否显示
export const toggleModal = function (thz, modelName, isShow = true) {
    thz.props.dispatch({
        type: `${modelName}/setValue`, payload: {
            isShowModal: isShow,
            isEdit: false,
        }
    })
}

// 打开编辑模式
export const openEditModal = function (thz, modelName, isEdit = true) {
    thz.props.dispatch({
        type: `${modelName}/setValue`, payload: {
            isShowModal: true,
            isEdit,
        }
    })
}

// 清空对应表单model数据
export const clearForm = function (thz, modelName) {
    thz.props.dispatch({ type: 'form/clearForm', payload: { modelName } })
}

// 设置表单隐藏
export const setFormNotDisplay = function (thz, modelName, notDisplay, isShow = false) {
    thz.props.dispatch({
        type: 'form/setFormNotDisplay', payload: {
            modelName,
            notDisplay,
            isShow
        }
    })
}

// 设置表单数据
export const setFormValue = function (thz, modelName, data) {
    thz.props.dispatch({
        type: 'form/setFormValue', payload: {
            modelName,
            dataSource: data
        }
    })
}

// 返回表单数据
export const getFormValue = function (thz, modelName, key) {
    return thz.props.dispatch({
        type: 'form/getFormValue', payload: {
            modelName,
            key
        }
    })
}

// 提交表单
export const sumbitForm = function (thz, modelName, callBack) {
    thz.props.dispatch({ type: 'form/sumbitForm', payload: { modelName, callBack } })
}

// 重置表单
export const resetForm = function (thz, modelName) {
    thz.props.dispatch({ type: 'form/resetForm', payload: { modelName } })
}

// 获取路由参数
export const getRouter = function (thz) {
    return thz.props.router
}

/**
* 自动转换分页接口数据
*/
const createListData = function createListData(inData = { records: [] }, data = { records: [] }) {
    return { data: { ...inData, ...data, records: inData.records.concat(((data.records ? data : { records: [] })).records) } }
}

/**
* 自动构建分页列表接口
*/
const createListPage = function createListPage(params = {}, current = 1, size = 10) {
    return {
        current, size, condition: params
    }
}

// 判断当前环境 测试环境 本地开发环境 线上环境
export const isDev = function () {
    const hostname = window.location.hostname
    const isIp = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(hostname)
    if (isIp) {
        return hostname
    } else {
        return hostname.split('.').length == 3 ? window.location.hostname.split('.').slice(1).join('.') : hostname
    }
}

// 获取图片信息
export const getImageData = function(data) {
    const uid = Math.random() * 1000
    const name = data.split('/').slice(-1)[0]
    return {
        uid,
        name,
        url:data
    }
}

// 创建图片的结构
export const createImageStructure = function(data) {
    return {
        uid: data.uid,
        name: data.name,
        thumbUrl: data.url,
        response: {
            uid: data.uid,
            name: data.name,
            status: "done",
            thumbUrl: data.url,
            url: data.url,
        }
    }
}

// 禁用表单所有组件
export const disableForm = function (thz, modelName, disable = [], isDisable = true) {
    thz.props.dispatch({ type: 'form/disableForm', payload: { modelName, disable, isDisable}})
}

// 创建表单图片格式
export const createImage = function (img) {
    const imgSplit = img.split(',')
    if (imgSplit.length > 1) {
        return imgSplit.map((e)=>{
            return createImageStructure(getImageData(e))
        })
    }else {
        return [
            createImageStructure(getImageData(img))
        ]
    }
}

export default {
    send,
    setValue,
    clearList,
    getRouterParams,
    getSize,
    toggleModal,
    openEditModal,
    clearForm,
    setFormNotDisplay,
    setFormValue,
    sumbitForm,
    resetForm,
    getFormValue,
    jumpRouter,
    isDev,
    getRouter,
    createListData,
    createListPage,
    createImage,
    disableForm,
    getValue
}