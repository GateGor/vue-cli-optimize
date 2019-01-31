import axios from 'axios'

//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,//api的base_url
    timeout: 10000 //请求超时时间
})

//request 拦截器
service.interceptors.request.use(
    config => {
        //这里可以自定义一些config配置
        return config
    },
    error => {
        //这里处理一些请求出错的情况
        console.log(error);
        Promise.reject(error)
    }
)

//response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        //这里处理一些response正常放回时的逻辑
        return res
    },
    error =>{
        //这里处理一些response出错时的逻辑
        return Promise.reject(error)
    }
)

export default service