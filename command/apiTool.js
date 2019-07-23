// 发送接口请求
export const send = function send(thz, payload) {
    thz.props.dispatch({ type: 'fetch/send', payload })
}

// 对指定的model进行赋值
export const setValue = function setValue(thz,modelName,payload) {
    thz.props.dispatch({type:`${modelName}/setValue`,payload})
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
    setFormNotDisplay
}