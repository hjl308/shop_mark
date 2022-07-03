<template>
    <div class="order-content">
    <div class="title">
        <h3>我的订单</h3>
    </div>
    <div class="chosetype">
        <table>
        <thead>
            <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
            </tr>
        </thead>
        </table>
    </div>
    <div class="orders">

        <table class="order-item" v-for="(order) in myorder.records" :key='order.id'>
        <thead>
            <tr>
            <th colspan="5">
                <span class="ordertitle">{{order.createTime}}订单编号：{{order.outTradeNo}}<span
                    class="pull-right delete"><img src="../images/delete.png"></span></span>
            </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
            <td width="60%">
                <div class="typographic">
                <img :src="cart.imgUrl" width="100px">
                <a href="#" class="block-text">{{cart.skuName}}</a>
                <span>x{{cart.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
                </div>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="8%" class="center">{{order.consignee||'小包'}}</td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0" width="13%" class="center">
                <ul class="unstyled">
                <li>总金额¥{{order.totalAmount}}.00</li>
                <li>在线支付</li>

                </ul>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0"  width="8%" class="center">
                <a href="#" class="btn">{{order.orderStatusName}} </a>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0"  width="13%" class="center">
                <ul class="unstyled">
                <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>

                </ul>
            </td>
            </tr>
        </tbody>
        </table>

    </div>
    <div class="choose-order">
        <!-- 分页器 -->
          <Pagination
            :pageNo="page"
            :pageSize="limit"
            :total="myorder.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
    </div>
    </div>
</template>
<script>
export default {
    name:'MyOrder',
        data() {
      return {
        // 初始化参数
        //订单第几页
        page:1,
        //每页展示的个数
        limit:3, 
        // 订单数据
        myorder:{}
            }
    },
    mounted() {
      // 获取订单列表数据展示
      this.getData()
    },
    methods: {
      // 获取订单列表数据展示
      async getData(){
        // 结构出参数
        const {page,limit}=this
        let result = await this.$API.reqOrderList(page,limit)
        if (result.code==200) {
          this.myorder = result.data
        }
      },
    // 获取当前点击的页数
    getPageNo(page){
        // 修改组件响应式数据page
        this.page=page
        // 发送请求，获取新页数的数据展示
        this.getData()
    }
    },
}
</script>
<style>
    
</style>