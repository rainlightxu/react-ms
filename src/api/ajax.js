import axios from 'axios'
import qs from 'qs' 
import {message} from 'antd'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { method, data } = config
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // return response;
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    message.error("请求出错 " + error.message);
    // return Promise.reject(error);
    return new Promise(() => { }); //中断Promise链
});



export default axios