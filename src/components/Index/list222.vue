<template>
  <div>
    <div class="content">
        <div class="title">不动产登记便民邮寄111</div>
        <div class="box">查询列表<div class="sj"></div></div>
        <div class="box1">
            <div class='item' v-for="(item, index) in orderList" :key="index">
                <a @click.prevent="queryInfo(item.orderNumber)">查询进度</a>
                <div>订单号: {{item.orderNumber}}</div>
                <div>下单时间: {{item.createOrderTime}}</div>
                <div>当前状态:{{item.status}}</div>
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
      orderList: []
    }
  },
  methods:{
    jump(){
      this.$router.push({name: 'flow'})
    },
    getUserOrderList(){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/userOrderList'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.orderList = []
          data.data.forEach((item) => {
            item.createOrderTime = item.createOrderDate
            if(item.status === 1){
              item.status = '未支付 '
            }else if(item.status === 2){
              item.status = '待发货 '
            }else if(item.status === 3){
              item.status = '待收货 '
            } else if(item.status === 4){
              item.status = '已收货 '
            }
          })
          this.orderList = data.data
        } else {
          alert(data.msg)
        }
      })
    },
    queryInfo(orderNum){
      this.$router.push({ name: 'query', params:{'orderNum': orderNum} })
    }
  },
  created(){
    this.getUserOrderList()
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
