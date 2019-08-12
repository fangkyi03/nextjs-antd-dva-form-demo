import formStore from "../utils/formStore";

export default {
    namespace: 'form',
    state: {},
    reducers: {
        setValue(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        // 清空表单数据
        *clearForm({payload}) {
            const {modelName} = payload
            setTimeout(()=>{
                formStore.clearForm(modelName)
            })
        },
        // 隐藏表单不想显示组件
        *setFormNotDisplay({payload}) {
            const { modelName, notDisplay, isShow} = payload
            setTimeout(()=>{
                formStore.setFormNotDispaly(modelName, notDisplay, isShow)
            })
        },
        // 设置表单值
        *setFormValue({payload}) {
            const {modelName,dataSource} = payload
            setTimeout(()=>{
                formStore.changeDataSource(modelName,dataSource)
            })
        },
        // 提交表单
        *sumbitForm({payload}) {
            const { modelName, callBack} = payload
            setTimeout(()=>{
                formStore.sumbit(modelName, callBack)
            })
        },
        // 重置表单
        *resetForm({payload}) {
            const {modelName} = payload
            setTimeout(()=> {
                formStore.resetForm(modelName)
            })
        },
        // 返回表单数据
        * getFormValue({payload}){
            const {modelName,key} = payload
            if (key) {
                if (Array.isArray(key)) {
                    const obj = {}
                    const dataSource = formStore.getDataSource(modelName)
                    key.forEach((e)=>{
                        obj[e] = dataSource[e]
                    })
                    return obj
                }else {
                    return formStore.getDataSource(modelName)[key]
                }
            }else {
                return formStore.getDataSource(modelName)
            }
        }
    }
}