// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//路由的文件引入进来 router/index.js
import router from './router'
//引入element-ui
import ElementUI from 'element-ui'
//引入element-ui的样式表
import 'element-ui/lib/theme-chalk/index.css'

//引入全局的main.scss文件
import '@/styles/main.scss'

//引入store
import store from '@/store'

//项目运行的时候，是否要开启提示，如果是在调试阶段的话，建议开启，上线后关闭.
Vue.config.productionTip = true

//使用element-ui作为我们的前端框架
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //让路由生效
  router,
  //让状态管理生效
  store,
  template: '<App/>',
  components: { App }
})
