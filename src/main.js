// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//路由的文件引入进来 router/index.js
import router from './router'

//项目运行的时候，是否要开启提示，如果是在调试阶段的话，建议开启，上线后关闭.
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //让路由生效
  router,
  template: '<App/>',
  components: { App }
})
