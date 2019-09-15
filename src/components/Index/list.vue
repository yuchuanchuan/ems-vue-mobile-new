<template>
	<div>
		<div class="title">
      <!--<div class="tui" @click="tui()"></div>-->
      查询列表</div>

		<ul class='info_list'>
			<li class='info' v-for="(item, index) in orderList" :key="index">
        <!--<a @click.prevent="queryInfo(item.orderNumber)" v-if="item.status != '未支付' && item.status != '已取消'">查询进度</a>-->
				<div class='num'>订单号：{{item.orderNumber}}</div>
				<div class='timer'>下单时间：{{item.createOrderDate}}</div>
				<div class='status'>
					<p>
            当前状态：{{item.status ===1 ? '未支付' : item.status ===2 ? '已支付' : item.status === 3 ? '待收货' : item.status === 4 ? '已收货' : item.status === 5 ? '已取消' : item.status === 6 ? '受理中' : item.status === 7 ? '审核中' : item.status === 8 ? '制证中' : item.status === 9 ? '发证中' : '' }}
            <span v-if="item.status ===1">(剩余{{item.djs}}）</span>
            <span v-if="item.status ===2 && item.showCancelBtn">(剩余{{item.djs1}}）</span>
          </p>
				</div>
				<div class='btn_list'>
					<button v-if="item.status === 1" @click="wechatPay(item.orderNumber)" :class='item.status === 1?"btn_bluc":""'>付款</button>
					<button v-if="item.status === 1 || (item.status === 2 && item.showCancelBtn)" @click="quxiao(item.orderNumber, item.status)">取消订单</button>

          <!-------------------------------------新添加的进度查询--------------------------------------------------------->
          <button @click="jinduchaxun(item.orderNumber,item.status)" v-if="item.status !== 1">进度查询</button>


          <button @click="queryInfo(item.orderNumber,item.status)">订单详情</button>
				</div>
			</li>
      <div class='dianzi'></div>

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
			<img src="../../img/chaxundingdan.png" ></img>
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
  var t1 = null;
export default {
  data () {
    return {
      showCanceldjs: false,
      orderList: [],
	    tanchuang_status:false,
      tempOrderNum: '',
      tempOrderStatus: '',
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
         // let endTime = new Date(this.orderList[key]["createOrderTime"]).getTime() + 1800000
         let endTime = this.orderList[key]["createTimestamp"] + 1800000
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
         }else{
           // 自动取消订单，无退款
           if(this.orderList[key]["status"] === 1){
             this.updateCancelStatus(this.orderList[key]["orderNumber"], 0)
           }

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

    t1 = setInterval( ()=> {
      if(this.orderList && this.orderList.length > 0){
        var dd, hh, mm, ss = null
        for (var key in this.orderList) {
          if(this.orderList[key]["status"] === 2){
            let startTime = new Date().getTime()
            let endTime = new Date(new Date(new Date().getTime() - 60*60*1000).setHours(0,0,0,0)).getTime() + 86400000
            let rightTime = endTime - startTime;
            if (rightTime >= 0) {
              hh = Math.floor(rightTime / 1000 / 60 / 60 % 24);
              mm = Math.floor((rightTime / 1000 / 60) % 60);
              ss = Math.floor((rightTime / 1000) % 60);
              if( hh.toString().length === 1){
                hh = "0" + hh
              }
              if( mm.toString().length === 1){
                mm = "0" + mm
              }
              if(ss.toString().length === 1){
                ss = "0" + ss
              }
              this.orderList[key]["djs1"] = hh + ":" + mm + ":" + ss;
              // this.showCanceldjs = true
              if(new Date(this.orderList[key]["createTimestamp"]).toDateString() === new Date().toDateString()){
                this.orderList[key]["showCancelBtn"] = true
              }else{
                this.orderList[key]["showCancelBtn"] = false
              }
            }else{
              this.orderList[key]["showCancelBtn"] = false

              // this.showCanceldjs = false
              // 已支付，且不能取消订单操作
              // if(this.orderList[key]["status"] === 2){
              //   this.updateCancelStatus(this.orderList[key]["orderNumber"])
              // }
            }
         }
        }
      }
    }, 1000);


    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  },
  methods:{

    tui(){
      this.$router.go(-1);
    },

    //添加的进度查询
    jinduchaxun(orderNum,status){
      this.$router.push({ name: 'query', params:{'orderNum': orderNum} })
    },

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
          this.updateCancelStatus(orderNum,1)
        } else {
          alert(data.msg)
        }
      })
    },
    updateCancelStatus(orderNum, flag){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/updateCancelStatus'),
        method: 'get',
        params: this.$http.adornParams({
          'orderNum': orderNum
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.getUserOrderList()
          if(flag === 1){
            this.$nextTick(()=>{
              alert("订单取消成功");
            })
          }
        } else {
          alert(data.msg)
        }
      })
    },
    queryInfo(orderNum,status){
			// {{item.status ===1 ? '未支付'
			//  : item.status ===2 ? '待发货'
			//  : item.status === 3 ? '待收货'
			//  : item.status === 4 ? '已收货'
			//  : item.status === 5 ? '已取消'
			//  : item.status === 6 ? '受理中'
			//  : item.status === 7 ? '审核中'
			//  : item.status === 8 ? '制证中'
			//  : item.status === 9 ? '发证中'
			//  : '' }}
      console.log(status)

      this.$router.push({ name: 'detail', params:{'orderNum': orderNum} })
			//当前下单时间过了今晚12点后就无法取消改订单
			//如果是未支付或者已取消已支付并且没超过剩余时间的跳转到新页面
			// if(status == 1||status==5 || status == 2){
			// 	this.$router.push({ name: 'detail', params:{'orderNum': orderNum} })
			// }else{
			// 	this.$router.push({ name: 'query', params:{'orderNum': orderNum} })
			// }
    },
    jump(){
      this.$router.push({path: `/flow/${localStorage.getItem('openid')}/${localStorage.getItem('areaid')}`})
    },
    InitTime(endtime){
      endtime = endtime + 1800000
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
    cancelOrderTime(){
      var endtime = new Date(new Date(new Date().getTime() - 60*60*1000).setHours(0,0,0,0)).getTime() + 86400000
      var hh, mm, ss = null
      var str = "";
      var time =  endtime - new Date().getTime();
      if(time >= 0){
        hh = Math.floor(time / 1000 / 60 / 60 % 24);
        mm = Math.floor((time / 1000 / 60) % 60);
        ss = Math.floor(time / 1000 % 60);
        if( hh.toString().length === 1){
          hh = "0" + hh
        }
        if( mm.toString().length === 1){
          mm = "0" + mm
        }
        if(ss.toString().length === 1){
          ss = "0" + ss
        }
        str = hh + ":" + mm+":"+ss;
        // this.showCanceldjs = true
        return str;
      }else{
        // this.showCanceldjs = false
        return "00:00:00"
      }
    },
    getUserOrderList(){
      this.$http({
        url: this.$http.adornUrl('/mobile/order/userOrderList'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.orderList = []
        if (data && data.code === 0) {
          data.data.map( (obj,index)=>{
            if(obj.status === 1){
              this.$set(
                obj,"djs",this.InitTime(obj.createTimestamp)
              );
            }

            if(obj.status === 2){
              // 创建订单日期为今天，则开启到0点后，不能再次倒计时
              // alert(new Date(obj.createTimestamp).toDateString() + "---------" + new Date().toDateString())
              if(new Date(obj.createTimestamp).toDateString() === new Date().toDateString()){
                this.$set(
                  obj,"djs1",this.cancelOrderTime()
                );
                this.$set(
                  obj,"showCancelBtn", true
                )
              }else{
                this.$set(
                  obj,"djs1","",
                );
                this.$set(
                  obj,"showCancelBtn", false
                )
              }
            }
          })

          this.orderList = data.data
          // console.log(this.orderList[0].djs)

        } else {
          alert(data.msg)
        }
      })
    },
    quxiao(orderNum, status){
      this.tempOrderNum = orderNum
      this.tempOrderStatus = status
      this.tanchuang_status = true
    },
    no(){
      this.tanchuang_status = false
    },
    yes(){
      if(this.tempOrderStatus == 1){
        this.updateCancelStatus(this.tempOrderNum, 1)
      }else{
        this.fundPay(this.tempOrderNum)
      }
      this.tanchuang_status = false
    },

    // 支付
    wechatPay(orderId){
      this.orderNum = orderId
      this.$http({
        url: this.$http.adornUrl('/pay/prepayOrder'),
        method: 'get',
        params: this.$http.adornParams({
          'orderId': orderId
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
          "appId": data.data.appId,     //公众号名称，由商户传入
          "timeStamp": data.data.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": data.data.nonceStr, //随机串
          "package": data.data.package,
          "signType": data.data.signType,         //微信签名方式：
          "paySign": data.data.paySign //微信签名
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
      this.$router.push({ name: 'submit', params:{'orderNum': this.orderNum} })
      // this.$http({
      //   url: this.$http.adornUrl('/mobile/order/mail'),
      //   method: 'post',
      //   data: this.$http.adornData({
      //     orderNumber: this.orderNum
      //   })
      // }).then(({ data }) => {
      //   if (data && data.code === 0) {
      //     // window.location.assign('http://ems.jujinkeji.net/mobile/submit')
      //     this.$router.push({ name: 'submit', params:{'orderNum': this.orderNum} })
      //     // this.getUserOrderList()
      //   } else {
      //     alert(data.msg)
      //   }
      // })
    },
  },
  created(){
    // alert('获取页面访问路径')
    // alert(window.location.href)
    // alert('零点时间戳===' + new Date(new Date(new Date().getTime() - 60*60*1000).setHours(0,0,0,0)).getTime())
    // alert('openid---------' + localStorage.getItem("openid"))
    this.getUserOrderList()
  },
  destroyed(){
    clearInterval(t)
    clearInterval(t1)
  }
}
</script>
<style scoped>
.dianzi{
  width:100%;
  height:2.5rem;
}
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
		position:fixed;
    bottom:0;
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
		height:1.44rem;
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
		height:25%;
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
		height: 3.5rem;
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
	.btn_list{
		border-top: 1px solid #dedede;
		display: flex;
		justify-content: flex-end!important;
		align-items: center!important;
	}
	.btn_list button{
		padding:0.1rem 0.25rem;
		border:1px solid #afafaf;
		background: none;
		border-radius: 0.4rem;
		font-size: 0.24rem;
		color:#177abf;
		margin-left: 0.3rem;
		outline: none;
	}
	.btn_bluc{
		background:#177abf!important;
		color:white!important;
	}
  .tui{
  position: absolute;
  top:0.25rem;
  left:0.3rem;
  width:0.3rem;
  height:0.3rem;
  background:url("../../img/zuo.png");
  background-size:0.3rem 0.3rem;
  background-repeat: no-repeat;
}
</style>
