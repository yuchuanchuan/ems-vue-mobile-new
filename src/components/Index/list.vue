<template>
  <div>
    <div class="content">
        <div class="title">不动产登记便民邮寄</div>
        <div class="box">查询列表<div class="sj"></div></div>
        <div class="box1">
            <div class='item'>
                <router-link to="/query">查询进度</router-link>
                <div>订单号: 10216359874</div>
                <div>下单时间: 2019-5-11 15:59</div>
                <div>当前状态:提交申请</div>
            </div>
            <div class='item'>
                    <router-link to="/query">查询进度</router-link>
                    <div>订单号: 10216359874</div>
                    <div>下单时间: 2019-5-11 15:59</div>
                    <div>当前状态:提交申请</div>
                </div>
                <div class='item'>
                        <router-link to="/query">查询进度</router-link>
                        <div>订单号: 10216359874</div>
                        <div>下单时间: 2019-5-11 15:59</div>
                        <div>当前状态:提交申请</div>
                    </div>
                    <div class='item'>
                            <router-link to="/query">查询进度</router-link>
                            <div>订单号: 10216359874</div>
                            <div>下单时间: 2019-5-11 15:59</div>
                            <div>当前状态:提交申请</div>
                        </div>
                        <div class='item'>
                                <router-link to="/query">查询进度</router-link>
                                <div>订单号: 10216359874</div>
                                <div>下单时间: 2019-5-11 15:59</div>
                                <div>当前状态:提交申请</div>
                            </div>
        </div>
        <div class="tab">
            <button class="btn" @click="jump">返回首页</button>
            <div class="tabs">
                <div class="title">方便快捷 轻松办理</div>
                <img src="../../img/kdy.png">
            </div>
        </div>
    </div>
  </div> 
</template>
<script>
export default {
data(){
    return{
        
    }
    },
methods:{
    jump(){
        this.$router.push('./flow')
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
    height:7vh;
    line-height: 7vh;
}
.box{
    width:7.5rem;
    height:7vh;
    color:#fff;
    font-size: 0.28rem;
    line-height:7vh;
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
    top:2.7vh;
    right:0.4rem;
}
.box1{
    padding:0.2rem 0.3rem 0;
    height:66vh;
    overflow: auto;
    box-sizing: border-box;
    width:7.5rem;
    margin-bottom:1vh;
}
.item{
    width:6.9rem;
    border:1px solid #ccc;
    border-radius: 5px;
    margin-bottom:0.2rem;
    box-sizing: border-box;
    padding:0 0.3rem;
    font-size: 0.28rem;
    color:#666;
    height:2.7rem;
    position:relative;
}
.item>div{
    box-sizing: border-box;
    height:0.9rem;
    line-height: 0.9rem;
    border-bottom:1px solid #e7e5de;
}
.item>div:last-child{
    border:none;
}
.item>a{
    height:0.9rem;
    line-height: 0.9rem;
    bottom:0;
    font-weight: bold;
    right:0.3rem;
    position:absolute;
    text-decoration: none;
    color:#177abf;
}
.tab{
    height:19vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.tab>.btn{
    height:7vh;
    width:5.6rem;
    color:#fff; 
    font-size: 0.32rem;
    background:#177abf;
    border-radius: 5px;
    border:0;
    outline: none;
    margin:0 0.95rem;
}
.tabs{
    height:7vh;
    position:relative;
    background:#383735;
}
.tabs>div{
    height:7vh;
    font-weight: bold;
    color:#fff;
    line-height: 7vh;
    display: inline-block;
    position:absolute;
    top:0;
    left:1rem;
    font-size:0.32rem;
}
.tabs>img{
    position:absolute;
    bottom:0.1rem;
    width:2rem;
    right:0.3rem;
}
</style>