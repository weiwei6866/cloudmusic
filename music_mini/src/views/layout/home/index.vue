<template>
  <div class="boss">
    <!-- 开始轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="c1,index in banners" :key="index"><img :src="c1.pic" alt="" style="width:100%"></van-swipe-item>
</van-swipe>

    <p class="title">推荐歌单</p>
    <van-row gutter="20"> 
  <van-col span="8" v-for="c1,index in musciList" :key="index" @click="goMusicList(c1)">
    <van-image
    radius='4'
  width="100%"
  height="110"
  :src="c1.picUrl"
/>
    <p class="song_name">{{c1.name}}</p>
  </van-col>
</van-row>

<p class="title" style="margin-top:0.625rem">最新音乐</p>

<musicItem :data='newMusic'/>

  </div> 
</template>

<script>
import {Cell,CellGroup} from 'vant';
Vue.use(Cell); 
Vue.use(CellGroup); 
import { Button } from 'vant';
import Vue from 'vue'
Vue.use(Button);

export default {
    name:'home',
    
    data() {
      return {
        musciList:[],
        newMusic:[],
        banners:[]
      }
    },

    methods:{
      goMusicList(c1){
        this.$router.push({
          name:'album',
          query:{
            data:c1.id
          }
        })
      }
    },

    async created(){
      try {
      let banners = await this.$api.getBanner()
      this.banners =  banners.banners
      let result = await this.$api.reqLikeList(6)
      this.musciList = result.result
      let result2 = await this.$api.reqGetNewMusic()
      this.newMusic = result2.result
      } catch (error) {
        
      }
    }
}
</script>

<style scoped>

/* .van-nav-bar__content{
  background-color: lightblue;
} */
.van-cell__title span{
  font-size: 1rem;
}


/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: .9375rem;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

</style>