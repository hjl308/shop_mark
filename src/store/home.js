import {reqCategoryList,reqBannerList,reqFloorList} from '@/api/index'
export default{
    // 开启命名空间
    namespaced:true,
    state:{
        // 因为服务器返回的data值为数组，根据接口返回的data类型，初始化
        categoryList:[],
        bannerList:[],
        floorList:[],
    },
    actions:{
        // 获取Home页三级联动数据
       async getCategoryList({commit}){
           let result = await reqCategoryList()
           if (result.code == 200) {
               commit('GETCATEGORYLIST',result.data)
           }
        },
        // 获取Home页轮listContainer播图的数据
        async getBannerList({commit}){
            let result = await reqBannerList()
            if (result.code == 200) {
                commit('GETBANNERLIST',result.data)
            }
         },
        //  获取Home主页floor轮播图的数据
        async getFloorList({commit}){
            let result = await reqFloorList()
            if (result.code == 200) {
                commit('GETFLOORLIST',result.data)
            }
         },
    },
    // mutations唯一可以修改state的地方
    mutations:{
        GETCATEGORYLIST(state,categoryList){
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        GETFLOORLIST(state,floorList){
            state.floorList =floorList
        },
    },
    // 加工state的地方，不会影响原仓库的state值。可以理解为：计算属性
    getters:{

    }
}