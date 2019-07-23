<template>
	<div>
		<div class="title">查询列表
			<div class='sanjiao'></div>
		</div>

		<ul class='info_list'>
			<li class='info' v-for="(item, index) in orderList" :key="index">
        <a @click.prevent="queryInfo(item.orderNumber)" v-if="item.status != '未支付' && item.status != '已取消'">查询进度</a>
				<div class='num'>订单号：{{item.orderNumber}}</div>
				<div class='timer'>下单时间：{{item.createOrderTime}}</div>
				<div class='status'>
					<p>当前状态：{{item.status}} <span>(剩余{{daojishi}}）</span></p>
					<button v-if="item.status == '未支付'">去支付</button>
          <button v-if="item.status == '已取消'">已取消</button>
          <button v-if="item.status == '已取消'">已取消</button>
				</div>
			</li>

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：取消 <span></span></p>-->
					<!--<p class='quxiao'>已取消</p>-->
				<!--</div>-->
			<!--</li>-->

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：已支付 <span></span></p>-->
					<!--<p @click="quxiao()">取消</p>-->
				<!--</div>-->
			<!--</li>-->

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：制证中 <span></span></p>-->
					<!--<p>查询进度</p>-->
				<!--</div>-->
			<!--</li>-->

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：待发货 <span></span></p>-->
					<!--<p>查询进度</p>-->
				<!--</div>-->
			<!--</li>-->

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：已揽收 <span></span></p>-->
					<!--<p>查询进度</p>-->
				<!--</div>-->
			<!--</li>-->

			<!--<li class='info'>-->
				<!--<div class='num'>订单号：10216359874</div>-->
				<!--<div class='timer'>下单时间：2019-5-11 15:59</div>-->
				<!--<div class='status'>-->
					<!--<p>当前状态：EMS运输中 <span></span></p>-->
					<!--<p>查询进度</p>-->
				<!--</div>-->
			<!--</li>-->
		</ul>

		<div class='bottom'>
			<button @click="jump">返回首页</button>
			<img src="../../img/bottom.png" ></img>
		</div>

		<div class='fuceng' v-if="tanchuang_status">
			<div class='quxiao_tanchuang'>
				<div class='quxiao_tip'>确定要取消订单吗？</div>
				<div class='quxiao_btn'>
					<div class='no' @click="no">取消</div>
					<div class='yes' @click="yes">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import { dateToMinute } from '../../utils/validate'
export default {
  data () {
    return {
      orderList: [],
	  tanchuang_status:false,
	  timer:'00:28:39'
    }
  },
  mounted(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    var timer = this.timer.split(":")
    var shi = parseInt(timer[0])
    var fen = parseInt(timer[1])
    var miao = parseInt(timer[2])
    var new_timer
    var daoshu = setInterval(function(){
	new_timer = []
	if(shi>=0 && fen>= 0 && miao>=0){
		if(miao>0){
			if(shi==0&&fen==0&&miao==0){
    			clearInterval(daoshu)
    			alert("时间结束")
    			return
    		}
    		miao = miao-1

    		miao = String(miao)
    		fen = String(fen)
    		shi = String(shi)
    		if(miao.length == 1){
    			miao = "0"+miao
    		}
    		if(fen.length ==1){
    			fen = "0"+fen 
    		}
    		if(shi.length ==1){
    			shi = "0"+shi 
    		}
    	}else{
    		if(shi==0&&fen==0&&miao==0){
    			clearInterval(daoshu)
    			alert("时间结束")
    			return
    		}
    		miao = 59
    		fen = fen - 1
    		miao = miao-1
    		miao = String(miao)
    		fen = String(fen)
    		shi = String(shi)
    		if(miao.length == 1){
    			miao = "0"+miao
    		}
    		if(fen.length ==1){
    			fen = "0"+fen 
    		}
    		if(shi.length ==1){
    			shi = "0"+shi 
    		}
    		if(shi>=0&&fen>=0&&miao>=0){
    			clearInterval(daoshu)
    			return
    		}
		}
    	new_timer.push(shi,fen,miao)
    	this.timer = new_timer.join(":")
    	console.log(this.timer)
	}
},1000)
  },
  methods:{
    queryInfo(orderNum){
      this.$router.push({ name: 'query', params:{'orderNum': orderNum} })
    },
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
            } else if(item.status === 5){
              item.status = '已取消 '
            }
          })
          this.orderList = data.data
        } else {
          alert(data.msg)
        }
      })
    },
  },
  created(){
    this.getUserOrderList()
  },
  methods:{
	  quxiao(){
		  this.tanchuang_status = true
		  console.log(this)
	  },
	  no(){
		  this.tanchuang_status = false
	  },
	  yes(){
		  this.tanchuang_status = false
	  }
  }
}
</script>
<style scoped>
	.quxiao_btn{
		font-size: 0.36rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.quxiao_btn>div{
		width:50%;
		height:98%;
		text-align: center;
		line-height: 0.88rem;
	}
	.yes{
		border-left: 1px solid #dedede;
		color:#09bb07;
	}
	.quxiao_tip{
		height: 1.6rem;
		width:100%;
		border-bottom: 1px solid #dedede;
		font-size: 0.36rem;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.fuceng{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		background:rgba(0,0,0,.5);
	}
	.quxiao_tanchuang{
		width:5.4rem;
		height:2.5rem;
		background:white;
		border-radius: 0.15rem;
		position:absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin:auto;
	}
	.bottom{
		width:100%;
		height:2.5rem;
		position:relative;

	}
	.bottom button{
		width:5.95rem;
		height:1rem;
		background: #177abf;
		color:white;
		border-radius: 0.15rem;
		outline: none;
		border:none;
		position:absolute;
		top:0;
		padding:0;
		left:0;
		right:0;
		bottom:1;
		margin:auto;
	}
	.bottom img{
		width:100%;
		height:2.35rem;
		position:absolute;
		bottom:0;
		left:0;
		z-index: 5;
	}
	.status p:nth-child(2){
		font-size: 0.32rem;
		color:#177abf;
	}
	.quxiao{
		color:#999 !important;
	}
	.status button{
		background: #177abf;
		color:white;
		border-radius: 0.2rem;
		border:none;
		outline: none;
		font-size: 0.32rem;
		padding:0.02rem 0.2rem;
	}
	.status{
		justify-content: space-between !important;
	}
	.status span{
		font-size: 0.24rem;
	}
	.info>div{
		height:33.33%;
		width:92%;
		margin:0 4%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.timer{
		border-top: 1px solid #dedede;
		border-bottom: 1px solid #dedede;
	}
	.info{
		height: 2.8rem;
		margin-top: 0.2rem;
		width:100%;
		border:1px solid #666666;
		border-radius: 0.2rem;
		background: #f2f2f2;
		font-size: 0.32rem;
	}
	.info_list{
		width:6.9rem;
		list-style: none;
		padding:0!important;
		margin:0 !important;
		margin-left: 0.3rem !important;
		margin-bottom: 0.5rem !important;

	}
	.title{
		width:100%;
		height:0.75rem;
		background:#177abf;
		color:white;
		font-size: 0.32rem;
		font-weight: bold;
		position: relative;
		text-align: center;
		line-height:0.75rem;
	}
	.sanjiao{
		position:absolute;
		right: 0.4rem;
		top:0.3rem;
		width:1px;
		height:1px;
		border-top: 0.15rem solid white;
		border-bottom: 0.15rem solid transparent;
		border-right: 0.15rem solid transparent;
		border-left: 0.15rem solid transparent;
	}
</style>
