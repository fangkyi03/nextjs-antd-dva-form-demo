# 高性能表单框架

1.整体场景演示的demo 主要对标uform的所有demo 后续uform其他的demo 将会在之后逐步添加

# 新增功能
```javascript
1.新增 场景 - 常用场景
2.新增 性能演示 - 1000个编辑框
3.新增 性能演示 - 2000个编辑框
4.新增 性能演示 - 8000个编辑框
```

# 项目结构介绍
```
总体分为三个
1.formStore
(用于处理整个系统的所有表单所有行为 包括错误处理 赋值等) 需要手动销毁数据 等于redux的store
2.FormContainer 
整个项目所有的表单容器类
3.formModel
整个系统所有表单的外层控制器 内部调用formStore中的函数
主要用于从外层发起action修改formStore
相比直接每个页面引入一次formStore会来的更加干净
```

# api介绍

```javascript
// 获取当前页面路由参数
getRouterParams
使用:
getRouterParams(this) : object
```

```javascript
// vw 转换函数
getSize
使用:
getSize():string
```

```javascript
// 控制弹出窗口显示
toggleModal
使用:
toggleModal(this,modelName,isShow) : void
```

```javascript
// 强制打开页面并且设置当前modal为编辑模式
openEditModal
使用:
openEditModal(this,modelName,isEdit) : void
```

```javascript
// 清空指定表单数据 因表单数据绑定在store中 默认不会删除数据 主要你主动删除
clearForm
使用:
clearForm(this,modelName) : void
```

```javascript
// 控制表单中子项是否显示 这个控制的是一行row的整体显示 
// 一行中单个组件的显示控制 将会有另外一个函数 敬请期待
setFormNotDisplay
使用:
setFormNotDisplay(this,modelName,notDisplay = []) : void
```

```javascript
// 修改指定表单的数据源
setFormValue
使用:
setFormValue(this,modelName,data : object) : void
```
```javascript
// 返回指定表单数据
// 隐居对应传入的值返回对应的结构
getFormValue
使用:
getFormValue(this,modelName,key : array | string | undefined) : promise
```

```javascript
// 表单效验提交 如果错误
sumbitForm
使用:
sumbitForm(this,modelName,callBack:({error:object | null,data:object | null})) : void
```

```javascript
// 重置表单内容 这里只重置数据源里面有数据的表单组件 其余一改不参与
// 比如你有1W个组件 你刚才只改了一个组件 那么你点击重置的时候 只会重置这一个组件
resetForm
使用:
resetForm(this,modelName):void
```

# 备注说明
因项目使用的是next的关系 部分页面打开会出现样式丢失的情况 这个只需要重新刷新一下即可

# 未来工作
- [] 完成imgCook的vscode插件编写 实现私有化部署 已立项完成了部分功能
- [] 实现用babel将web转换为taro代码 主要面向公众号网页
