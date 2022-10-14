<template>
<div>
<van-nav-bar
  :title="path"
/>

<keep-alive>
 <router-view></router-view>
</keep-alive>
 <van-tabbar v-model="active" route placeholder >
  <van-tabbar-item icon="home-o" to='/layout/home' replace>首页</van-tabbar-item>
  <van-tabbar-item icon="search" to='/layout/search' replace>搜索</van-tabbar-item>
  <van-tabbar-item icon="contact" to='/layout/login' replace>个人中心</van-tabbar-item>
</van-tabbar>
    
</div>
</template>

<script>
export default {
    name:'layout',
    data() {
        return {
            active:0
        }
    },

    computed: {
      path(){
        if(this.$route.path.indexOf('home') !== -1){
          return '首页'
        }else if(this.$route.path.indexOf('search') !== -1){
          return '搜索'
        }else{
          return '个人中心'
        }
      }
    },
}
</script>

<style>


</style>