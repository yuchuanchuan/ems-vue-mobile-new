<template>
  <div>
    <div class="title">不动产登记便民邮寄</div>
    <div class="box"><div class="tui" @click="prev"></div>EMS邮寄信息</div>
		<div class='info info1'>
			<p>订单信息</p>
			<div class='info_detail'>
				<div class="info_left">订单号</div>
				<div class='info_right'>{{dataForm.orderNumber}}</div>
			</div>
			<div class='info_detail'>
				<div class="info_left">下单时间</div>
				<div class='info_right'>{{dataForm.createOrderDate}}</div>
			</div>
			<div class='info_detail'>
				<div class="info_left">当前状态</div>
				<div class='info_right'>{{dataForm.status ===1 ? '未支付' : dataForm.status ===2 ? '已支付' : dataForm.status === 3 ? '待收货' : dataForm.status === 4 ? '已收货' : dataForm.status === 5 ? '已取消' : dataForm.status === 6 ? '受理中' : dataForm.status === 7 ? '审核中' : dataForm.status === 8 ? '制证中' : dataForm.status === 9 ? '发证中' : '' }}</div>
			</div>
		</div>

		<div class='info info2'>
			<p>邮寄信息</p>
			<div class='info_detail'>
				<div class="info_left">收件人</div>
				<div class='info_right'>{{dataForm.name}}</div>
			</div>
			<div class='info_detail'>
				<div class="info_left">联系电话</div>
				<div class='info_right'>{{dataForm.phone}}</div>
			</div>
			<div class='info_detail'>
				<div class="info_left">收件地址</div>
				<div class='info_right'>{{dataForm.postAddress}}</div>
			</div>
			<div class='info_detail'>
				<div class="info_left">凭证编号</div>
				<div class='info_right'>{{dataForm.idCard}}</div>
			</div>
      <div class='info_detail'>
        <div class="info_left">邮寄类型</div>
        <div class='info_right'>{{postText}}</div>
      </div>
			<div class='info_detail'>
				<div class="info_left">邮寄号</div>
				<div class='info_right'>{{dataForm.mailNum}}</div>
			</div>
		</div>

		<div class="info info3">
			<span>产权人信息证明：</span>
			<button @click="show_img">点击查看</button>
		</div>

		<div class='fuceng' v-if="is_show" @click="show_img">
			<img v-image-preview :src="dataForm.ownerPositive">
			<img v-image-preview :src="dataForm.ownerNegative">
			<img v-image-preview :src="dataForm.housingAuthority">
		</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      is_show:false,
      postTypes:[],
      postText: '',
      dataForm:{
        orderId: '',
        orderNumber: '',
        createOrderDate: '',
        name: '',
        idCard: '', // 产权证号
        phone: '',
        postAddress: '',
        mailNum:'', //邮件号



        ownerPositive: '',
        ownerNegative: '',
        housingAuthority: '',

        postProvinceId: '',
        postCityId: '',
        postCountyId: '',

        handleAreaId: '',
        openid: '',
        handleId: '',
        postType:''
      }
    }
  },
	methods:{
		prev(){
			this.$router.go(-1)
		},
		show_img(){
			this.is_show=!this.is_show
		},
    getOrderInfo(orderNum){
		  // alert(orderNum)
      this.$http({
        url: this.$http.adornUrl('/mobile/order/info'),
        method: 'get',
        params: this.$http.adornParams({
          'orderNum': orderNum
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataForm = data.data
          this.dataForm.ownerNegative = decodeURIComponent("http://ems.jujinkeji.net/" + data.data.ownerNegative)
          this.dataForm.ownerPositive = decodeURIComponent("http://ems.jujinkeji.net/" + data.data.ownerPositive)
          this.dataForm.housingAuthority = decodeURIComponent("http://ems.jujinkeji.net/zip/受理凭证/" + data.data.housingAuthority)
        } else {
          alert(data.msg)
        }
      }).then(()=>{
        this.getPostInfo()
      })
    },
    getPostInfo(){
      this.$http({
        url: this.$http.adornUrl('/mobile/bussiness/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.data.forEach((item)=>{
            if(item.id === this.dataForm.postType){
              this.postText = item.bussinessName
            }
          })
        }
      })
    }
	},
  created(){
    this.getOrderInfo(this.$route.params.orderNum)
  }
}
</script>
<style scoped>
	.fuceng img:nth-child(2){
		margin:0.4rem 0;
	}
	.fuceng img{
		height:2.5rem;
		width:4.4rem;
	}
	.fuceng{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.4);
		display:flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.info3 button{
		width:1.2rem;
		height:0.4rem;
		font-size: 0.2rem;
		color:white;
		background: #177abf;
		text-align: center;
		line-height: 0.4rem;
		border-radius: 0.1rem;
		padding:0;
		border:none;
		outline:none;
		margin-left: 0.3rem;
	}
	.info3 span{
		font-size: 0.32rem;
		font-weight: bold;
	}
	.info3{
		margin-top: 0.5rem!important;
		display: flex;
	}
	.info_detail{
		margin-bottom: 0.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info_right{
		margin-left: 0.2rem;
		border-radius: 0.15rem;
		color:#595959;
		background: #f2f2f2;
		text-align: left;
		padding-left:0.5rem;
		line-height:0.8rem;
		padding-right: 0.3rem;
		font-size: 0.32rem;
		width:4.6rem;
		height:0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.info_left{
		border-radius: 0.15rem;
		font-size: 0.28rem;
		color:#333;
		background: #f2f2f2;
		font-weight: bold;
		width:2.08rem;
		height:0.78rem;
		border:1px solid #666666;
		text-align: center;
		line-height: 0.78rem;
	}
	.info>p{
		margin-top:0.4rem;
		margin-bottom: 0.3rem;
		font-size: 0.32rem;
		color:#333;
		font-weight: bold;
	}
	.info{
		width:6.9rem;
		margin:0 auto;
	}
	.title{
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
