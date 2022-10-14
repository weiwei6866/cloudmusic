<template>
  <div>
    <!-- head部分 -->
    <van-nav-bar
  :title="`评论(${comment.total})`"
  right-text="按钮">
<template #left>
    <van-icon name="arrow-left" size="24" color="#999" @click="$router.back()"/>
  </template>
<template #right>
    <van-icon name="share-o" size="24" color="#999"/>
  </template>
</van-nav-bar>

    <!-- 内容部分 -->
    <div class="container">
        <span class="main_left">评论区</span>
        <span class="main_right">
            <span @click="changeNew">最新</span>
            <span @click="changeHot" class="cur">最热</span>
        </span>
    </div>

    <!-- 内容主体最新部分 -->
    <div class="main"  v-if="stable == true">
        <commentItem :comment='comment.comments'/>
    </div>
      <!-- 内容主体最热部分 -->
    <div class="main"  v-else>
        <commentItem :comment='comment.hotComments'/>
    </div>

  </div>
</template>

<script>
export default {
    name:'comments',

    data() {
        return {
            comment:{},

            stable:false
        }
    },

    created() {
       this.getData()
    },



    methods: {

   async getData(){
     let id = this.$route.query.data.id
        try {
        let result = await this.$api.reqGetComments(id,60,0)
        this.comment = result
        } catch (error) {
        }
    },
    
    changeNew(e){
        this.stable = true
        let arr = document.querySelector('.main_right').childNodes
        arr.forEach((item)=>{
            item.className = ''
            if(e.target.innerText == item.innerText){
                item.className = 'cur'
            }
        })
    },

    changeHot(e){
        this.stable = false
                let arr = document.querySelector('.main_right').childNodes
        arr.forEach((item)=>{
            item.className = ''
            if(e.target.innerText == item.innerText){
                item.className = 'cur'
            }
        })
    }
    },

    watch: {
        stable(){
            this.getData()
        }
    },
}
</script>

<style scoped lang='less'>

.cur{
    font-weight: bold;
}

.detail span{
    font-weight: 533;
}

.comment{
    width: 20.9375rem;
    margin-left: 2.5rem;
    
}

.comment div:nth-child(2){
    color: #0c73c2;
    font-size: 0.85rem;
}
.comment div:nth-child(1){
    font-weight: 530;
    font-size: 0.85rem;
    margin-left: .625rem;
}

.main_item_right{
    color: #999;
}

.item{
    margin-top: .625rem;
}


.main_item_left{
     display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail{
    margin-left: .625rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
}

.main_item{
    width: 100%;
    height: 3.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main_item img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}


// dwadawd
.van-nav-bar__title{    
    margin-left: 60px;
}

.container{
    width: 100%;
    height: 3.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main_right{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5.625rem;
    height: 100%;
    
}

.main_left{
    font-weight: bold;
}





</style>