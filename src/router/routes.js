/* 
路由懒加载：
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
// 路由的配置信息
export default [
    // 主页
    {
        path:'/home',//路径一般都字母小写
        component:()=>import('@/pages/Home'),//路由懒加载
        meta:{show:true}
    },
    // search
    {
        // 对params参数，keyword进行占位
        path:'/search/:keyword?',//占位符后面加问号，表示params参数可传，可不传
        name:'search',//因为要params传参
        component:()=>import('@/pages/Search'),//路由懒加载
        meta:{show:true}
        
    },
    // 登录
    {
        path:'/login',
        component:()=>import('@/pages/Login'),//路由懒加载
        meta:{show:false}
    },
    // 注册
    {
        path:'/register',
        component:()=>import('@/pages/Register'),//路由懒加载
        meta:{show:false}
    },
    //详情
    {
        // 对params参数，skuId（商品编号）进行占位
        path:'/detail/:skuId',
        name:'detail',//因为要params传参
        component:()=>import('@/pages/Detail'),//路由懒加载
        meta:{show:true}
    },
    // 加入购物车成功页面
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),//路由懒加载
        meta:{show:true}
    },
    // 购物车页面
    {
        path:'/shopcart',
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),//路由懒加载
        meta:{show:true}
    },
    // 交易页面
    {
        path:'/trade',
        name:'trade',
        component:()=>import('@/pages/Trade'),//路由懒加载
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 进入交易页面，必须从shopcart购物车而来，其他路径无效
            if(from.path=='/shopcart'){
                next()
            }else{
                // 从其他路径而来，只能停留在来的当前页面
                // false的含义相当于from.path，中断当前导航，回到来之前的路由地址
                next(false)
            }
        }
    },
    // 支付页面
    {
        path:'/pay',
        name:'pay',
        component:()=>import('@/pages/Pay'),//路由懒加载
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 进入pay页面，必须从trade购物车而来，其他路径无效
            if(from.path=='/trade'){
                next()
            }else{
                // 从其他路径而来，只能停留在来的当前页面
                // false的含义相当于from.path，中断当前导航，回到来之前的路由地址
                next(false)
            }
        }

    },
    // 支付成功页面
    {
        path:'/paysuccess',
        name:'paysuccess',
        component:()=>import('@/pages/PaySuccess'),//路由懒加载
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 进入paysuccess页面，必须从pay购物车而来，其他路径无效
            if(from.path=='/pay'){
                next()
            }else{
                // 从其他路径而来，只能停留在来的当前页面
                // false的含义相当于from.path，中断当前导航，回到来之前的路由地址
                next(false)
            }
        }
    },
    // 订单详情中心
    {
        path:'/center',
        name:'center',
        component:()=>import('@/pages/Center'),//路由懒加载
        meta:{show:true},
        children:[
            {
                path:'myorder',//子路由不用加'/'
                component:()=>import('@/pages/Center/MyOrder'),//二级路由，路由懒加载
            },
            {
                path:'grouporder',//子路由不用加'/'
                component:()=>import('@/pages/Center/GroupOrder'),//二级路由，路由懒加载
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }

        ],
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向的首页
    {
        path:'*',
        redirect:'/home'
    }

]