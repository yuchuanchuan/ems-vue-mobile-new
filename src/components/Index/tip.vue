<template>
  	<div>
			<div class='title'>
		  <div>不动产登记受理凭证信息</div>  
			<div class='jiantou'></div>
		</div>
		
		<img src="../../img/banlixuzhi.png" class='tip_img'>
		<div class='tip'>
			<div class='tip_title'>提示：</div>	
			<div class='tip_info'>请将“天津市不动产登记受理凭证”中的“编号信息”、“权利人姓名”填写在以下表格中，“手机号”请填写受理登记时填写的信息。</div>
		</div>
		
		<div class="inp_list">
			<div class='user_name'>
				<div class='left'>姓名</div>
				<input type="text" v-model="name"  @blur.prevent="changeName()">
			</div>
			<div class='user_id'>
				<div class='left'>证件号</div>
				<input type="text" v-model="id_num"  @blur.prevent="changeId()">
			</div>	
			<div class='user_phone'>
				<div class='left'>手机号</div>
				<input type="text" v-model="phone" @blur.prevent="changePhone()">
			</div>
			
			<div class='user_num'>
				<div class='left'>凭证编号</div>
				<input type="text" v-model='num' @blur.prevent="changeBianhao()">
			</div>
		</div>

		<div class='fuceng' v-if="status">
			<div class='fuceng_tip'>
				<div class='fuceng_title'>请确认信息</div>
				
				<div class='info_list'>
					<div class='user_name'>姓名：{{name}}</div>
					<div class='user_id'>证件号：{{id_num}}</div>
					<div class='user_phone'>手机号：{{phone}}</div>
					<div class='user_num'>凭证编号：{{num}}</div>
				</div>
				<div class='btn_list'>
					<div class='xiugai' @click="tip()">修改</div>
					<div class='queding' @click="next()">确定</div>
				</div>
			</div>	
		</div>
		<button class='next' @click="tip()">下一步</button>
		
	</div>

</template>

<script>
export default {
  name: 'xuzhi',
  data () {
    return {
      name:'',
	  phone:'',
	  num:'',
	  id_num:'',
	  status:false
    }
  },
  mounted(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  },
  methods:{
  	  tip(){
  	  	if(this.name == ''){
			  alert("姓名不能为空")
			  console.log(this.name)
		  }else if(this.phone == ""){
			  alert("电话不能为空")
		  }else if(this.num == ""){
			  alert("证书编号不能为空")
		  }else if(this.id_num == ""){
			  alert("证件号不能为空")
		  }else{
		  	this.status = !this.status
		  }
  	  },
	  next(){
		  this.$router.push('/orderInfo')
	  }
  }
}
</script>

<style>
	.info_list div{
		margin-bottom:0.1rem;
	}
	.xiugai{
		border-right:1px solid #cccccc;
	}
	.info_list{
		margin-top:0.45rem;
		display:flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		color:#595959;
	}
	.btn_list div{
		width:50%;
		height:98%;
		text-align: center;
		line-height:0.882rem;
		font-size:0.32rem;
	}
	.quxiao{
		color:#595959;
	}
	.queding{
		color:#09bb07 !important;
	}
	.btn_list{
		border-top:1px solid #cccccc;
		width:100%;
		margin-top:0.4rem;
		height:0.9rem;
		display:flex;
	}
	.fuceng{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin:auto;
		z-index:333;
	}
	.fuceng_tip{
		font-size:0.28rem;
		width:5.45rem;
		height:4.85rem;
		position:fixed;
		border-radius:0.2rem;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin:auto;
		background:white;
		z-index:666;
		display:flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	}
	.fuceng_title{
		font-size:0.36rem !important;
		color:#333;
		font-weight:bold;
		margin-top:0.75rem;
	}
	.next{
		border-radius: 0.15rem;
		margin-left: 0.8rem;
		margin-top: 0.45rem;
		width:5.9rem;
		height: 0.95rem;
		text-align: center;
		line-height: 0.95rem;
		border:none;
		outline: none;
		background: #177abf;
		color:white;
		font-weight: bold;
		font-size: 0.36rem;
	}
	.inp_list>div{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.3rem;
	}
	.inp_list{
		margin-top: 0.5rem;
		width:6.9rem;
		margin-left: 0.3rem;
	}
	.inp_list input{
		width:4.6rem;
		height: 0.8rem;
		background: #f2f2f2;
		border:none;
		outline: none;
		border-radius: 0.15rem;
		text-indent: 0.64rem;
	}
	.left{
		width:2.1rem;
		height: 0.8rem;
		text-align: center;
		line-height: 0.8rem;
		color:#333;
		background:#f2f2f2;
		border:1px solid black;
		font-size: 0.32rem;
		border-radius: 0.15rem;
	}
	.tip_title{
		width:13%;
	}
	.tip_info{
		width:87%;
	}
	.tip{
		color:#666666;
		font-size: 0.24rem;
		width:6.9rem;
		margin-left: 0.3rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.tip_img{
		margin-top: 0.23rem;
		margin-left: 0.3rem;
		width:6.9rem;
		height: 1.4rem;
	}
	.title{
		margin-top: 0;
		height: 0.8rem;
		width:100%;
		background:white;
		font-size: 0.32rem;
		font-weight: bold;
		color:white;
		background: #177abf;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.jiantou{
		position: absolute;
		width:1px;
		height: 1px;
		border-top: 0.25rem solid white;
		border-bottom: 0.2rem solid transparent;
		border-left: 0.2rem solid transparent;
		border-right: 0.2rem solid transparent;
		margin-top: 0.3rem;
		top:0;
		right:0.4rem;
	}
</style>
