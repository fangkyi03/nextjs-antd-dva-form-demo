class FormStore {

    constructor() {
        this.store = {}
    }
    
    addStore(name,data) {
        if (this.isCreate(name)) {
            const newStore = data(this.store[name])
            Object.keys(newStore).forEach((e)=>{
                if (Array.isArray(newStore[e])) {
                    this.store[name][e] = newStore[e].concat(this.store[name][e])
                }else if (typeof newStore[e] == 'object') {
                    this.store[name][e] = { ...this.store[name][e],...newStore[e]}
                }
            })
        }else {
            this.store[name] = data(this.store[name])
        }
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
            const subscribe = this.getSubscribe(name)
            if (Array.isArray(subscribe)) {
                subscribe.forEach((e)=>{
                    e(value)
                })
            }else {
                subscribe(value)
            }
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

    // 获取表单结构
    getForm (name) {
        if (this.isCreate(name)) {
            return this.store[name]['formData'] || []
        }else {
            return []
        }
    }

    // 替换表单结构
    replaceForm (name,formData) {
        if (this.isCreate(name)) {
            this.store[name]['formData'] = {...this.store[name]['formData'],...formData}
        }
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
            if (Array.isArray(event)) {
                event.forEach((e)=>{
                    e(notDisplay, isShow)
                })
            }else {
                event(notDisplay, isShow)
            }
        }
    }

    // 提交表单
    sumbit(name, callBack) {
        const store = this.getFormStore(name)
        const dataSource = this.getDataSource(name)
        const error = {}
        let isHaveErr = false
        let errorIndex = 0
        Object.keys(store.formData).forEach((e)=>{
            let errorText = ''
            if (Array.isArray(store.getRules)) {
                store.getRules.forEach((el,i)=>{
                    errorText = el(store.formData[e])
                    if (errorText) {
                        errorIndex = i
                        if (!isHaveErr) {
                            isHaveErr = true
                        }
                        error[e] = errorText
                    }
                })
            }else {
                errorText = store.getRules(store.formData[e])
                if (errorText) {
                    if (!isHaveErr) {
                        isHaveErr = true
                    }
                    error[e] = errorText
                }
            }
        })
        if (isHaveErr) {
            if (Array.isArray(store.setFormError)) {
                store.setFormError[errorIndex](error)
            } else {
                store.setFormError(error)
            }
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

    // 获取禁用事件
    getDisableEvent (name) {
        return this.getFormStore(name)['setFormDisable']
    }

    // 禁用表单中的组件
    disableForm (name,disable = [],isDisable = true) {
        if (this.isCreate(name)) {
            const disableEvent = this.getDisableEvent(name)
            if (disable.length == 0) {
                const formData = this.getFormData(name)
                const disableArr = Object.keys(formData)
                if (Array.isArray(disableEvent)) {
                    disableEvent.forEach((e)=>{
                        e(disableArr, isDisable)
                    })
                }else {
                    this.getDisableEvent(name)(disableArr, isDisable)
                }
            } else {
                if (Array.isArray(disableEvent)) {
                    disableEvent.forEach((e) => {
                        e(disableArr, isDisable)
                    })
                } else {
                    this.getDisableEvent(name)(disableArr, isDisable)
                }
            }
        }
    }
}


export default new FormStore