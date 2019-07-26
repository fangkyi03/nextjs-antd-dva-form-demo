class FormStore {

    constructor() {
        this.store = {}
    }
    
    addStore(name,data) {
        this.store[name] = data
        console.log("输出data",data)
    }

    releaseStore (name){
        this.store[name] = {}
    }

    changeStoreData (name,key,value){
        this.store[name]['dataSource'][key] = value
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