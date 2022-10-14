<template>
  <div>
    <!-- 音乐部分 -->
<van-cell-group v-for="c1,index in data" :key="index">
  <van-cell :title="c1.name" :label="c2.name" center v-for="(c2,index) in c1.song.artists" :key="index" @click="goPlayCenter(c1)">

  <template #right-icon >
    <van-icon name="play-circle" size='1.25rem'/>
  </template>

  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
export default {
    name:'musicItem',

    props:['data'],
    
    methods: {
      goPlayCenter(c1){
        let object = {}
        object.al = {}
        object.al.name = c1.name
        object.al.picUrl = c1.picUrl
        object.id = c1.id
        object.ar = c1.song.artists
        this.$router.push({
          name:'musicplaycenter',
          query:{
            data:object
          }
        })      
        }
    },
}
</script>

<style>

</style>