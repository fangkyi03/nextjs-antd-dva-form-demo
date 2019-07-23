export default {
    namespace: 'form',
    state: {},
    reducers: {},
    effects: {
        * setFormValue({ payload }, { call, select, put }) {
            const {modelName,dataSource} = payload
            const state = yield select((state)=>state[modelName])
            console.log('输出state',state)
        }
    },
    subscriptions: {},
}
