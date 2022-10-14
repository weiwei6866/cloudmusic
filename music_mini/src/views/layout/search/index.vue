<template>
  <div>
    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a2093f7d331668151ca7371ddab3b46a_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662969191&t=b390b11117e0db241d6a7f72974fcb34" alt="" id="imgDiy" v-show="stable == 0">
    <van-search v-model="value" placeholder="请输入搜索关键词" autofocus @search='search' shape="round" @clear='clearData' @input="inputFn"/>
    
    <!-- 搜索热搜关键词 -->
    <div class="search_wrap" v-show="stable == 0">
      <!-- 标题 -->
      <p class="hot_title" style="margin-bottom:0.625rem">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span class="hot_item" v-for="c1,index in hots" :key="index" @click="searchMsg(c1.first)">{{c1.first}}</span>
      </div>

      <!-- 历史搜索记录-->
      <p class="hot_title hot_title2" style="margin-bottom:0.625rem;margin-top:0.7rem"><span>历史记录</span><span @click="clearAll" v-if="historyList.length>0">删除全部&nbsp;x</span></p>
      <div class="hot_name_wrap">
        <span class="hot_item hot_item2" v-for="c1,index in historyList" :key="index" @click="goSearch(c1)">{{c1}}</span>
      </div>
      
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-show="stable == 1">
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check='false'
>
      <van-cell center :title='c1.name' :label="c1.ar[0].name + ' ' + c1.name" v-for="(c1,index) in musicList" :key="index">
        <template #right-icon >
          <van-icon name="play-circle-o" size="1.2rem" @click="toPlay(c1)"/>
        </template>
      </van-cell>
   </van-list>
    </div>

    <!-- 搜索联想 -->
    <div v-show="stable == 2">
      <ul class="ul_list">
        <li v-for="(c1,index) in suggestionList" :key="index" @click="sendInfo(c1.keyword)"> <van-icon name="search" />&nbsp;<span>{{c1.keyword}}</span></li>
      </ul>
    </div>
    
  </div>
</template>

<script>

export default {
    name:"search",

    data() {
      return {
        value:'',
        hots:[],
        musicList:[],
        stable:0,
        suggestionList:[],
        timer:null,
        historyList:JSON.parse(localStorage.getItem('history')) || [],
        loading:false,
        finished:false,
        index:0
      }
    },

    async created(){
      let result = await this.$api.reqHotSearch()
      this.hots = result.result.hots
    },

    methods: {
      async onLoad(){

        try {
                              let result = await this.$api.reqSearchResult(this.value,1,this.index)
          this.index = this.index + 1
          this.loading = false
          console.log(result.result.songs);
          this.musicList = this.musicList.concat(result.result.songs)
          console.log(this.musicList);
        } catch (error) {
          console.log(error);
        }


      },



      async search(){
        let result = await this.$api.reqSearchResult(this.value,1,this.index)
        this.stable = 1
        console.log(this.index);
        this.index++
        console.log(this.index,'@@@');
        this.musicList = result.result.songs
        if(this.value.trim()){
                  this.historyList.push(this.value)
        let arr = new Set(this.historyList)
        this.historyList = Array.from(arr);
        localStorage.setItem('history',JSON.stringify(this.historyList)) 
        }
      },

      goSearch(data){
        this.searchMsg(data)
      },

      searchMsg(value){
        this.value = value
        this.search()
      },

      sendInfo(data){
        this.historyList.push(data)
        let arr = new Set(this.historyList)
        this.historyList = Array.from(arr);
        localStorage.setItem('history',JSON.stringify(this.historyList))
        this.goSearch(data)
      },

      clearData(){
        this.musicList = []
        this.stable = 0
      },

      inputFn(){
        clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
          if(this.value.trim()){
            this.stable = 2
            let result = await this.$api.reqSuggestion(this.value)
            this.suggestionList = result.result.allMatch
          }else{
            this.stable = 0
          }
        }, 500);
      },

      clearAll(){
        this.historyList = [],
        localStorage.removeItem('history')
      },

      toPlay(data){
        this.$router.push({
          name:'musicplaycenter',
          query:{
            data
          }
        })
      }
    },
}
</script>

<style>
.van-search{
  background-color: trans;
}


#imgDiy{
  width: 100%;
  position: absolute;
  z-index: -2;
  height: 36.5rem;
}


/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

.hot_title2{
  display: flex;
  justify-content: space-between;
}



/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 1.8rem;
  margin-right: 1.2rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 1.8rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 0.0625rem solid #d3d4da;
}

.hot_item2{
  background-color:#f4f4f4;
}

.ul_list{
  width: 80%;
  background-color: #fcfcfd;
  margin: 0 auto;
  
}
.ul_list li{
  height: 2.5rem;
  line-height: 2.5rem;
  border-top: .0313rem solid rgba(0,0,0,.1);
  box-sizing: border-box;
}

.ul_list li:last-child{
  border-bottom:.0313rem solid rgba(0,0,0,.1);;
}




</style>