//对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 1、利axios的方法create，去创建一个axios实例
const requests = axios.create({
    // 基础路径，发送请求的时候，路径当中会出现api
    baseURL:"/mock",
    // 代表请求超时的时间5s
    timeout:5000,
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始
    nprogress.start()
    return config
})

// 响应拦截器：服务器相应数据返回来以后，可以检测到
requests.interceptors.response.use((res)=>{
    //成功的回调
    // 进度条的结束
    nprogress.done()
    return res.data
},(err)=>{
    // 响应失败的回调
    return Promise.reject(new Error('fail'))
})
export default requests