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

// 获取路由参数
export const getRouterParams = function(thz) {
    return thz.props.routerParams
}

// 获取vw尺寸
export const getSize = function(size ) {
    return size  / 19.2 + 'vw'
}

// 控制弹出层modal是否显示
export const toggleModal = function(thz,modelName,isShow = true) {
    thz.props.dispatch({type:`${modelName}/setValue`,payload:{
        isShowModal:isShow,
        isEdit:false,
    }})
}

// 打开编辑模式
export const openEditModal = function( thz, modelName, isEdit = true) {
    thz.props.dispatch({type:`${modelName}/setValue`,payload:{
        isShowModal:true,
        isEdit,
    }})
}

// 清空对应表单model数据
export const clearForm = function(thz,modelName) {
    thz.props.dispatch({type:'form/clearForm',payload:{modelName}})
}

// 设置表单隐藏
export const setFormNotDisplay = function(thz,modelName,notDisplay,isShow = false) {
    thz.props.dispatch({ type:'form/setFormNotDisplay',payload:{
        modelName,
        notDisplay,
        isShow
    }})
}

// 设置表单数据
export const setFormValue = function(thz,modelName,data){
    thz.props.dispatch({type:'form/setFormValue',payload:{
        modelName,
        dataSource:data
    }})
}

// 返回表单数据
export const getFormValue = function(thz,modelName,key) {
    return thz.props.dispatch({
        type: 'form/getFormValue', payload: {
            modelName,
            key
        }
    })
}

// 提交表单
export const sumbitForm = function(thz,modelName,callBack) {
    thz.props.dispatch({ type: 'form/sumbitForm', payload: { modelName, callBack}})
}

// 重置表单
export const resetForm = function(thz,modelName) {
    thz.props.dispatch({ type: 'form/resetForm', payload: { modelName } })
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
    getFormValue
}