<template>
	<div>
		<div class="title">查询列表
			<div class='sanjiao'></div>
		</div>

		<ul class='info_list'>
			<li class='info' v-for="(item, index) in orderList" :key="index">
        <!--<a @click.prevent="queryInfo(item.orderNumber)" v-if="item.status != '未支付' && item.status != '已取消'">查询进度</a>-->
				<div class='num'>订单号：{{item.orderNumber}}</div>
				<div class='timer'>下单时间：{{item.createOrderDate}}</div>
				<div class='status'>
					<p>
            当前状态：{{item.status ===1 ? '未支付' : item.status ===2 ? '待发货' : item.status === 3 ? '待收货' : item.status === 4 ? '已收货' : item.status === 5 ? '已取消' : '' }}
            <span v-if="item.status ===1">(剩余{{item.djs}}）</span>
          </p>
					<button v-if="item.status === 1" @click="wechatPay(item.orderNumber)">去支付</button>
          <button v-if="item.status === 2"@click="quxiao(item.orderNumber)">去取消</button>
          <button v-if="item.status !== 1 && item.status !== 2" @click="queryInfo(item.orderNumber)">进度查询</button>
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

		<div class='bottom' @click="jump">
			<button>返回首页</button>
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
  var t = null;
export default {
  data () {
    return {
      orderList: [],
	  tanchuang_status:false,
      tempOrderNum: '',
      orderNum: ''
    }
  },
  mounted(){
    t = setInterval( ()=> {
     if(this.orderList && this.orderList.length > 0){
       var dd, hh, mm, ss = null
       for (var key in this.orderList) {
         // var aaa = new Date(this.orderList[key]["createOrderTime"]).getTime();
         let startTime = new Date().getTime()
         let endTime = new Date(this.orderList[key]["createOrderTime"]).getTime() + 1800000
         let rightTime = endTime - startTime;
         if (rightTime >= 0) {
           mm = Math.floor((rightTime / 1000 / 60) % 60);
           ss = Math.floor((rightTime / 1000) % 60);
           if( mm.toString().length === 1){
             mm = "0" + mm
           }
           if(ss.toString().length === 1){
             ss = "0" + ss
           }
           this.orderList[key]["djs"] = "00:" + mm + ":" + ss;
         }
         // else{
         //   alert("退款-----99999")
         //   if(this.orderList[key]["status"] === 1){
         //     alert(this.orderList[key]["status"] + this.orderList[key]["orderNumber"])
         //     this.fundPay(this.orderList[key]["orderNumber"])
         //     // 执行更新操作， 取消订单，，，进行退款操作
         //   }
         // }
       }
     }
    }, 1000);

    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  },
  methods:{
    // 退款
    fundPay(orderNum){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/cancelOrder'),
        method: 'get',
        params: this.$http.adornParams({
          'orderNum': orderNum
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.updateCancelStatus(orderNum)
        } else {
          alert(data.msg)
        }
      })
    },
    updateCancelStatus(orderNum){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/updateCancelStatus'),
        method: 'get',
        params: this.$http.adornParams({
          'orderNum': orderNum
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          alert("订单取消成功");
        } else {
          alert(data.msg)
        }
      })
    },
    queryInfo(orderNum){
      this.$router.push({ name: 'query', params:{'orderNum': orderNum} })
    },
    jump(){
      console.log("跳转")
      this.$router.push({name: 'flow'})
    },
    InitTime(endtime){
      endtime = new Date(endtime).getTime() + 1800000
      var mm, ss = null
      var str = "";
      var time =  endtime - new Date().getTime();
      if(time >= 0){
        mm = Math.floor((time / 1000 / 60) % 60);
        ss = Math.floor(time / 1000 % 60);
        if( mm.toString().length === 1){
          mm = "0" + mm
        }
        if(ss.toString().length === 1){
          ss = "0" + ss
        }
        str = "00:" + mm+":"+ss;
        return str;
      }else{
        return "00:00:00"
      }
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

          data.data.map( (obj,index)=>{
            this.$set(
              obj,"djs",this.InitTime(new Date(obj.createOrderTime).getTime())
            );
          })

          // data.data.forEach((item) => {
          //   item.createOrderTime = item.createOrderDate
          // })

          this.orderList = data.data

          // console.log(this.orderList[0].djs)

        } else {
          alert(data.msg)
        }
      })
    },
    quxiao(orderNum){
      this.tempOrderNum = orderNum
      this.tanchuang_status = true
    },
    no(){
      this.tanchuang_status = false
    },
    yes(){
      this.fundPay(this.tempOrderNum)
      this.tanchuang_status = false
    },

    // 支付
    wechatPay(orderId){
      this.orderNum = orderId
      this.$http({
        url: this.$http.adornUrl('/pay/create'),
        method: 'get',
        params: this.$http.adornParams({
          'orderId': orderId,
          'returnUrl': 'http://ems.jujinkeji.net/mobile/list'
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
            if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false);
            }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data));
              document.attachEvent('onWeixinJSBridgeReady',this.onBridgeReady(data));
            }
          }else{
            this.onBridgeReady(data);
          }
        } else {
          alert(data.msg)
        }
      })
    },
    onBridgeReady:function(data){
      let _this = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": data.data.payResponse.appId,     //公众号名称，由商户传入
          "timeStamp": data.data.payResponse.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": data.data.payResponse.nonceStr, //随机串
          "package": data.data.payResponse.package,
          "signType": data.data.payResponse.signType,         //微信签名方式：
          "paySign": data.data.payResponse.paySign //微信签名
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
            setTimeout(()=>{
              _this.updateOrderStatus()
            },500)
          }
          //location.href = "${returnUrl}";
        }
      );
    },
    updateOrderStatus(){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/mail'),
        method: 'post',
        data: this.$http.adornData({
          orderNumber: this.orderNum
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // window.location.assign('http://ems.jujinkeji.net/mobile/submit')
          this.$router.push({ name: 'submit', params:{'orderNum': this.orderNum} })
          // this.getUserOrderList()
        } else {
          alert(data.msg)
        }
      })
    },
  },
  created(){
    this.getUserOrderList()
  },
  destroyed(){
    clearInterval(t)
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
