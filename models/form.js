export default {
    namespace: 'form',
    state: {},
    reducers: {},
    effects: {
        // 设置表单数据
        * setFormValue({ payload }, { call, select, put }) {
            const {modelName,dataSource} = payload
            const state = yield select((state)=>state[modelName])  
            yield put({ type: `${modelName}/setValue`, payload: { dataSource: { ...state.dataSource, ...dataSource}}})
        },
        // 手动设置表单错误
        *setFormError({payload},{put}) {
            const { modelName, error } = payload
            yield put({type:`${modelName}/setValue`,payload:{error}})
        },
        // 设置表单禁用
        *setFormDisable({payload},{put,select}){
            const { modelName, disable } = payload
            if (Array.isArray(disable) && disable.length > 0) {
                yield put({ type: `${modelName}/setValue`, payload: { disable} })
            }
        },
        // 控制切换是否显示
        * toggleFormNotDisplay({ payload }, { select,put}) {
            const { modelName, notDisplay,isShow } = payload
            const state = yield select((state) => state[modelName])
            const dataSource = state.dataSource || {}
            const oldNotDisplay = state.notDisplay || []
            let newNotDisplay = oldNotDisplay    
            if (Array.isArray(notDisplay) && notDisplay.length > 0) {
                if (isShow) {
                    const tempOldNotDisplay = new Set(oldNotDisplay)
                    notDisplay.forEach((e)=>{
                        tempOldNotDisplay.delete(e)
                    })
                    newNotDisplay = Array.from(tempOldNotDisplay)
                }else {
                    notDisplay.forEach((e) => {
                        delete dataSource[e]
                    })
                    newNotDisplay = Array.from(new Set(newNotDisplay.concat(notDisplay)))
                }
            }
            yield put({ type: `${modelName}/setValue`, payload: { notDisplay: newNotDisplay, dataSource } })
        },
    },
    subscriptions: {},
}
