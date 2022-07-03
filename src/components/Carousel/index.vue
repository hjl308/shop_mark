<template>
  <!-- 轮播图 -->
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
export default {
    name:'Carousel',
    props:['list'],
    watch: {
    list: {
      // 现象:有些组件，采用父子组件props已传递好数据，不需要、也没有数据变化，不能监听到
      // 解决:可开启immediate,一上来就，立即监听
      immediate: true,
      handler() {
        //现象:有些组件，在组件内发送请求，动态渲染结构【异步，需要等待服务器数据回来，v-for结构才能完整】
        // $nextTick:在下次DOM更新（修改数据之后...）、 事件循环结束、 执行已被延时的回调（因为第一次渲染DOM没有被执行）。（此时，更新后的DOM，已经有完整结构）
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //  点击下方小圆型，也切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          })
        })
      },
    },
  },
}
</script>

<style scoped>
</style>
