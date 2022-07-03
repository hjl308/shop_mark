<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key='cart.id'>
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @click="changeChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)"> 
            <!--  $event.target.value*1乘以1，进行隐式number类型转换-->
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked' @change="allOrNotChecked" :disabled="cartInfoList.length<1">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// 引入throttle，进行节流。（即限制一定时间，鼠标的点击次数）
import throttle from "lodash/throttle"
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods: {
      // 派发actions，获取个人购物车数据
      getData(){
        this.$store.dispatch('shopcart/getCartList')
      },

      // 修改商品数量，向服务器派发送请求
      // 对修改数量的点击次数，我们进行节流，每一秒钟只允许点击一次
       handler:throttle(async function(type,disNum,cart){
        // type: mius 减1 、add 加1 、change 数量输入的改变
        // disNum：变化量（+1） -变化量（-1） input输入的最终个数
        // skuId:商品的ID
        switch(type){
          case 'add':
            disNum = 1
            break
          case 'minus':
            disNum =cart.skuNum>1?-1:0
            break
          case 'change':
            // 如果用户输入非法，小于0或者非数字,把0带给服务器
            // 输入正常数字，但可能输入小数，要取整。计算出变化的量，带给服务器
             //disNum类型为number，parseInt是字符串用的，不要给number类型取整，会出现parseInt(0.0006)=6的错误
            disNum = (isNaN(disNum) || disNum<1)?0:Math.trunc(disNum)-cart.skuNum
            break
        }
        // 派发action
        try {
          // 修改成功
          await this.$store.dispatch('detail/addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
          // 再次获取服务器的购物车数据，进行展示
          this.getData()
        } catch (error) {} },1000),

      //删除购物车商品,需要参数skuId，向服务器派发delete类型请求
      async deleteCart(skuId){
        try {
          // 如果删除成功
          await this.$store.dispatch('shopcart/deleteCartListBySkuId',skuId)
          // 再次向服务器发送请求，获取新的数据展示
          this.getData()
        } catch (error) {
          // 如果删除失败,提示错误信息
          alert(error.message)
        }
        
      },
      // 切换商品选中状态
      async changeChecked(cart,event){
        try {
          // 修改购物车状态成功,isChecked参数：0是没选中，1是选中
          // （$event.target.checked*1隐式转换number,或者前面添加'+'）
          await this.$store.dispatch('shopcart/changeChecked',{skuId:cart.skuId,isChecked:event.target.checked*1})
          // 再次发送请求，更新购物车数据
          this.getData()
        } catch (error) {
          // 修改服务器购物车状态失败
          alert(error.message)
        }
        
      },
      // 删除全部已勾选的商品
      async deleteAllCheckedCart(){
        try {
        // 派发一个action,如果删除成功
        await this.$store.dispatch('shopcart/deleteAllCheckedCart')
        // 再次发送购物车列表请求，更新前台页面数据
        this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 全部勾选或者全不选中
     async allOrNotChecked(event){
      try {
          // 获取全选状态
        let flag = event.target.checked?'1':'0'
        // 派发请求，更改选中状态
        await this.$store.dispatch('shopcart/allOrNotChecked',flag)
        // 更新购物车展示数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      }
    },
    computed:{
      ...mapGetters('shopcart',['cartList']),
      // 购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      // 计算购买产品的总价
      totalPrice(){
        let sum = 0
        // 遍历商品信息数组，计算总价格
        this.cartInfoList.forEach(item => {
          sum+=item.skuNum*item.cartPrice
        })
        return sum
    },
    // 判断底部复选框是否勾选【全都都选中，则勾选】
    isAllChecked(){
      // 遍历数组里面的isCheked属性，全为真，则返回真。否则为假。
      return this.cartInfoList.every(item=>item.isChecked == 1)
    }
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>