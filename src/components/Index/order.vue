<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">订单支付<div class="sj"></div></div>
    <div class="box1-title">
        <img src="../../img/xin.png">
        <div>邮寄信息</div>
    </div>
    <div class="box1">
        <div class="item">
            <div class="title">姓名</div>
            <div class="info">李海霞</div>
        </div>
        <div class="item">
            <div class="title">联系电话</div>
            <div class="info">18001360553</div>
        </div>
        <div class="item">
            <div class="title">收件地址</div>
            <div class="info">
                <div class="dizhi">天津市花园产业园区海泰信息广场天津市花园产业园区海泰信息广场</div>
            </div>
        </div>
        <div class="item">
            <div class="title">凭证编号</div>
            <div class="info">125423651428674</div>
        </div>
    </div>
    <div class="box1-title">
        <img src="../../img/zhifu.png">
        <div>支付信息</div>
    </div>
    <div class="item">
        <div class="title">邮寄文件类型</div>
        <select>
            <option>房本</option>
            <option>房本</option>
            <option>房本</option>
        </select>
    </div>
    <div class="box2">
        <div class="title">寄达地</div>
        <label>
            <div class="b2-item">
                <div class="top">
                    <div class="top1">
                        <div class="title">天津/外阜 (新疆、西藏除外)</div>
                        <div class="price"><span>￥</span>20</div>
                    </div>
                    <div class="top2">
                        <input type="radio" class="myinput1" name="dizhi"/>
                    </div>
                </div>
                <div class="bottom">500g以内</div>
            </div>
        </label>
        <label>
            <div class="b2-item">
                <div class="top">
                    <div class="top1">
                        <div class="title">天津/外阜 (新疆、西藏除外)</div>
                        <div class="price"><span>￥</span>20</div>
                    </div>
                    <div class="top2">
                        <input type="radio" class="myinput1" name="dizhi"/>
                    </div>
                </div>
                <div class="bottom">500g以内</div>
            </div>
        </label>
    </div>
    <div class="box3">
        <div class="item">
            <div class="title">是否投递保险</div>
            <div class="kg">
                <span class="switch" :class="{on:isShow}" @click="switchDepartment">
                    <div class="switch-circle" :class={right:isShow}></div>
                </span>
            </div>
        </div>
        <div class="item">
            <div class="title">保险费用</div>
            <div class="price"><span>￥</span>5</div>
        </div>
        <div class="item">
            <div class="title">受理地址</div>
            <div class="dz">
                <div>西青区不动产登记事务中心西青区不动产登记事务中心西青区不动产登记事务中心</div>
                <img src="../../img/dz.png">
            </div>
        </div>
    </div>
    <button class="btn" @click="jump">下一步</button>
  </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        switchDepartment:function(){
				this.isShow=!this.isShow;
            },
        jump(){
            this.$router.push("./submit")
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
    color:#333;
}
.item>.info{
    font-size:0.28rem;
    width:4rem;
    border-radius: 5px;
    padding:0 0.3rem;
    height:0.8rem;
    line-height: 0.8rem;
    color:#666;
    background:#f2f2f2;
    border:1px solid #f2f2f2;
}
.dizhi{
    overflow-x: auto;
    white-space: nowrap;
}
.dizhi::-webkit-scrollbar{
    display: none;
}
.item:last-child{
    margin-bottom:0;
}
.item>select{
    width:4.6rem;
    height:0.8rem;
    border:0;
    outline: none;
    background:#f2f2f2;
    border-radius: 5px;
    color:#666;
    padding:0 0.3rem;
}
.box2{
    width:6.9rem;
    box-sizing: border-box;
    margin:0 0.3rem;
    background:#f2f2f2;
    padding:0.3rem;
    border-radius: 5px;
}
.box2>.title{
    font-size:0.32rem;
    color:#333;
    font-weight: bold;
    height:1rem;
    line-height: 1rem;
}
.b2-item{
    height:1rem;
    border-bottom:1px solid #ccc;
    font-size:0.28rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
label:last-child .b2-item{
    border:0;
}
.b2-item>.top{
    color:#666;
    display: flex;
    justify-content: space-between;
}
.top>.top1{
    display: flex;
    justify-content: space-between;
    width:5.8rem;
}
.top1>.price>span{
    font-size:0.18rem;
}
.bottom{
    font-size: 0.24rem;
    color:#999;
}
input[type=radio] {
    display:block;
    width:0.3rem;
    height:0.3rem;
    -webkit-appearance:none;
    border-radius: 50%;
    border:1px solid #dadada;
    background-color: transparent;
    outline: 0 !important;
    line-height: 5vw;}
input[type=radio]:after {
    content:"";
    display:block;
    width:0.3rem;
    height:0.3rem;
    border-radius:50%;
    text-align:center;
    line-height:0.3rem;
    font-size:0.2rem;
    box-sizing:border-box;}
input[type=radio]:checked{border:0;}
input[type=radio]:checked:after {
    content: "L";
    color:#fff;
    transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0);
    -webkit-transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0);
    border-color:2px solid #177abf;
    background-color: #177abf;}
.item>.kg{
    background:#f2f2f2;
    padding-right: 0.4rem;
    width:4.2rem;
    border-radius: 5px;
    height:0.8rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.item>.price{
    font-size:0.28rem;
    color:#333;
    width:4.2rem;
    padding-right: 0.4rem;
    background:#f2f2f2;
    border-radius: 5px;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: right;
}
.item>.price>span{
    font-size: 0.2rem;
    color:#999;
}
.item>.dz{
    font-size:0.28rem;
    color:#999;
    display: flex;
    justify-content: space-between;
    background:#f2f2f2;
    border-radius: 5px;
    padding:0 0.15rem 0 0.4rem;
    width:4.05rem;
    align-items: center;
    height:0.8rem;
}
.dz>img{
    width:0.3rem;
    display: block;
}
.dz>div{
    width:3.65rem;
    overflow-x: auto;
    white-space: nowrap;
}
.dz>div::-webkit-scrollbar{
    display: none;
}
.switch{
    display: inline-block;
    width: 0.7rem;
    height: 0.36rem;
    background: #dbdbdb;
    border-radius: 50px;
    position: relative;
    vertical-align: middle;}
.switch-circle{
    background:#177abf;
    position: absolute;
    left: -0.02rem;
    top: -0.02rem;
    width:0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    }
.on{
   background:#177abf;
  }
.right{
    background:#fff;
    transform :translateX(0.35rem)
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
    margin:0.4rem 0.75rem 0.8rem;
}
</style>
