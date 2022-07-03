<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 前 -->
    <!-- startAndEndNum[0]是连续页的开始 -->
    <button v-if="startAndEndNum[0] > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo==1}">
      1
    </button>
    <button v-if="startAndEndNum[0] > 2">···</button>
    <!-- 中 -->
    <button
      v-for="(page, index) in startAndEndNum"
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>
    <!-- 后 -->
    <!-- startAndEndNum[continues-1]连续页的结束 -->
    <button v-if="startAndEndNum[continues - 1] < totalPage - 1">···</button>
    <button
      v-if="startAndEndNum[continues - 1] < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', totalPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算出总共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字
    //一般情况， pageNo代表continues中间哪个页码
    startAndEndNum() {
      // 解构赋值，可以减少this的书写
      const { continues, pageNo, totalPage } = this;
      let start = 0,
        end = 0,
        result = [],
        i = 0;
      // 不正常现象
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象
        //起始数字
        start = pageNo - parseInt(continues / 2);
        //结束数字
        end = pageNo + parseInt(continues / 2);
        // 纠正satrt=0 或负数，的不正常现象
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 纠正end>总页码
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      // 把结果压入一个数组，方便使用的时候遍历
      for (i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>