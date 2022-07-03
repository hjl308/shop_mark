import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

/* 重写push|replace
现象：编程式路由多次跳转到同一个页面，出现NavigationDuplicated的警告错误
原因：路由的push会向历史记录栈中，添加一个记录，同时跳转同一个路由页面，会造成重复添加，页面报错
第一个参数：告诉push，往哪里跳转 
*/
/* call||apply区别
相同点：都可以调用已有函数，篡改上下文一次（指明新对象来继承已有函数的方法）
不同点：call与apply传递参数不同，call用逗号隔开，apply使用数组 */
VueRouter.prototype.push = function(location,resolve,reject){
    if (resolve&&reject) {
       originPush.call(this,location,resolve,reject)
        
    } else {
        originPush.call(this,location,() => {},() => {})
        
    }
}
  
  VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
      originReplace.call(this, location, resolve, reject);
    } else {
      originReplace.call(this, location, () => {
      }, () => {
      })
    }
  }

/* VueRouter.prototype.push = function(location){
    // 调用原来的push，并捕获异常
    return originPush.call(this,location).catch(err=>err)
}
VueRouter.prototype.replace = function(location){
    return originReplace.call(this,location).catch(err=>err)
} */


// 配置路由
let router =  new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部
      return { y: 0 }
    },
})
// 全局前置路由，每次路由切换之前调用
router.beforeEach(async(to,from,next)=>{
  // next(path)：放行到指定路由    next(flase)：路由改变，则回到from
  let token = store.state.user.token
  let name = store.state.user.userInfo.loginName
  // 如果用户登录了
  if(token){
    // 登录了，想要去login页面（阻止，跳转到根目录home页面）
    if(to.path == '/login' || to.path == 'register'){
      next('/')
    }else{
      // 登陆了，去的不是login和register
      // 如果有用户名(说明token没过期，可以从后台得到用户信息展示)
      if(name){
        // 放行
        next()
      }else{
        // 没有用户名【刷新之后】，派发action让仓库获取用户信息之后，再进行路由跳转
        try{
          // 在路由跳转之前，获取用户信息成功
          await store.dispatch('user/userInfo')
          // 放行
          next()
        }catch(error){
          // 信息获取失败，说明身份token过期了，用户需要重新登录
          // 清除token
         await store.dispatch('user/userLogout')
         next('/login')
        }
      } 
    }
  }else{
    let toPath = to.path
    //未登录,不能取交易相关、支付相关的页面，不能取个人中心
    if(toPath.indexOf('/pay')!==-1||toPath.indexOf('/center') !==-1||toPath.indexOf('/trade')!==-1){
      // 把未登录的时候想去而没有去成的消息，存储于地址栏的query参数中
      next('/login?redirect='+toPath)
    }else{
      // 去的不是以上页面，直接放行
      next()
    }
    
  }
})
export default router