class FormStore {

    constructor() {
        this.store = {}
    }
    
    addStore(name,data) {
        this.store[name] = data(this.store[name])
    }

    releaseStore (name){
        this.store[name] = {}
    }

    // 修改单条数据源数据
    changeStoreData (name,key,value){
        if (this.isCreate(name)) {
            this.store[name]['dataSource'][key] = value
        }
    }

    // 获取监听
    getSubscribe (name) {
        return this.store[name].subscribe
    }

    // 获取表单数据源
    getDataSource (name) {
        return this.store[name]['dataSource']
    }

    // 修改表单数据源
    changeDataSource (name,value) {
        if (this.isCreate(name)) {
            const newValue = { ...this.getDataSource(name), ...value }
            this.store[name]['dataSource'] = newValue
            this.getSubscribe(name)(value)
        }
    }

    getFormData (name) {
        return this.store[name] ? this.store[name]['dataSource'] : {}
    }

    getFormStore (name) {
        return this.store[name]
    }

    changeError (name,error) {
        this.store[name]['error'] = error
    }

    getFormItem (name,key) {
        return this.store[name]['formData'][key]
    }

    // 判断是否创建成功
    isCreate = (name) => {
        return this.store[name]
    }

    // 清空form 
    clearForm(name) {
        const obj = {}
        if (this.isCreate(name)) {
            const form = this.getFormData(name)
            Object.keys(form).forEach((e) => {
                obj[e] = ''
            })
            this.changeDataSource(name, obj)
        }
    }

    // 获取修改表单显示事件
    getFormNotDisplayFun (name) {
        return this.store[name].setNotDisplay
    }

    // 控制表单组件是否显示
    setFormNotDispaly (name,notDisplay,isShow) {
        if (this.isCreate(name)) {
            const event = this.getFormNotDisplayFun(name)
            const store = this.getFormStore(name)
            const newDisplay = new Set(store.notDisplay.concat(notDisplay))
            store.notDisplay = Array.from(newDisplay)
            event(notDisplay, isShow)
        }
    }

    // 提交表单
    sumbit(name, callBack) {
        const store = this.getFormStore(name)
        const dataSource = this.getDataSource(name)
        const error = {}
        let isHaveErr = false
        Object.keys(store.formData).forEach((e)=>{
            const errorText = store.getRules(store.formData[e])
            if (errorText) {
                if (!isHaveErr) {
                    isHaveErr = true
                }
                error[e] = errorText
            }
        })
        store.setFormError(error)
        if (isHaveErr) {
            callBack({ error: isHaveErr ? error : null, dataSource})
        }else {
            callBack({ error: null, dataSource})
        }
    }

    resetForm (name) {
        const dataSource = this.getDataSource(name)
        const newDataSource = {}
        Object.keys(dataSource).forEach((e)=>{
            newDataSource[e] = ''
        })
        this.changeDataSource(name,newDataSource)
    }
}


export default new FormStore