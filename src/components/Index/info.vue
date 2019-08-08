<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
        <div class="box">EMS邮寄信息</div>
        <div class="smtitle">
            <div class="l">提示:</div>
            <div class="r">为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息</div>
        </div>
        <div class="item">
            <div class="title">姓名</div>
            <input type="text" placeholder="输入收件人姓名" @blur.prevent="changeName()">
        </div>
        <div class="item">
            <div class="title">联系电话</div>
            <input type="text" placeholder="输入收件人手机号" @blur.prevent="changePhone()">
        </div>
        <div class="item">
            <div class="title">收件地址</div>
            <div class="select">
                <select>
                    <option>河北省</option>
                    <option>山东省</option>
                    <option>山西省</option>
                    <option>河南省</option>
                    <option>四川省</option>
                </select>
                <select>
                    <option>保定市</option>
                    <option>石家庄市</option>
                    <option>邯郸市</option>
                </select>
                <select>
                    <option>石桥区</option>
                    <option>铁桥区</option>
                </select>
            </div>
        </div>
        <div class="item">
            <div class="title">详细地址</div>
            <input type="text" placeholder="输入详细地址" @blur.prevent="changeDizhi()">
        </div>
        <div class="tishi" v-show="show">
            <img src="../../img/i.png">
            <div>{{text}}</div>
        </div>
        <button class="btn" @click="jump">下一步</button>
  </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            text:''
        }
    },
    methods:{
        jump(){
            this.$router.push({
                path:"/order",
                params:{
                    sheng_val:this.$refs.sheng.value
                }
            })
        },
        changeName(e){
        var u = event.currentTarget.value;
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
            if(reg.test(u)){
            this.show=false;
            }if(!reg.test(u)){
                this.show=true;
                this.text="请输入正确的收件人姓名"
                return;
            }
        },
        changePhone(e){
            var u = event.currentTarget.value;
            var reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
                if(reg.test(u)){
                this.show=false;
                }if(!reg.test(u)){
                    this.show=true;
                    this.text="请输入正确的手机号"
                    return;
                }
        },
        changeDizhi(e){
            var u = event.currentTarget.value;
                if(u==""){
                    this.show=true;
                    this.text="请输入详细地址"
                    return;
                }else{
                    this.show=false;
                }
        },
        changeBianhao(e){
            var u = event.currentTarget.value;
            if(u==""){
                    this.show=true;
                    this.text="请输入详细地址"
                    return;
                }else{
                    this.show=false;
                }
        },

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
    height:7vh;
    line-height: 7vh;
}
.box{
    width:7.5rem;
    height:7vh;
    font-size: 0.28rem;
    color:#fff;
    line-height: 7vh;
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
    top:2.5vh;
    right:0.4rem;
}
.smtitle{
    font-size:0.28rem;
    display: flex;
    padding:0.6rem 0.3rem 0.4rem;
    width:6.9rem;
    color:#666;
}
.l{
    width:0.7rem;
}
.r{
    width:6.2rem;
}
.item{
    margin:0 0.3rem 0.3rem;
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
.item>.select{
    width:4.6rem;
    display: flex;
    justify-content: space-between;
}
.select>select{
    background:#f2f2f2;
    border-radius: 5px;
    border:0;
    outline: none;
    color:#666;
    width:1.3rem;
    height:0.8rem;
    padding-left:0.2rem;
}
.tishi{
    font-size:0.28rem;
    color:#f00;
    display: flex;
    align-items: center;
    padding-left:0.3rem;
}
.tishi>img{
    width:0.4rem;
    margin-right: 0.1rem;
}

.box1{
  width:5.2rem;
  height:3rem;
  background:#f2f2f2;
  margin:0 1.25rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
}
.img{
  display: block;
  height:100%;
  position:absolute;
  z-index:2;
}
.box1>div{
  font-size:0.28rem;
  position: absolute;
  z-index:1;
}
.box1-title{
  height:1rem;
  display: flex;
  align-items: center;
  padding:0 0.6rem;
  font-size:0.28rem;
  color:#333;
}
.box1-title>img{
  width:0.4rem;
  margin-right: 0.1rem;
}
.myinput{
  display:none;
}
.btn{
    width:6rem;
    height:1rem;
    margin:0.1rem 0.75rem 0;
    border-radius: 5px;
    background:#177abf;
    color:#fff;
    font-size:0.32rem;
    font-weight: bold;
    text-align: center;
    line-height: 1rem;
    outline: none;
}
.item .title{
    color:#333!important;
}
</style>
