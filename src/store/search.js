import { reqSearchInfo } from '@/api'
export default {
    // 开启命名空间
    namespaced: true,
    state: {
        //仓库初始状态
        searchList: {},
    },
    actions: {
        async getSearchList({ commit }, params = {}) {
            let result = await reqSearchInfo(params)
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
    //处理state仓库的数据
    getters: {
        //简化、处理返回来searchList对象里面的属性
        goodsList(state) {
            // 要考虑到，假如没有网络
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}