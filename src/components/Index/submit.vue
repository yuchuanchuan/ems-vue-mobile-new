<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">发送申请<div class="sj"></div></div>
    <img src="../../img/dui.png" class="dui">
    <div class="btitle">提交成功</div>
    <div class="stitle">您的订单已经提交成功,我们会尽快检验您的信息,请耐心等待。</div>
    <div class="atitle">您的订单已经提交成功,我们会尽快为您邮寄,请密切关注短信及电话通知</div>
    <button class="btn" @click="jump3">再来一单</button>
    <button class="btn" @click="jump2">查看订单</button>
    <button class="btn" @click="jump1">返回首页</button>
    <div class="text">在办理过程中,遇到问题,请及时与我们联系!</div>
    <div class="text">客服电话:022-84190111</div>
    <div class="text">服务时间:周一至周五 8:30-17:00</div>
    <div class="tab">
      <div class="title">方便快捷 轻松办理</div>
      <img src="../../img/kdy.png">
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
          orderNum: ''
        }
    },
    methods:{
      jump3(){
        this.$router.push({name:"orderInfo"})
      },
      jump1(){
        this.$router.push({name: 'flow'})
      },
      jump2(){
        // this.$router.push({ name: 'query', params:{'orderNum': this.orderNum} })
        this.$router.push("/list")
      }
    },
  created(){
      this.orderNum = this.$route.params.orderNum
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
.dui{
  width:2rem;
  display: block;
  margin:0.4rem auto 0;
}
.btitle{
  font-size: 0.4rem;
  color:#333;
  font-weight: bold;
  text-align: center;
  height:1rem;
  line-height: 1rem;
}
.stitle{
  color:#333;
  line-height: 0.4rem;
  width:4rem;
  margin:0 auto;
  font-size:0.28rem;
  text-align: center;
}
.atitle{
  color:#177abf;
  width:5.8rem;
  margin:0.5rem 0.85rem;
  line-height:0.6rem;
  text-align: center;
  font-size:0.32rem;
  font-weight: bold;
}
.btn{
  color:#fff;
  background:#177abf;
  font-size: 0.32rem;
  width:4rem;
  height:0.6rem;
  margin:0 1.75rem 0.4rem;
  display: block;
  border-radius: 10px;
  outline: none;
  border:0;
  font-weight: bold;
}
.text{
  font-size:0.28rem;
  text-align: center;
  color:#333;
  margin-bottom:0.15rem;
  font-weight: bold;
}
.tab{
  font-size:0.36rem;
  font-weight: bold;
  color:#fff;
  height:1rem;
  margin-top:0.7rem;
  background:#177abf;
  bottom:0;
  left:0;
  width:100%;
  position:fixed;
}
.tab>div{
  height:1rem;
  line-height: 1rem;
  display: inline-block;
  position:absolute;
  width:45%;
  top:0;
  left:1rem;
}
.tab>img{
  position:absolute;
  bottom:0.1rem;
  right:0.3rem;
  width:2rem;
  z-index:333;
}
</style>
