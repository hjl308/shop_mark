import {reqUserAddress,eqTradeOrder, reqTradeOrder} from '@/api'
export default{
    // 开启命名空间
    namespaced:true,
    state:{
        userAddress:[],
        tradeOrder:{}
    },
    actions:{
        // 获取用户地址信息
        async getUserAddress({commit}){
            let result = await reqUserAddress()
            if(result.code ==200){
                commit('GETUSERADDRESS',result.data)
            }
        },
        // 获取订单交易页信息
        async getTradeOrder({commit}){
            // 请求商品订单
            let result = await reqTradeOrder()
            // 成功，派发commit
            if(result.code ==200){
                commit('GETTRADEORDER',result.data)
                return 'ok'
            }else{
                // 失败，抛出错误
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations:{
        // 仓库存储用户地址信息
        GETUSERADDRESS(state,userAddress){
            state.userAddress = userAddress
        },
        // 仓库存储订单交易页信息
        GETTRADEORDER(state,tradeOrder){
            state.tradeOrder = tradeOrder
        }
    },
    getters:{
        // 获得订单商品列表
        tradeOrderList(state){
            return state.tradeOrder.detailArrayList || []
        }
    }
}