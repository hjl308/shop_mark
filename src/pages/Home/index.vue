<template>
  <div>
      <!-- 使用三级联动（已注册为全局组件，所以无需引入） -->
      <TypeNav />
      <ListContainer />
      <TodayRecommend />
      <Rank />
      <Like />
      <!-- Floor的数据来自，父亲组件Home发送请求获得的 -->
      <!-- v-for 在自定义组件的标签上，也可以使用 -->
      <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
      <Brand />
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from "vuex"
export default {
    name:'Home',
    components:{ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
    mounted() {
      // 派发action，获取floor组件数据
      this.$store.dispatch('home/getFloorList')
    },
    computed:{
      ...mapState('home',['floorList'])
    }
}
</script>

<style>

</style>