<template>
  <div>
            <div class="item" v-for="c1,index in comment" :key="index">
        <div class="main_item">
            <div class="main_item_left">
            <img :src="c1.user.avatarUrl" alt="">
            <div class="detail">
                <span>{{c1.user.nickname}}</span>
                 <span style="fontSize:0.65rem;color:#999">{{c1.timeStr}}</span>
            </div>
            </div>
            <div class="main_item_right">
                <span>{{c1.likedCount}}</span>
                <van-icon name="good-job-o" />
            </div>
        </div>
        <div class="comment">
            <div>{{c1.content}}</div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
    name:"commentItem",

    props:['comment']
}
</script>

<style scoped lang='less'>

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
    width: 9.375rem;
    height: 100%;
    
}

.main_left{
    font-weight: bold;
}





</style>