//来封装axios请求
import axios from 'axios'
//消息提示的组件
import { Message } from 'element-ui'
//vuex状态管理
import store from '@/store'

//全局发送post请求的默认头部content-type类型,定义类型为JSON格式，并且字符编码为utf-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//1.首先创建一个axios的实例，进行请求的一些全局配置
const service = axios.create({
  //请求的过期时间
  timeout:5000
})
//请求发送之前的一个拦截器
service.interceptors.request.use(
  config => {
    if(store.state.token){
      config.headers['X-Token'] = store.state.token //访问全局变量下的token值
    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  }
)
//请求发送后数据返回的时候的拦截器
service.interceptors.response.use(
  response=>response,
  error => {
    console.log('err' + error)
    Message({
      message:error.message,
      type:'error',
      duration:5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
