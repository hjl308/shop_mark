// 统一管理项目接口模块
// 引入二次封装的axios（带有请求、响应的拦截器）
import requests from './request'
import mockRequets from './mcokAjax'
// 获取三级联动商品列表，的接口
export const reqCategoryList = () => requests({
  // 发送请求，axios发送请求返回的是Promise对象
  url: '/product/getBaseCategoryList',
  method: 'get',
})
// Home首页轮播图的接口，获取banner
export const reqBannerList = () => mockRequets.get('/banners')

// 获取floor轮播图的接口
export const reqFloorList = () => mockRequets.get('/floors')

// 获取搜索模块数据 地址:/api/list 请求方式:post 参数:需要带参数
// 当前这个接口，给服务传递参数params，至少是一个空对象
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口  URL：/api/item/{skuId} 请求方式:GET
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车当中（获取更新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopChart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post'})

// 获取购物车列表
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 获取验证码
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户
// 要传入phone，password，code三个参数，我们用一个data对象来包括
export const reqUserRegister = (data)=> requests({url:'/user/passport/register',method:'post',data})

// 用户登录,参数需要phone，password
export const reqUserLogin = (data)=> requests({url:'/user/passport/login',method:'post',data})

// 获取用户信息
export const reqUserInfo = ()=> requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'})

// 删除购物车商品
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品选中状态
export const reqChangeChecked = (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取收件人地址信息
export const reqUserAddress = ()=> requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息
export const reqTradeOrder = ()=> requests({url:'/order/auth/trade',method:'get'})

// 提交订单
// 要传入data对象，包括traderNo、consignee、consigneeTel、deliveryAddress、paymentWay、orderComment、orderDetailList信息。
export const reqSubmitOrder = (tradeNo,data)=> requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

// 获取订单支付信息
export const reqPaymentInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付状态
export const reqPayStatus=(orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取订单列表
export const reqOrderList=(page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})