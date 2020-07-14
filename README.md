
## 按需打包antd组件
react-app-rewired customize-cra babel-plugin-import
## 更改antd ui样式 
见config-overrides.js
## HashRouter 和BrowerRouter的区别
带不带#号
## reset.css github开源项目
## react 中的严格模式: StrictMode 
在index.js中挂载 App 的外面有这样一个标签<React.StrictMode>
只要把这个标签删除掉就可以了

## 前台分页和后台分页
商品分类---前台分页
商品列表---后台分页

## 将普通组件通过withRouter转换为路由组件是为了继承以下三个数据
history
location
match

## 路由传参
this.props.history.push("",state)
this.props.location.state

## redux
是一个专门做状态管理的js库
不是react插件

## react-redux 插件 Provider
components containers 
## redux异步编程插件
redux-thunk applyMiddleware(thunk)
