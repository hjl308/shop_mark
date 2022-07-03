<template>
  <div id="app">
   <Header />
   <!-- 路由组件出口的地方 -->
   <router-view></router-view>
   <!-- 在Home和Search下显示，Login和Register下隐藏 -->
   <Footer v-show="this.$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // (放在App【main.js也可】，这样数据只要请求一次，优化性能)
    // 通知Vuex的actions发送请求，获取三级商品列表数据，存储与仓库中
    this.$store.dispatch('home/getCategoryList')
  },
}
</script>

<style>

</style>
