import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)
// 引入其他小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// state:仓库存储数据的地方
// actions:处理action，可以书写自己的业务逻辑，可以处理异步
// mutations:修改state的唯一对象
// getters:理解为计算属性，可以进一步加工state数据

// 对外暴露store的一个实例
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})