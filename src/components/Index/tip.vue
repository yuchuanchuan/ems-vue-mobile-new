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
		<button class='next' @click="next()">下一步</button>
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
	  id_num:''
    }
  },
  mounted(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  },
  methods:{
	  next(){
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
		  	this.$router.push('/info')
		  }
	  }
  }
}
</script>

<style>
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
