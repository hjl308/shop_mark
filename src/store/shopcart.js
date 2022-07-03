import {reqCartList,reqDeleteCartById,reqChangeChecked} from '@/api'
export default{
    // 开启命名空间
    namespaced: true,
    state:{
        cartList:[],
    },
    actions:{
        // 获取购物车列表数据
        async getCartList({commit}){
            let result = await reqCartList()
            if(result.code == 200){
                commit('GETCARTLIST',result.data)
            }
        },
        // 删除购物车列表的某个商品数据
        async deleteCartListBySkuId({commit},skuId){
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 切换商品的选中状态
        async changeChecked({commit},{skuId,isChecked}){
            let result = await reqChangeChecked(skuId,isChecked)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }

        },
        // 删除全部选中的商品
        deleteAllCheckedCart({dispatch,getters}){
            // context相当于小仓库：commit,dispatch,state,getters
            let PromiseAll = []
            // 遍历购物车中的全部产品，是一个数组
            getters.cartList.cartInfoList.forEach(item => {
                // 遍历商品数组，isChecked勾选，就删除该商品，返回一个promise，否则啥操作不执行
                let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
                // 将每次返回的promise添加到数组当中
                PromiseAll.push(promise)        
            })
            // 如果有一个promise失败，即为失败（目的，判断是否都为成功promise，都被成功删除）
            return Promise.all(PromiseAll)
        },
        // 全部勾选或者全不选中
        allOrNotChecked({state,dispatch},flag){
        let PromiseAll = []
        // 遍历所有商品，设置勾选状态（全选、全不选）
         state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch('changeChecked',{skuId:item.skuId,isChecked:flag})
            PromiseAll.push(promise)
        })
        // 判断服务器是否更改成功。一个失败，就全失败
        return Promise.all(PromiseAll)
   
        }
    },
    mutations:{
        GETCARTLIST(state,cartList){
            state.cartList= cartList
        }
    },
    getters:{
        cartList(state){
            // 返回含有商品信息数组的哪一个数组对象
            return state.cartList[0] || {}
        },
    }
}