export default {
    namespace: 'form',
    state: {},
    reducers: {},
    effects: {
        // 设置表单数据
        * setFormValue({ payload }, { call, select, put }) {
            const {modelName,dataSource} = payload
            const state = yield select((state)=>state[modelName])
            console.log('输出state',state)
        },
        // 控制切换是否显示
        * toggleFormNotDisplay({ payload }, { select,put}){
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
            console.log('输出数据', newNotDisplay, isShow,notDisplay,dataSource)
            yield put({ type: `${modelName}/setValue`, payload: { notDisplay: newNotDisplay, dataSource } })
        },
    },
    subscriptions: {},
}
