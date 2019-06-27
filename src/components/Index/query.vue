<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">进度查询<div class="sj"></div></div>
    <div class="box1">
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/tj.png">
                </div>
                <div class="right">提交申请</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/zf.png">
                </div>
                <div class="right">费用支付</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/cg.png">
                </div>
                <div class="right">申请提交成功</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/zz.png">
                </div>
                <div class="right">制证中</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/ys.png">
                </div>
                <div class="right">已揽收</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/ys.png">
                </div>
                <div class="right">EMS运输中</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/ys.png">
                </div>
                <div class="right">正在派件</div>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item">
            <div class="top">
                <div class="left">2019年6月4日</div>
                <div class="middle">
                    <img src="../../img/ok.png">
                </div>
                <div class="right">天津市华苑产业园区海泰信息广场B座903室</div>
            </div>
            <div class="bottom"></div>
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
    height:65vh;
    overflow: auto;
    box-sizing: border-box;
    padding:0.7rem 0 0.7rem;
    width:7.5rem;
}
.box1::-webkit-scrollbar{
    display: none;
}
.item{
    font-size:0.28rem;
    color:#333;   
    position:relative;
    height:1.5rem;
}
.top{
    left:0;
    top:0;
    width:7.5rem;
    display: flex;
    position: absolute;
}
.left{
    font-weight: bold;
    padding-right:0.4rem;
    height:0.7rem;
    line-height: 0.7rem;
    text-align: right;
    width:3.4rem;
}
.middle{
    width:0.7rem;
    height:0.7rem;
    border-radius: 50%;
    background:#eaf1f5;
    display: flex;
    justify-content: center;
    align-items: center;
}
.middle>img{
    display: block;
    width:0.4rem;
    height:0.4rem;
}
.right{
    font-weight: bold;
    padding:0.1rem 0.4rem;
    width:3rem;
    line-height: 0.5rem;
    text-align: left;
}
.bottom{
    top:0.7rem;
    position:absolute;
    left:0;
    height:0.8rem;
    width:3.75rem;
    box-sizing: border-box;
    border-right:1px dashed #070002;
}
.item:last-child .bottom{
    border:0;
}
.tab{
    height:21vh;
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