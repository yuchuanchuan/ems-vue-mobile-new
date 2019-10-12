<template>
  <!--第三步-->
  <div class="content2">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box"><div class="tui" @click="tui1"></div>EMS邮寄信息</div>
    <div class="smtitle">
      <div class="l">提示:</div>
      <div class="r">为了确保邮件投递准确无误，请申请人准确、详细填写收件人信息、联系电话及收件地址，如因信息填写有误造成长时间无法收到邮件的，请打咨询电话：022-24013672</div>
    </div>
    <div class="item">
      <div class="title">姓名</div>
      <input type="text" placeholder="输入收件人姓名" v-model="dataForm.name" autofocus="autofocus">
    </div>
    <!--<div class='item'>-->
    <!--<div class='title'>身份证号</div>-->
    <!--<input type="text" v-model="dataForm.propertyNo"  @blur.prevent="changeId()">-->
    <!--</div>-->
    <div class="item">
      <div class="title">联系电话</div>
      <input type="text" placeholder="输入收件人手机号" v-model="dataForm.phone">
    </div>
    <div class="item">
      <div class="title">收件地址</div>
      <div class="select">
        <select v-model="dataForm.postProvinceId" @change="getCityNames">
          <option class="option11"></option>
          <option v-for="(item,index) in provinceNames" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <select v-model="dataForm.postCityId" @change="getCountyNames">
          <option class="option11"></option>
          <option v-for="(item,index) in cityNames" :key="index" :value="item.id">{{item.name}}</option>
        </select>
        <select v-model="dataForm.postCountyId" id="selecta">
          <option class="option11"></option>
          <option v-for="(item,index) in countyNames" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </div>
    </div>
    <!--<div class="item">-->
      <!--<div class="title">详细地址</div>-->
      <!--<input type="text" placeholder="输入详细地址" v-model="dataForm.postAddress">-->
    <!--</div>-->
    <div class="item">
      <div class="title">街道/路</div>
      <input type="text" placeholder="输入街道/路" v-model="dataForm.street">
    </div>
    <div class="item">
      <div class="title">门牌号码</div>
      <input type="text" placeholder="输入门牌号码" v-model="dataForm.houseNum">
    </div>
    <!--<div class="item">-->
    <!--<div class="title">凭证编号</div>-->
    <!--<input type="text" v-model="dataForm.idCard" disabled>-->
    <!--</div>-->
    <!--<div class="tishi" v-show="show">-->
      <!--<img src="../../img/i.png">-->
      <!--<div>{{text}}</div>-->
    <!--</div>-->
    <button class="btn" @click="jump4">下一步</button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        show: false,
        text: '',
        parentId: 1,
        provinceNames: [],
        cityNames: [],
        countyNames: [],
        insuredList: [],
        postPrice: '', // 邮寄价格
        rateFree: '',  // 保险价格
        dataForm:{
          name: '',
          phone: '',
          postProvinceId: '',
          postCityId: '',
          postCountyId: '',
          postAddress: '',
          postRiskId: '',
          street: '',
          houseNum: ''
        }
      }
    },
    methods:{
      tui1(){
        this.$router.push({name: 'secondOrder'})
      },
      changeName(e){
        var u = event.currentTarget.value;
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if(reg.test(u)){
          this.show=false;
        }if(!reg.test(u)){
          this.show=true;
          this.text="请输入正确的姓名"
          return;
        }
        window.scrollTo(0, 0);
      },
      changePhone(e){
        var u = event.currentTarget.value;
        var reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(reg.test(u)){
          this.show=false;
        }if(!reg.test(u)){
          this.show=true;
          this.text="请输入正确的手机号"
          return;
        }
        window.scrollTo(0, 0);
      },
      changeDizhi(e){
        var u = event.currentTarget.value;
        console.log(u)
        if(u==""){
          this.show=true;
          this.text="请输入详细地址"
          return;
        }else{
          this.show=false;
        }
        window.scrollTo(0, 0);
      },
      getProvinceNames(){
        this.$http({
          url: this.$http.adornUrl('/mobile/area/list'),
          method: 'get',
          params: this.$http.adornParams({
            'parentId': this.parentId
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.provinceNames = []
            this.cityNames = []
            this.countyNames = []
            data.data.forEach((item) => {
              this.provinceNames.push({
                id: item.id,
                name: item.name
              })
            })
          } else {

          }
        })
      },
      getCityNames(){
        this.$http({
          url: this.$http.adornUrl('/mobile/area/list'),
          method: 'get',
          params: this.$http.adornParams({
            'parentId': this.dataForm.postProvinceId
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.cityNames = []
            this.countyNames = []
            data.data.forEach((item) => {
              this.cityNames.push({
                id: item.id,
                name: item.name
              })
            })
            var i = this.dataForm.postProvinceId
            var lis = this.provinceNames
            for(var j =0;j<lis.length;j++){
              if(lis[j].id==i){
                this.province= lis[j].name
                if(this.province != '新疆维吾尔自治区' && this.province != '西藏自治区'){
                  this.dataForm.postRiskId = this.insuredList[0].id
                  this.postPrice = this.insuredList[0].price  // 邮寄价格
                  this.rateFree = this.insuredList[0].insuredRate  // 保险费率价格
                }else{
                  this.dataForm.postRiskId = this.insuredList[1].id
                  this.postPrice = this.insuredList[1].price  // 邮寄价格
                  this.rateFree = this.insuredList[1].insuredRate  // 保险费率价格
                }
              }
            }
          }
        })
      },
      getCountyNames(){
        this.$http({
          url: this.$http.adornUrl('/mobile/area/list'),
          method: 'get',
          params: this.$http.adornParams({
            'parentId': this.dataForm.postCityId
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.countyNames = []
            data.data.forEach((item) => {
              this.countyNames.push({
                id: item.id,
                name: item.name
              })
            })
            var i = this.dataForm.postCityId
            var lis = this.cityNames
            for(var j =0;j<lis.length;j++){
              if(lis[j].id==i){
                this.city = lis[j].name
              }
            }
          } else {
            console.log(data.msg)
          }
        })
      },
      getInsuredList(){
        this.$http({
          url: this.$http.adornUrl('/mobile/insured/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.insuredList = []
            data.data.forEach((item) => {
              this.insuredList.push({
                id: item.insuredId,
                name: item.insuredComment,
                price: item.insuredAmount,
                insuredRate: item.insuredRate
              })
            })
          } else {
            console.log(data.msg)
          }
        })
      },
      jump4(){
        var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        var reg2 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(this.dataForm.name==''){
          alert("请输入收件人姓名")
          return
        }if(!reg1.test(this.dataForm.name)){
          alert("请输入正确的收件人姓名")
          return
        }
        if(this.dataForm.phone==""){
          alert("请输入电话号码")
          return
        }if(!reg2.test(this.dataForm.phone)){
          alert("请输入正确的电话号码")
          return
        }if(this.dataForm.postProvinceId == '' || this.dataForm.postCityId=='' || this.dataForm.postCountyId =='' ||
          this.dataForm.postProvinceId == null || this.dataForm.postCityId==null || this.dataForm.postCountyId ==null){
          alert("请输入收件地址")
          return
        }if(this.dataForm.street == '' || this.dataForm.street == null){
          alert("请输入街道/路名称")
        }if(this.dataForm.houseNum == '' || this.dataForm.houseNum == null){
          alert("请输入门牌号码")
        }else{
          sessionStorage.setItem('name', this.dataForm.name)
          sessionStorage.setItem('phone', this.dataForm.phone)
          sessionStorage.setItem('postProvinceId', this.dataForm.postProvinceId)
          sessionStorage.setItem('postCityId', this.dataForm.postCityId)
          sessionStorage.setItem('postCountyId', this.dataForm.postCountyId)
          sessionStorage.setItem('postAddress', this.dataForm.postAddress)
          sessionStorage.setItem('postRiskId', this.dataForm.postRiskId)
          sessionStorage.setItem('postPrice', this.postPrice)
          sessionStorage.setItem('rateFree', this.rateFree)
          sessionStorage.setItem('street', this.dataForm.street)
          sessionStorage.setItem('houseNum', this.dataForm.houseNum)

          this.$router.push({name: 'fourthOrder'})
        }
      },
    },
    created(){
      this.getInsuredList()
      this.getProvinceNames()
      if(this.dataForm.name === ''){
        this.dataForm.name = sessionStorage.getItem('name')
      }
      if(this.dataForm.phone === ''){
        this.dataForm.phone = sessionStorage.getItem('phone')
      }
      if(this.dataForm.postProvinceId === ''){
        this.dataForm.postProvinceId = sessionStorage.getItem('postProvinceId')
      }
      if(this.dataForm.postCityId === ''){
        this.dataForm.postCityId = sessionStorage.getItem('postCityId')
      }
      if(this.dataForm.postCountyId === ''){
        this.dataForm.postCountyId = sessionStorage.getItem('postCountyId')
        setTimeout(()=>{
          this.getCityNames()
          this.getCountyNames()
        },100)
      }
      if(this.dataForm.postAddress === ''){
        this.dataForm.postAddress = sessionStorage.getItem('postAddress')
      }
    }
  }
</script>

<style scoped>
  .dz select{
    width:100%;
    height:0.8rem;
    background:none;
    border:none;
    outline:none;
  }
  .btn_list{
    width:100%;
    height:0.9rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-top:0.35rem;
    border-top:1px solid #dedede;

  }
  .btn_list .xiugai{
    border-right:1px solid #dedede;
  }
  .btn_list .queding{
    color:#09bb07;
  }
  .btn_list div{
    font-size:0.36rem;
    width:50%;
    height:100%;
    text-align: center;
    line-height:0.9rem;
  }
  .info_list{
    margin-top:0.45rem;
  }
  .info_list div{
    margin:0.1rem 0;
  }
  .content1_tip{
    font-size: 0.28rem;
    width: 6rem;
    margin: 0 auto;
    margin-bottom: 0.1rem;
    margin-top: 0.3rem;
  }
  .content1_tip_title{
    color:#333;
  }
  .content1_tip_text{
    color:#999;
  }
  .option11{
    display:none;
  }
  body{
    width:100%;
  }
  .addr_select{
    width:4.35rem !important;
  }
  .content1>.title,.content2>.title,.content3>.title{
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
  .sj{
    border-top:0.17rem solid #fff;
    border-left:0.13rem solid transparent;
    border-right:0.13rem solid transparent;
    border-bottom:0.13rem solid transparent;
    position:absolute;
    top:0.3rem;
    right:0.4rem;
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
  .content1 .box1{
    width:5.2rem;
    height:3rem;
    background:#f2f2f2;
    margin:0 1.25rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
  }
  .content1 .img{
    display: block;
    height:100%;
    position:absolute;
    z-index:-1;
    width:100%;
  }
  .content1 .box1>div{
    font-size:0.28rem;
    position: absolute;
    z-index:1;
  }
  .content1 .box1-title{
    height:1rem;
    display: flex;
    align-items: center;
    padding:0 0.6rem;
    font-size:0.28rem;
    color:#333;
  }
  .content1 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
  }
  .content1 .myinput{
    display:none;
  }
  .btn{
    background:#177abf;
    width:6rem;
    height:1rem;
    line-height: 1rem;
    color:#fff;
    font-size:0.32rem;
    text-align: center;
    border-radius: 5px;
    margin:0 0.75rem 0.6rem;
    outline: none;
    border:none;
  }
  .content2 .smtitle{
    font-size:0.28rem;
    display: flex;
    padding:0.6rem 0.3rem 0.4rem;
    width:6.9rem;
    color:#666;
  }
  .content2 .l{
    width:0.7rem;
  }
  .content2 .r{
    width:6.2rem;
  }
  .content2 .item{
    margin:0 0.3rem 0.3rem;
    height:0.8rem;
    align-items: center;
    display: flex;
  }
  .content2 .item>.title{
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
  .content2 .item>input{
    font-size:0.28rem;
    border-radius: 5px;
    background:#f0f0f0;
    border:0;
    outline: none;
    width:3.8rem;
    height:0.75rem;
    padding:0 0.4rem;
  }
  .content2 .item>.select{
    width:4.6rem;
    display: flex;
    justify-content: space-between;
  }
  .content2 .select>select{
    background:#f2f2f2;
    font-size:0.2rem;
    border-radius: 5px;
    border:0;
    outline: none;
    color:#666;
    width:1.4rem;
    height:0.8rem;
    text-overflow: ellipsis;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    padding:0 0.2rem;
    background:url("../../img/down.png");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 0.2rem;
  }
  .content2 .select>select::-ms-expand { display: none; }
  .content2 .tishi{
    font-size:0.28rem;
    color:#f00;
    display: flex;
    align-items: center;
    padding-left:0.3rem;
  }
  .content2 .tishi>img{
    width:0.4rem;
    margin-right: 0.1rem;
  }

  .content2 .box1{
    width:5.2rem;
    height:3rem;
    background:#f2f2f2;
    margin:0 1.25rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
  }
  .content2 .img{
    display: block;
    height:100%;
    position:absolute;
    z-index:2;
  }
  .content2 .box1>div{
    font-size:0.28rem;
    position: absolute;
    z-index:1;
  }
  .content2 .box1-title{
    height:1rem;
    display: flex;
    align-items: center;
    padding:0 0.6rem;
    font-size:0.28rem;
    color:#333;
  }
  .content2 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
  }
  .content2 .myinput{
    display:none;
  }
  .content3 .box1-title{
    height:1rem;
    display: flex;
    align-items: center;
    padding:0 0.6rem;
    font-size:0.28rem;
    color:#333;
  }
  .content3 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
  }
  .content3 .item{
    margin:0 0.3rem 0.3rem;
    height:0.8rem;
    align-items: center;
    display: flex;
  }
  .content3 .item>.title{
    font-weight: bold;
    font-size:0.28rem;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    width:2.42rem;
    background:#f2f2f2;
    border:1px solid #666;
    border-radius: 5px;
    margin-right: 0.2rem;
  }
  .content3 .item>.info{
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
  .content3 .feiyong{
    font-size:0.28rem;
    width:4rem;
    border-radius: 5px;
    padding:0 0.3rem;
    height:0.8rem;
    line-height: 0.8rem;
    color:#666;
    background:#f2f2f2;
    border:1px solid #f2f2f2;
    display:flex!important;
    justify-content: flex-end !important;
    align-items: center !important;
  }
  .content3 .dizhi{
    overflow-x: auto;
    white-space: nowrap;
  }
  .content3 .dizhi::-webkit-scrollbar{
    display: none;
  }
  .content3 .item:last-child{
    margin-bottom:0;
  }
  .content3 .item>select{
    flex-shrink: 0;
    width: 4.35rem !important;
    height:0.8rem;
    border:0;
    outline: none;
    background:#f2f2f2;
    border-radius: 5px;
    color:#666;
    padding:0 0.3rem;
  }
  .content3 .box2{
    width:6.9rem;
    box-sizing: border-box;
    margin:0 0.3rem;
    background:#f2f2f2;
    padding:0.3rem;
    border-radius: 5px;
  }
  .content3 .box2>.title{
    font-size:0.32rem;
    color:#333;
    font-weight: bold;
    height:1rem;
    line-height: 1rem;
  }
  .content3 .b2-item{
    height:1rem;
    border-bottom:1px solid #ccc;
    font-size:0.28rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content3 label:last-child .b2-item{
    border:0;
  }
  .content3 .b2-item>.top{
    color:#666;
    display: flex;
    justify-content: space-between;
  }
  .content3 .top>.top1{
    display: flex;
    justify-content: space-between;
    width:5.8rem;
  }
  .content3 .top1>.price>span{
    font-size:0.18rem;
  }
  .content3 .bottom{
    font-size: 0.24rem;
    color:#999;
  }
  .content3 input[type=radio] {
    display:block;
    width:0.3rem;
    height:0.3rem;
    -webkit-appearance:none;
    border-radius: 50%;
    border:1px solid #dadada;
    background-color: transparent;
    outline: 0 !important;
    line-height: 5vw;}
  .content3 input[type=radio]:after {
    content:"";
    display:block;
    width:0.3rem;
    height:0.3rem;
    border-radius:50%;
    text-align:center;
    line-height:0.3rem;
    font-size:0.2rem;
    box-sizing:border-box;}
  .content3 input[type=radio]:checked{border:0;}
  .content3 input[type=radio]:checked:after {
    content: "L";
    color:#fff;
    transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0);
    -webkit-transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0);
    border-color:2px solid #177abf;
    background-color: #177abf;}
  .content3 .item>.kg{
    background:#f2f2f2;
    padding-right: 0.4rem;
    width:4.2rem;
    border-radius: 5px;
    height:0.8rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .content3 .item>.price{
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
  .content3 .item>.price>span{
    font-size: 0.2rem;
    color:#999;
  }
  .content3 .item>.dz{
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
  .content3 .dz>img{
    width:0.3rem;
    display: block;
  }
  .content3 .dz>div{
    width:3.8rem;
    overflow-x: auto;
    white-space: nowrap;
  }
  .content3 .dz>div::-webkit-scrollbar{
    display: none;
  }
  .content3 .switch{
    display: inline-block;
    width: 0.7rem;
    height: 0.36rem;
    background: #dbdbdb;
    border-radius: 50px;
    position: relative;
    vertical-align: middle;}
  .content3 .switch-circle{
    background:#177abf;
    position: absolute;
    left: -0.02rem;
    top: -0.02rem;
    width:0.4rem;
    height: 0.4rem;
    border-radius: 50%;
  }
  .content3 .on{
    background:#177abf;
  }
  .content3 .right{
    background:#fff;
    transform :translateX(0.35rem)
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
    align-items: center;
    justify-content: space-between;
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
    margin-right:0.15rem;
    color:#333;
    background:#f2f2f2;
    border:1px solid black;
    font-size: 0.32rem;
    border-radius: 0.15rem;
  }
  .tip_title{
    white-space: nowrap;
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
  .content3 .item .title{
    color:#333!important;
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
    margin-top:0.5rem;
  }
  .new_dianzi{
    width:100%;
    height:0.4rem;
  }
  .new_sub{
    width:5.95rem;
    height:1rem;
    text-align:center;
    line-height:1rem;
    border-radius: 0.2rem;
    background: #177abf;
    outline: none;
    border: none;
    color:white;
    font-size:0.36rem;
    font-weight: bold;
    margin:0 0.775rem;
  }
  .white_title button{
    padding:0;
    margin:0;
    width:1rem;
    height:0.45rem;
    text-align:center;
    line-height:0.45rem;
    border-radius: 0.3rem;
    background: #177abf;
    outline: none;
    border: none;
    color:white;
  }
  .white_title{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .new_qianzi{
    margin-top:0.3rem;
    width:100%;
    height:3.3rem;
    background:#f2f2f2;
  }
  .new_info span:first-child{
    font-size:0.28rem;
    font-weight: bold;
  }
  .new_info{
    width:6.64rem;
    margin:0 auto;
    font-size:0.26rem;
    margin-bottom:0.15rem;
    line-height:0.5rem;
  }
  .new_new_title{
    font-size:0.32rem;
    color:#333;
    font-weight: bold;
    text-align:center;
    margin-top:0.4rem;
    margin-bottom:0.3rem;
  }
  .new_info_title{
    font-size:0.32rem;
    text-align:center;
    margin-top:0.4rem;
    margin-bottom:0.3rem;
    display:none;
  }
  .new_box{
    margin-bottom:0.15rem;
    width: 7.5rem;
    height: 0.8rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.8rem;
    background: #177abf;
    text-align: center;
    position: relative;
  }
  .new_tui{
    position: absolute;
    top: 0.25rem;
    left: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url(../../img/zuo.png);
    background-size: 0.3rem 0.3rem;
    background-repeat: no-repeat;
  }
  .new_title{
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
    background: #213980;
    height: 0.8rem;
    line-height: 0.8rem;
  }
</style>
