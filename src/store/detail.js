import {reqGoodsInfo, reqAddOrUpdateShopChart} from '@/api/index'
// 封装游客身份模块uuid--->生成的一个随机字符串（不能再改变）
import {getUUID} from '@/utils/uuid_token'
export default {
    // 模块化一般，开启命名空间
    namespaced: true,
    state:{
        goodsInfo:{},
        uuid_token:getUUID(),
    },
    actions:{
        // 获取产品信息
        async getGoodsInfo({commit},skuId){
            let result = await reqGoodsInfo(skuId)
            if (result.code == 200) {
                commit('GETGOODSINFO',result.data)
            } 
        },
        // 将产品添加到购物车中
        async addOrUpdateShopCart({commit},{skuId,skuNum}){
            // 加入购物车,前台将参数发送给服务器，
            // 服务器并没返回data，只是code=200，表示操作成功
            let result = await reqAddOrUpdateShopChart(skuId,skuNum)
            // 加入购物车成功
            if(result.code == 200){
                // 返回成功
                return "ok"
            }else{
                // 返回失败
                    return Promise.reject(new Error('failure'))
                }
      
        }
    },
    mutations:{
        GETGOODSINFO(state,goodsInfo){
            state.goodsInfo = goodsInfo
        }
    },
    //简化数据
    getters:{
        // 路径导航简化数据
        categoryView(state){
            // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
            // 当前计算出来的categoryView属性值，至少是一个对象，不然会报错
            return state.goodsInfo.categoryView || {}
        },
        // 产品信息简化数据
        skuInfo(state){
            return state.goodsInfo.skuInfo || {}
        }
    }
}