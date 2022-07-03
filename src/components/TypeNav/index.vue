<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委派 （把子节点的事件全部委派给父节点）-->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                 <!-- 三级联动 + 过渡动画 -->
                 <transition name="sort">
                    <div class="sort" v-show="show">
                    <!-- 利用 事件的委派+编程式路由 实现路由的跳转与传递参数 -->
                    <div class="all-sort-list2" @click="goSearch($event)">
                        <div class="item" v-for="(c1,index) in categoryList" :key='c1.categoryId' >
                            <!-- 一级分类 -->
                            <h3 @mouseenter="changeIndex(index)"  :class="{cur:currentIndex == index}">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">
                                    {{c1.categoryName}}
                                </a>
                            </h3>
                            <!-- 二级、三级分类 ，实现显示与隐藏-->
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt >
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                                                {{c2.categoryName}}
                                            </a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                                                    {{c3.categoryName}}
                                                </a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
        
                    </div>
                    </div>  
                 </transition>
                       
            </div>   

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
// 按序引入throttle功能，进行节流（即限制一定时间，鼠标的点击次数）
import throttle from "lodash/throttle"
export default {
    name:'TypeNav',
    data() {
        return {
            //储存用户鼠标移上哪个一级分类
            currentIndex:-1,
            show:true,
        }
    },
    //组件挂载完毕：可以向服务器发送请求
    mounted() {
        // 判断如果是search才会执行
        if (this.$route.path != '/home') {
            this.show = false
        } 
    },
    computed:{
        ...mapState('home',['categoryList'])
    },
    methods: {
        // 鼠标进入修改currentIndex。进行节流，0.5s只能点一次
        changeIndex:throttle(function (index) {
             // index:鼠标移动上一级分类元素的索引
            // 非正常情况（用户操作过快）:导致浏览器反应不过来。如果当前回调函数有大量业务，有可能出现卡顿现象
            this.currentIndex = index
        },50),
        // 鼠标离开一级分类标题，索引变为-1，并隐藏商品列表
        leaveShow(){
            this.currentIndex = -1
            // 判断如果是search才会执行
             if (this.$route.path != '/home') {
                 this.show = false
            } 

        },
        // 进行路由跳转的回调
        goSearch(event){
            //解决三级联动路由跳转：事件的委派+编程式路由（声明式路由【一个组件的使用】耗内存，会出现卡顿）
            // 利用事件委派存在的问题：1，如何确定点击的是a标签 2，如何区分和获取1~3级分类产品的名字、id

            // 问题一：把子节点的a标签，加上自定义属性data-categoryName,其余子节点是没有的
            let node = event.target
            // 节点有一个dataset属性，可以获取节点的自定义属性与属性值.(浏览器自动把属性名变成全小写)
            let {
                categoryname,
                category1id,
                category2id,
                category3id} = node.dataset
            // 有categoryname的一定是a标签
            if (categoryname) {
                // 整理路由跳转参数
                let location = {name:"search"}
                let query = {categoryName:categoryname}
                // 区分1~3级分类的a标签
                if (category1id) {
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }
                // 整理完参数
               /* 路由跳转的时候，如果带有params参数，要捎带着一起传递过去
                 注意:这里使用if判断无效。因为this.$route.query，默认是空对象，if判断永远为真，所以别写了
                */
                // 动态给location配置对象添加query属性
                    location.query = query
                    location.params = this.$route.params
                    // 路由跳转
                    this.$router.push(location)
                
               
            }

        },
        // 鼠标移入，显示商品列表
        enterShow(){
            if (this.$route.path != '/home') {
                 this.show = true
            } 
        }
    },
}
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        .cur {
                            background: skyblue;
                        }
                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                       
                    }
                }
            }
            // 三级列表的过渡动画
            // 过渡动画的开始
            .sort-enter{
                height: 0px;
            }
            // 过渡动画的结束
            .sort-enter-to{
                height:461px ;
            }
            // 定义动画的时间和速率
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>