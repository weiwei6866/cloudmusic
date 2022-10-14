<template>
  <div class="boxer">
    <van-popup v-model="show" position="bottom" round>
      <h2 style="gray">当前播放</h2>
      <div class="second">
        <div>
          <van-icon name="revoke"  size="30"/>
          <span style="fontSize:1.25rem">列表循环</span>
        </div>
        <div>
          <span><van-icon name="down" size="30"/></span>
          <span><van-icon name="star-o" size="30" /></span>
          <span><van-icon name="delete-o" size="30" /></span>
        </div>
      </div>

      <div class="musicAll" style="margin-top:10px" v-if="allData !== undefined">
        <div class="musicItem" v-for="c1,index1 in allData" :key="index1" @click="playThis(index1)">
          <div class="musicItemMini"><span>{{c1.name}}</span>&nbsp;<span class="fonts" v-for="c2,index2 in c1.ar" :key='index2'>-&nbsp;{{c2.name}} </span>
          <van-icon name="fire" v-if="indexNow == index1"/></div>
          <span><van-icon name="cross" @click="closeOne(index1,$event)" /></span>
        </div>
      </div>
      <van-empty description="请从专辑获取下一首音乐" v-else/>
    </van-popup>

    <!-- 背景大图 -->
    <img :src="musicList.al.picUrl" alt="" class="img">
    <!-- 头部歌曲信息 -->
    <div class="play_header">
      <div>
        <van-icon name="arrow-left" size="30" style="margin-top:6px" @click="turnBack"/>
        <div class="music">
          <van-notice-bar scrollable :text="musicList.name" color="#fff" id="diyName" background="transparent"/>
          <!-- <div class="names">
            <span v-for="c1 in musicList.ar" :key="c1.id" class="iop">{{c1.name}}</span>
          </div> -->
          <div class="names">
            <van-notice-bar color="#fff" background="transparent">
              <span v-for="c1 in musicList.ar" :key="c1.id" class="iop">{{c1.name}}</span>
            </van-notice-bar>
          </div>
        </div>
      </div>
      <div>
        <van-icon name="share-o" size="30"/> 
      </div>
    </div>

    <!-- 歌词部分 -->
    <div v-if="lyricAndNeedle" class="lyric" ref="boxer" @click="changeLyric"> 
      <p v-for="c1,index in lyc" :ref="index" :key="index" :class="{active:currentTime*1000>c1.time&&currentTime*1000<lyc[index+1].time}">
        {{c1.lrc}}
      </p>
    </div>

    <!-- 开始磁盘，针 -->
    <div class="music_cipanAll" v-else @click="changeLyric">
      <img src="./pictures/cipan.png" alt="" class="img_cd">
      <img src="./pictures/cizhen.png" alt="" class="img_needle" :class="{img_needle_active:!isBtnShow}">
      <img :src="musicList.al.picUrl" alt="" class="img_ar" ref="pic" :class="{img_ar_active:!isBtnShow,img_ar_pause:isBtnShow}">
    </div>

    <!-- 开始图标 -->
      <!-- 开始floor部分 -->
  <div class="detailFooter">
    <div class="footerTop">
        <!-- 5个图标 -->
        <!-- style="width:0.25rem;height:0.25rem" -->
      <svg class="icon liebiao" aria-hidden="true" >
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" >
        <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" >
        <use xlink:href="#icon-shoujizhuti_06yinle"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="goComments">
        <use xlink:href="#icon-xinxi" ></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" >
        <use xlink:href="#icon-xunhuanbofang"></use>
      </svg>
    </div>
        <!-- 播放器 -->
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${musicList.id}`"  @canplay="getDuration"></audio>
      <!-- 进度条 -->
    <div class="footerContent">
      <van-slider v-model="currentTime"  @change="onChange" min='0' :max="duration"  class="range" step="0.1" button-size='12px'/>
    </div>
    <div class="footer">
      <!-- 最底部的5个图标（播放按钮） -->
     <svg class="icon liebiao" aria-hidden="true" >
        <use xlink:href="#icon-liebiaoxunhuan"></use>
      </svg>
     <svg class="icon liebiao" aria-hidden="true" @click="previous">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
     <svg class="icon liebiao teshu" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
     <svg class="icon liebiao teshu" aria-hidden="true" v-else @click="playMusic">
        <use xlink:href="#icon-zanting" ></use>
      </svg>
     <svg class="icon liebiao " aria-hidden="true" @click="next">
        <use xlink:href="#icon-kuaijin"></use>
      </svg>
     <svg class="icon liebiao" aria-hidden="true" @click="showList">
        <use xlink:href="#icon-songlist"></use>
      </svg>
    </div>
</div>

  </div>
</template>

<script>
export default {
    name:'musicPlayCenter',

    data() {
      return {
        // musicList:this.$route.query.allData[this.$route.query.data],

        allData:this.$route.query.allData,

        indexNow:this.$route.query.data,

        currentTime:0,

        isBtnShow:true,

        duration:0,

        timer:null,

        lyc:[],

        lyricAndNeedle:false,

        show:false

      }
    },

    async created() {
      this.getLyric()
    },

    methods:{
      closeOne(index,e){
        e.stopPropagation()
        this.allData.splice(index,1)
        this.goPlay()
      },


      async getLyric(){
             let result =  await this.$api.getLyricById(this.musicList.id)
     this.lyc = result.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item,index)=>{
            let mill0 = item.slice(7,10)
            if(isNaN(Number(mill0))){
              return{
              min:item.slice(1,3),
              sec:item.slice(4,6),
              mill:item.slice(7,9),
              lrc:item.slice(10,item.length),
              time:parseInt(item.slice(1,3))*60*1000+parseInt(item.slice(4,6))*1000+parseInt(item.slice(7,9))
              }
            }else{
              return{
            min:item.slice(1,3),
            sec:item.slice(4,6),
            mill:item.slice(7,10),
            lrc:item.slice(11,item.length),
            time:parseInt(item.slice(1,3))*60*1000+parseInt(item.slice(4,6))*1000+parseInt(item.slice(7,10))
              }
            }
     })
      },

      playThis(index){
        this.indexNow = index
        this.show = false
        this.goPlay()
      },

      showList(){
        this.show = true
      },

      previous(){
        this.indexNow = this.indexNow - 1 
        if(this.indexNow < 0){
          this.indexNow = this.allData.length - 1
        }
        this.goPlay()
      },

      next(){
        this.indexNow = this.indexNow + 1
        if(this.indexNow > this.allData.length - 1){
          this.indexNow = 0
        }
        this.goPlay()
      },


      goComments(){
        this.$router.push({
          name:'comments',
          query:{
            data:this.musicList
          }
        })
      },

      changeLyric(){
        this.lyricAndNeedle = !this.lyricAndNeedle
      },

      getDuration(){
        this.duration = this.$refs.audio.duration
      },



      turnBack(){
        this.$router.back()
      },

      playMusic(){
        this.$nextTick(()=>{
      if(this.isBtnShow){   
        this.isBtnShow = !this.isBtnShow
        this.currentChange()
        this.$refs.audio.play()
       }else{
        clearInterval(this.timer)
        this.isBtnShow = !this.isBtnShow
        this.$refs.audio.pause()
       }
        })
      },

      onChange(val){
        this.isBtnShow = false
        this.$refs.audio.play()
        this.$refs.audio.currentTime = val
        this.currentTime = val
      },

      currentChange(){
        clearInterval(this.timer)
          this.timer = setInterval(() => {
          this.currentTime = this.$refs.audio.currentTime
          if(this.duration == this.currentTime){
            this.isBtnShow = true
          }
        }, 1000);
      },

      goPlay(){
      this.currentChange()
      this.$nextTick(()=>{
        this.isBtnShow = false
        this.currentTime = this.$refs.audio.currentTime
        this.$refs.audio.play()
      })
      }
    },

      mounted() { 
        this.goPlay()
    },

    beforeDestroy() {
       clearInterval(this.timer)
    },



    computed: {
      // prolong(){
      //     return this.$refs.audio.duration || ''
      // },

      musicList(){
        if(this.allData == undefined){
          return this.$route.query.data
        }else{
          return this.allData[this.indexNow]
        }
      }

    },

    watch: {
      currentTime(){
       this.$nextTick(()=>{
         let op = document.querySelector('p.active') || {}
        if(op.offsetTop>300){
          this.$refs.boxer.scrollTop = op.offsetTop-300
        }
       })
      },

      indexNow(){
        this.getLyric()
      }
    },



}
</script>

<style scoped lang='less'>
.musicItem{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .625rem;
}

.van-popup{
  max-height: 50%;
 background:-webkit-linear-gradient(top,white,rgb(202, 96, 96),rgb(125, 195, 222));


}

.musicItemMini{
  margin-left: .625rem;
}

.musicItemMini span:nth-child(1){
  font-size: 1.125rem;
}

.fonts{
  font-size: .85rem;
      color: rgb(198, 191, 191);
}

.second{
  margin-top: .625rem;
  width: 100%;
  height: 1.875rem;
  display: flex;
  justify-content: space-between;
}
.second div:nth-child(1){
  width: 8.5rem;
    display: flex;
    align-items: center;
  justify-content: space-around;
}

.second div:nth-child(2){
  align-items: center;
  width: 8.125rem;
  display: flex;
  justify-content: space-between;
}

#diyName{
  width: 10.625rem;
}

.boxer{
  width: 23.4375rem;
  height: 41.6875rem;
}


/deep/.van-notice-bar{
  width: 18.75rem;
  height: 1.125rem;
}

.lyric{
  width: 100%;
  height: 28.125rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  p{
    margin-bottom: 1.25rem;
  }

  .active{
    color: red;
  }
}

.range{
  margin-top: .9375rem;
  margin-bottom: 1.8125rem;
  width: 100%;
}

.img_needle{
  width: 6.25rem;
  height: 10.5234rem;
  position: absolute;
  left: 46%;
  transform-origin: 0 0;
  transform: rotate(-10deg);
  transition: all 2s;
  
}
.img_needle_active{
  width: 6.25rem;
  height: 10.5234rem;
  position: absolute;
  left: 46%;
  transform-origin: 0 0;
  transform: rotate(0deg);
  transition: all 2s;
  
}

.img_cd{
  width: 15.625rem;
  height: 15.625rem;
  position: absolute;
  bottom: 7.1875rem;
}


.music_cipanAll{
  width: 100%;
  height: 28.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.img_ar{
  width:9.8125rem;
  height:9.8125rem;
  position: absolute;
  border-radius: 50%;
  bottom: 10.1016rem ;
  animation: rotater 10s linear infinite ;
}

.img_ar_active{
  animation-play-state: running;
}

.img_ar_pause{
  animation-play-state: paused;
}

@keyframes rotater {
  0%{
    transform: rotateZ(0deg);
  }
  100%{
    transform: rotateZ(360deg);
  }
}



.img{
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(40px);
  z-index: -1;
}

.van-notice-bar{
  padding: 0;
}

 /deep/.van-notice-bar__wrap{
  width: 12.5rem;
}


.play_header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.music{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  float: right;
  margin-left: .9375rem;
  color:darkgray;
}

.iop{
  font-size: .8125rem;
  color: #999;
  margin-right: .3125rem;
}

.names{
  width: 18.75rem;
  height: 1.125rem;
  overflow: auto;
}


.footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3.125rem;
}

.footer .icon{
    width: 25px;
  height: 25px;
}

.footer .teshu{
  width: 50px;
  height: 50px;
}

.footerTop{
    width: 100%;
    height: 3.125rem;

    display: flex;
    justify-content: space-around;
    align-items: center;

}

.footerTop .icon{
    width: 1.875rem;
    height: 1.875rem;
}


.detailFooter{
  margin-top: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    bottom: 0px;

}

#alldiv{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

// /deep/ .van-slider__button{
//   width: 23.4375rem;
// }


</style>