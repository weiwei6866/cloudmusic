<template>
<div class="bigContainer">
    <div class="login_top">
   <div>登录网易云音乐</div> 
   <div>短信登录</div> 
  </div>
  <div class="login_dalu">
    <span>中国大陆</span>
    <h2>></h2>
  </div>


    <div id="boxer">
          <span>+86</span>
    <input type="text" placeholder="请输入常用手机号" v-model="text">
    </div>
 
  <div class="login_code">
    <div id="inner">
    <span>密码</span>
    <input type="password" placeholder="请输入密码" v-model="code">
    </div>
  </div>

<button class="button" @click="goValidate">登录/注册</button>

<div id="login_bottom">未注册网易云音乐的手机号，我们将自动帮你注册账号
登录或完成注册即代表你同意用户协议和隐私政策</div>

</div>
</template>

<script>
export default {
  name:'login',
    data() {
        return {
            text:'13361760764',
            code:'19995029x'
        }
    },

    methods:{
        async goValidate(){
          let result = await this.$api.reqLogin(this.text,this.code)
          console.log(result);
        }
    }

}
</script>

<style scoped style lang="less">
  



#login_bottom{
  font-size: .75rem;
  text-align: center;
  width: 80%;
  margin: 0 auto;
   margin-top: 20px;
}


.button{
  margin-top: 1.25rem!important;
  height: 2.8112rem;
  width: 21.9375rem;
  display: block;
  margin: 0 auto;
  background-color: #d43c33;
  border: 1px solid #d43c33;
      color: #fff;
  border-radius: .25rem
}

.login_code{
  box-sizing: border-box;
    background-color: #ffffff;
  width: 100%;
  height: 2.8112rem;
  border: 1px solid #e7e7e7;
  margin-top: 1px;
  overflow: hidden;
}
#inner{
  height: 100%;
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

 
}
.login_code span{
  width: 4.75rem;
  font-size: .875rem;
}
.login_code input{
  flex: 1;
  height: 100%;
  border: none;
  outline:none
}

#boxer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
#boxer span{
  width: 4.75rem;

}

#boxer p{
  width: 1.375rem;
  height: 60%;
  border-right: 1px solid #e7e7e7;
}

#boxer input{
  flex:1;
  height: 100%;
  box-sizing: border-box;
  border: none;
  outline:none
}

#boxer button{
  width: 6.25rem;
  height: 100%;
  background-color:#ffffff ;
  border: none;
  color: #d43c33;
}
.login_valicode{
  background-color: #ffffff;
  width: 100%;
  height: 2.8112rem;
  margin-top: 1.25rem;
  border: 1px solid #e7e7e7;
  border-bottom: none;
}

#boxer{
  height: 2.8112rem;
  margin: .9375rem
}

.bigContainer{
  height: 25rem;
  width: 100%;
  background-color: rgba(244,244,244,1);;
}
.login_top{
  box-sizing: border-box;
  width: 100%;
  height: 2.8737rem;
  background-color: #ffffff;
  position: relative;
  border: 1px solid  #e7e7e7;
}

.login_top div:nth-child(1){
    position:absolute;
    top:50%;
    left:50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform:translate(-50%,-50%);


}
.login_top div:nth-child(2){
  float: right;
  line-height: 2.8731rem;
  font-size: .75rem;
  margin-right: .625rem;
}

.login_dalu{
  box-sizing: border-box;
  width: 100%;
  height: 2.7487rem;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: center;
  border: 1px solid  #e7e7e7;
  
  /* background-color: red; */
}

.login_dalu span{
  padding: 0 10px;
  font-size: .875rem;
}
.login_dalu h2{
  position: absolute;
  right: 10px;
}



</style>