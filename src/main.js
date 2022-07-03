import Vue from 'vue'
import App from './App.vue'
// 引入三级联动
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册全局组件，参数一：全局组件名 参数二：要注册的组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 引入路由器
import router from '@/router'
// 引入store仓库
import store from '@/store'
// 引入mockServer.js---mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 按需引入element-UI
import {MessageBox} from 'element-ui'
// 配置element-ui的消息盒子挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 统一引入api文件夹里面的所有请求接口
import * as API from '@/api'
// 引入懒加载默认图片（注意，图片、JSON默认对外暴露）
import loading from '@/assets/images/loading.gif'
// 引入路由懒加载插件(安装1.3.3版本，最新版本图片似乎不会显示)
import VueLazyload from 'vue-lazyload'
// 注册全局插件
Vue.use(VueLazyload,{
  // 默认加载图片
  loading: loading
})

// 引入表单校验插件
import '@/plugins/validate'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由器,以下写法KV一致，省略V
  //注册路由信息：组件身上会拥有$route,$router属性
  router,
  // 注册store仓库：组件身上会多了$store属性
  store,

  beforeCreate(){
      // 配置全局事件总线
    Vue.prototype.$bus = this
    // 配置全局请求接口在API
    Vue.prototype.$API = API

  }


}).$mount('#app')
