//来封装axios请求
import axios from 'axios'
//消息提示的组件
import { Message } from 'element-ui'
//vuex状态管理
import store from '@/store'

//全局发送post请求的默认头部content-type类型,定义类型为JSON格式，并且字符编码为utf-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//1.首先创建一个axios的实例，进行请求的一些全局配置
const service = axios.create()
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
//respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if(error.response){
      switch(error.response.status){
        case 401:
          store.dispatch('UserLogout'); //可能是token过期，清除它
          router.replace({ //跳转到登录页面
            path: 'login'
          });
      }
    }
    return Promise.reject(error.response);
  }
);
export default service
