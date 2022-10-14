<template>
  <div>
    <div class="advertisement">
            <img class="img_main" :src="album.coverImgUrl" alt=""> 
        <div class="main">
           <div class="img_all">
            <div class="gedan">歌单</div>
            <div class="bofangliang">{{playCount}}</div>
             <img style="width:126px;height:126px" :src="album.coverImgUrl" alt="" @click="$router.push('/layout/home')">
           </div>
            <div class="div2">
                <span>{{album.name}}</span>
                <div class="div2_name">
                    <img style="width:30px;height:30px" :src="creator.avatarUrl" alt="">
                    <span>{{creator.nickname}}</span>
                </div>
                <van-notice-bar  :text="album.description" background='transparent' color="#fefefe"/>
            </div>
        </div>

    </div>
    <div class="word">
        歌曲列表
    </div>
    <div>
              <van-cell center :title='c1.name' :label="c1.ar[0].name + ' ' + c1.name" v-for="(c1,index) in album.tracks" :key="index">
        <template #right-icon >
          <van-icon name="play-circle-o" size="1.2rem" @click="toPlay(index)"/>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
    name:'album',

    data() {
        return {
           musicList:[],
           album:{}
        }
    },

    async created() {
       let result = await this.$api.reqMlist(this.$route.query.data)
       console.log(result);
       this.album = result.playlist
    },

    methods: {
        toPlay(index){
            this.$router.push({
                name:'musicplaycenter',
                query:{
                    data:index,
                    allData:this.album.tracks
                }
            })
        }
    },

    computed: {
        playCount(){
            let num = this.album.playCount+''
           if(num.length>=9){
        return num.slice(0,num.length-8)+'亿'
}else if(num.length>=5){
  return num.slice(0,num.length-4)+'万'
}else{
  console.log(num);
}
        },

        creator(){
            return this.album.creator || {}
        }
    },
}
</script>

<style>

.img_all{
    position: relative;
}

.word{
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
}

.gedan{
        top: 10px;
        text-align: center;
        font-size: 9px;
        border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
    width: 2.5rem;
    height: 1.0625rem;
        color: #fff;
        background-color: rgba(217,48,48,.8);
    position: absolute;

}
.bofangliang{
    position: absolute;
        right: 2px;
    top: 0;
        color: #fff;
    font-size: 12px;
        text-shadow: 1px 0 0 rgb(0 0 0 / 15%);
}

.advertisement{
    width: 100%;
    height: 9.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
        overflow: hidden;
}

.main{
   display: flex;
   justify-content: space-around;
}

.div2{
    display: flex;
    flex-direction: column;
    width: 13rem;
    height: 7.875rem;
    margin-left: .625rem;
}

.div2_name{
    margin-top: .625rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.div2>span{
        font-size: 17px;
            color: #fefefe;
            
}

.div2_name span{
        color: hsla(0,0%,100%,.7);
        margin-left: .625rem
        
        
}

.div2_name img{
    border-radius: 50%;
}

.img_main{
    width: 100%;
    height: 9.5rem;
    filter: blur(20px);
    position: absolute;
    z-index: -1;
   
}


</style>