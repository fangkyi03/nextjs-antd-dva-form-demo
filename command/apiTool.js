// 发送接口请求
export const send = function send(thz, payload) {
    thz.props.dispatch({ type: 'fetch/send', payload })
}

// 对指定的model进行赋值
export const setValue = function setValue(thz,modelName,payload) {
    thz.props.dispatch({type:`${modelName}/setValue`,payload})
}

// 获取vw尺寸
export const getSize = function (size) {
    return size / 7.5 + 'vw'
}

// 清除model列表
export const clearList = function (thz, payload) {
    payload.forEach((e) => {
        thz.props.dispatch({ type: `${e}/clear` })
    })
}

// 清除单个model
export const clear = function (thz,modelName,) {
    thz.props.dispatch({ type: `${modelName}/celar` })
}

// 显示modal
export const showModal = function(thz,modelName) {
    thz.props.dispatch({ type: `${modelName}/setValue`, payload:{
        isShowModal:true
    }})
}

// 隐藏modal
export const hiddenModal = function(thz,modelName) {
    thz.props.dispatch({ type: `${modelName}/setValue`, payload:{
        isShowModal:false
    }})
}

// 获取路由参数
export const getRouterParams = function(thz) {
    return thz.props.routerParams
}

// 设置表单数据
export const setFormValue = function(thz,modelName,dataSource ) {
    thz.props.dispatch({ type: `form/setFormValue`, payload: { modelName,dataSource}})
}

// 设置表单组件显示隐藏
export const setFormNotDisplay = function (thz, modelName, notDisplay)  {
    thz.props.dispatch({ type: `form/setFormNotDisplay`, payload: { modelName, notDisplay } })
}

// 清空表单显示控制功能
export const clearNotDisplay = function (thz, modelName)  {
    thz.props.dispatch({ type: `form/clearNotDisplay`, payload: { modelName } })
}

// 切换控制表单组件是否显示
export const toggleFormNotDisplay = function (thz, modelName, notDisplay,isShow = false) {
    thz.props.dispatch({ type: 'form/toggleFormNotDisplay', payload: {modelName,notDisplay,isShow}})
}

// 手动设置错误表单内容
export const setFormError = function(thz,modelName,error) {
    thz.props.dispatch({ type: 'form/setFormError', payload: { error, modelName}})
}

// 切换显示页面modal
export const toggleModal = function(thz,modelName,isShow = true) {
    thz.props.dispatch({ type: `${modelName}/setValue`, payload: {isShowModal:isShow } })
}

// 设置表单禁用
export const setFormDisable = function(thz,modelName,disable) {
    thz.props.dispatch({ type: 'form/setFormDisable', payload: { disable, modelName } })
}

export default {
    send,
    setValue,
    clearList,
    getRouterParams,
    showModal,
    hiddenModal,
    clear,
    setFormValue,
    setFormNotDisplay,
    clearNotDisplay,
    toggleFormNotDisplay,
    setFormError,
    getSize,
    toggleModal,
    setFormDisable
}