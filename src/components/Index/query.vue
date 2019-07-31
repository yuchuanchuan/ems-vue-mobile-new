<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">进度查询<div class="sj"></div></div>
    <div class="box1">
        <div class="item" v-for="(item,index) in orderList" :key="index">
            <div class="top">
                <div class="left" style="background:none;border:none;">{{item.emsDate}}</div>
                <div class="middle">
                    <img :src="item.imgSrc">
                </div>
                <div class="right">{{item.emsMessage}}</div>
            </div>
            <div class="bottom"></div>
        </div>
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems2.png">-->
                <!--</div>-->
                <!--<div class="right">费用支付</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems3.png">-->
                <!--</div>-->
                <!--<div class="right">申请提交成功</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems4.png">-->
                <!--</div>-->
                <!--<div class="right">业务受理中</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems5.png">-->
                <!--</div>-->
                <!--<div class="right">已揽收</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems6.png">-->
                <!--</div>-->
                <!--<div class="right">EMS运输中</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems7.png">-->
                <!--</div>-->
                <!--<div class="right">正在派件</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
        <!--<div class="item">-->
            <!--<div class="top">-->
                <!--<div class="left">2019年6月4日</div>-->
                <!--<div class="middle">-->
                    <!--<img src="../../img/ems8.png">-->
                <!--</div>-->
                <!--<div class="right">天津市华苑产业园区海泰信息广场B座903室</div>-->
            <!--</div>-->
            <!--<div class="bottom"></div>-->
        <!--</div>-->
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
          orderList:[],
          imgList:[
            {
              src: require('../../assets/img/ems1.png')
            },
            {
              src: require('../../assets/img/ems2.png')
            },
            {
              src: require('../../assets/img/ems3.png')
            },
            {
              src: require('../../assets/img/ems4.png')
            },
            {
              src: require('../../assets/img/ems5.png')
            },
            {
              src: require('../../assets/img/ems6.png')
            },
            {
              src: require('../../assets/img/ems7.png')
            },
            {
              src: require('../../assets/img/ems8.png')
            }
          ]
        }
    },
    methods:{
      jump(){
        this.$router.push({name: 'flow'})
      },
      getOrderInfo(orderNum){
          ///
        this.$http({
          url: this.$http.adornUrl('/mobile/order/getOrderInfo'),
          method: 'get',
          params: this.$http.adornParams({
            'orderNum': orderNum
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.orderList = []
            data.data.forEach((item, index) => {
              this.orderList.push({
                emsDate: item.emsDate,
                emsMessage: item.emsMessage,
                imgSrc: this.imgList[index].src
              })
            })
          } else {
            alert(data.msg)
          }
        })
      }
    },
  created(){
      console.log("接收参数")
    console.log(this.$route.params.orderNum)
    this.getOrderInfo(this.$route.params.orderNum)
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
    box-sizing: border-box;
    padding:0.7rem 0 0.7rem;
    width:7.5rem;
    overflow-y:auto;
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
    position:fixed;
    bottom:0;
    left:0;
    z-index:6666;
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
    background:#177abf;
    width:7.5rem;
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
    right:0.8rem;
    z-index:9999;
}
</style>
