import {reqGetCode,reqUserRegister,reqUserLogin, reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
// 登录与注册的模块
export default{
    // 开启命名空间
    namespaced:true,
    state:{
        code:'',
        token:getToken(),
        userInfo:{},
    },
    actions:{
        // 获取验证码
       async getCode({commit},phone){
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                commit('GETCODE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
       async userRegister({commit},user){
            let result = await reqUserRegister(user)
            console.log(result)
            if(result.code == 200){
                return result.ok
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户登录
       async userLogin({commit},user){
            let result = await reqUserLogin(user)
            // 服务器下发的token，是用户身份的唯一标识（跟uuid很像）
            // 经常通过携带token，向服务器要用户的信息展示
            if(result.code == 200){
                commit('USERLOGIN',result.data.token)
                // 持久化存储token
                setToken(result.data.token)
                return result.ok
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async userInfo({commit},data){
            let result = await reqUserInfo()
            if (result.code == 200) {
                // 提交用户信息
                commit('USERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
       async userLogout({commit},data){
        // 向服务器发送请求，通知服务器清除token
            let result = await reqLogout()
            if(result.code == 200){
                commit('CLEARUSER')
                return result.ok
            }else{
                return Promise.reject(new Error(faile))
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token = token
        },
        USERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        CLEARUSER(state){
            // 清除仓库的有关用户的数据
            state.userInfo = {}
            state.token = ''
            // 移除本地存储的token
            removeToken()
        }

    },
    getters:{

    }

}