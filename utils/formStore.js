class FormStore {

    constructor() {
        this.store = {}
    }
    
    addStore(name,data) {
        this.store[name] = data
    }

    releaseStore (name){
        this.store[name] = {}
    }

    // 修改单条数据源数据
    changeStoreData (name,key,value){
        this.store[name]['dataSource'][key] = value
    }

    // 获取监听
    getSubscribe (name) {
        return this.store[name].subscribe
    }

    // 修改表单数据源
    changeDataSource (name,value) {
        this.store[name]['dataSource'] = value
        this.getSubscribe(name)(value)
    }

    getFormData (name) {
        return this.store[name]['dataSource']
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
}


export default new FormStore