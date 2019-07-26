<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">不动产权证邮寄业务办理<div class="sj"></div></div>
    <div class="box1">
        <div class="item">
            <div class="title">姓名</div>
            <input type="text" placeholder="输入您的姓名" :class="{ active:namez}" @blur.prevent="changeName()">
        </div>
        <div class="item">
            <div class="title">手机号</div>
            <input type="text" placeholder="输入您的手机号" @input="changePhone()" :class="{ active:phonez}" v-model="loginForm.phone">
        </div>
        <div class="item">
            <div class="title">验证码</div>
            <input type="text" placeholder="短信验证码" class="yanzheng" v-model="loginForm.mobileCode">
            <button v-bind:disabled="mybtn" @click="sendMsg">{{content}}</button>
        </div>
    </div>
    <button class="btn" @click="login">登录</button>
    <div class="vx">
        <div class="title">微信授权登录</div>
        <img src="../../img/weixin.png" @click="weChatLogin">
    </div>

    <div class='dianzi'></div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            loginForm:{
                phone: '',
                mobileCode: ''
            },
            mybtn:true,
            namez:false,
            phonez:false,
            content:"点击获取",
            totalTime: 60
        }
    },
    methods:{
        changeName(e){
        var u = event.currentTarget.value;
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if(reg.test(u)){
            this.namez=false
            }if(!reg.test(u)){
                this.namez=true
                return;
            }
      },
        changePhone(e){
            var u = event.currentTarget.value;
            var reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if(!reg.test(u)){
                this.phonez=true,
                this.mybtn=true
                    return;
                }else{
                this.phonez=false,
                this.mybtn=false
                }
            },
        sendMsg(){
            this.$http({
        url: this.$http.adornUrl('/sendMsg'),
        method: 'get',
        params: this.$http.adornParams({
          'phone': this.loginForm.phone
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
            let clock = window.setInterval(() => {
            if(this.totalTime>0 && this.totalTime<=60){
                this.totalTime--
                this.content = this.totalTime + 's'
                this.mybtn=true
            }else{
                this.content = "再次获取"
                this.totalTime=60
                clearInterval(clock)
            }
    },1000)
        }else{
          console.log(data.msg)
        }
      })

        },
        login(){
            this.$http({
        url: this.$http.adornUrl('/login'),
        method: 'post',
        data: this.$http.adornData(this.loginForm)
      }).then(({ data }) => {
        console.log("登录成功")
        console.log(data)
        if (data && data.code === 0) {
          localStorage.removeItem("openid")
          this.$cookie.set('token', data.data)
          let index = 'http://ems.jujinkeji.net/mobile/flow'

          // 微信页面
          location.href = 'http://ems.jujinkeji.net/mobile-ems/wechat/authorOpenId?returnUrl=' + index

          this.$route
          this.$router.push({ path:'/flow'})
        } else {
          alert(data.msg)
        }
      }).catch((err)=>{
        alert("请输入正确的手机号或验证码")
      })
            //this.$router.push("/uploading")
        },
        weChatLogin(){
          localStorage.removeItem("openid")
          let index = 'http://ems.jujinkeji.net/mobile/flow'
          location.href = 'http://ems.jujinkeji.net/mobile-ems/wechat/authorize?returnUrl=' + index
        }
    }
}
</script>
<style scoped>
body{
    width:100%;
}
.content>.title{
  font-size:0.36rem;
  color:#fff;
  text-align: center;
  background:#213980;
  height:0.8rem;
  line-height: 0.8rem;
}
.box{
  width:7.5rem;
  height:0.8rem;
  color:#fff;
  font-size: 0.28rem;
  line-height: 0.8rem;
  background:#177abf;
  text-align: center;
  position:relative;
}
.sj{
  border-top:0.17rem solid #fff;
  border-left:0.13rem solid transparent;
  border-right:0.13rem solid transparent;
  border-bottom:0.13rem solid transparent;
  position:absolute;
  top:0.3rem;
  right:0.4rem;
}
.box1{
    padding:0.6rem 0.3rem;
    box-sizing: border-box;
    width:7.5rem;
}
.item .active{
    border:1px solid red;
}
.item{
    margin-top:0.2rem;
    height:0.8rem;
    align-items: center;
    display: flex;
}
.item>.title{
    font-weight: bold;
    font-size:0.32rem;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    width:2.1rem;
    background:#f2f2f2;
    border:1px solid #666;
    border-radius: 5px;
    margin-right: 0.2rem;
}
.item>input{
    font-size:0.28rem;
    border-radius: 5px;
    background:#f0f0f0;
    border:0;
    outline: none;
    width:3.8rem;
    height:0.75rem;
    padding:0 0.4rem;
}
.item>.yanzheng{
    width:1.5rem;
}
.item>button{
    background:#177abf;
    width:2.1rem;
    height:0.8rem;
    outline: none;
    border:0;
    border-radius: 5px;
    margin-left:0.2rem;
    color:#fff;
}
.item>button[disabled]{
    background:#ccc;
}
.btn{
    display: block;
    background:#177abf;
    color:#fff;
    font-size:0.36rem;
    font-weight: bold;
    outline: none;
    border:0;
    width:6rem;
    height:1rem;
    line-height: 1rem;
    border-radius: 5px;
    margin:0 0.75rem 2.8rem;
}
.vx>.title{
    font-size:0.28rem;
    color:#999;
    background:none!important;
    text-align: center;
    margin-bottom:0.2rem;
}
.vx>img{
    width:0.8rem;
    display:block;
    margin:0 auto;
}
.dianzi{
  height:0.7rem;
  width:100%;
  background:white;
}
</style>
