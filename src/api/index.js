import ajax from './ajax.js'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = ""

// 登录  （最简写法）
export const reqLogin = (username, password) => ajax.post(BASE + "/login", { username, password })
//（高级写法）
// export const reqLogin = (username, password) => (
//     ajax({
//         url: BASE + "/login",
//         method: "POST",
//         data: {
//             username,
//             password
//         }
//     })
// )

//最基本写法
// export function reqLogin(username, password) {
//     ajax({
//         url: BASE + "/login",
//         method: "POST",
//         data: {
//             username,
//             password
//         }
//         // data:qs.stringify({username,password}) 在ajax.js中进行请求拦截处理post请求
//     })
// }

// const user = "admin"
// const pass = "admin"
// reqLogin(user, pass);

/* 发送jsonp请求聚合数据接口得到天气信息？？？还报跨域？？？ */
// export const reqWeather = (city) => {
//     return new Promise((resolve, reject) => {
//         const url = `http://apis.juhe.cn/simpleWeather/query?city=${city}&key=536149b34b5797d85c806a54635a4822`
//         jsonp(url, {}, (error, data) => {
//             if (!error && data.reason === "查询成功!") {
//                 const { info } = data.result.realtime.info
//                 resolve({ info })
//             }
//         })
//     })
// }
//发送jsonp请求百度地图api得到天气信息
export const reqWeather = (city) => {
    // 执行器函数: 内部去执行异步任务, 
    // 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.error === 0) { // 成功的
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else { // 失败的
                  message.error('获取天气信息失败')
            }
        })
    })
}

// 获取分类列表
export const reqCategorys = () => ajax.get("/manage/category/list")

//添加分类
export const reqAddCategory = (categoryName) => ajax.post("/manage/category/add",{categoryName})

//编辑分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post("manage/category/update",{categoryId,categoryName})

//商品列表
export const reqProducts = (pageNum,pageSize) => ajax("/manage/product/list",{params:{pageNum,pageSize}})

//根据商品名称或者商品描述搜索商品列表
export const reqProductsByNameOrDesc = ({pageNum,pageSize,searchType,searchText}) => ajax.get("/manage/product/search",{params:{pageNum,pageSize,[searchType]:searchText}})

//更改商品状态，上架or下架
export const reqUpdateStatus = (productId,status) => ajax.post("/manage/product/updateStatus",{productId,status})

//根据商品id获取商品详情信息
export const reqProductDetailById = (productId) => ajax.get("/manage/product/info?productId=" + productId)

//根据分类id获取分类信息
export const reqCategoryById = (categoryId) => ajax.get("/manage/category/info",{params:{categoryId}})

//添加商品
export const reqAddProduct = (product) => ajax.post("/manage/product/add",product)

//更新商品
export const reqUpdateProduct = (product) => ajax.post("/manage/product/update",product)

//删除图片
export const reqDeleteImg = (name) => ajax.post("/manage/img/delete",{name})

//获取角色列表
export const reqRoles = () => ajax.get("/manage/role/list")

//添加角色
export const reqAddRole = (roleName) => ajax.post("/manage/role/add",{roleName})

//给角色分配权限
export const reqUpdateRole = (role) => ajax.post("/manage/role/update",role)

//获取用户列表
export const reqUsers = () => ajax.get("/manage/user/list")

//添加用户
export const reqAddUser = (user) => ajax.post("/manage/user/add",user)

//更新用户
export const reqUpdateUser = (user) => ajax.post("/manage/user/update",user)

//删除用户
export const reqDeleteUser = (userId) => ajax.post("/manage/user/delete",{userId})