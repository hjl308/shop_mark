// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据引入进来[JSON数据格式根本没有对外暴露，但可以引入]
// webpack默认对外暴露：图片、JSON数据格式
import banners from './banners.json'
import floors from './floors.json'

// 参数一：参数请求地址url 参数二：请求数据模板
Mock.mock('/mock/banners',{code:200,data:banners})// 提供广告位轮播数据的接口
Mock.mock('/mock/floors',{code:200,data:floors})// 提供所有楼层数据的接口