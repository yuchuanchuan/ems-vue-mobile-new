<template>
  <!----------------------------------受理人信息-  第一步--------------------------------------->
  <div>
    <div class='title'>
      <div>
        <!--<div class="tui" @click="shangyiye"></div>-->
        不动产登记受理凭证信息
      </div>
      <!--<div class='jiantou'></div>-->
    </div>

    <img src="../../img/banlixuzhi.png" class='tip_img'>
    <div class='tip'>
      <div class='tip_title'>提示：</div>
      <div class='tip_info'>请将“天津市不动产登记受理凭证”中的“编号信息”、“权利人姓名”填写在以下表格中，“手机号”请填写受理登记时填写的信息。</div>
    </div>

    <div class="inp_list">
      <div class='user_name'>
        <div class='left'>申请人</div>
        <input type="text" v-model="dataForm.applyName">
      </div>

      <div class='user_phone'>
        <div class='left'>手机号</div>
        <input type="text" v-model="dataForm.applyPhone">
      </div>

      <div class='item'>
        <div class='left'>身份证号</div>
        <input type="text" v-model="dataForm.propertyNo">
      </div>

      <div class='user_num'>
        <div class='left'>凭证编号</div>
        <input type="text" v-model="dataForm.idCard">
      </div>
    </div>
    <!--<div class="tishi" v-show="show">-->
      <!--<img src="../../img/i.png">-->
      <!--<div>{{text}}</div>-->
    <!--</div>-->
    <!--  受理人信息确认弹出框  -->
    <div class='fuceng' v-if="sureInfo">
      <div class='fuceng_tip'>
        <div class='fuceng_title'>请确认信息</div>

        <div class='info_list'>
          <div class='user_name'>申请人：{{dataForm.applyName}}</div>
          <div class='user_id'>身份证号：{{dataForm.propertyNo}}</div>
          <div class='user_phone'>手机号：{{dataForm.applyPhone}}</div>
          <div class='user_num'>凭证编号：{{dataForm.idCard}}</div>
        </div>
        <div class='btn_list'>
          <div class='xiugai' @click="xiugai">修改</div>
          <div class='queding' @click="sureNext">确定</div>
        </div>
      </div>
    </div>
    <button class='next' @click="jump1()">下一步</button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        sureInfo: false,
        dataForm:{
          applyName: '',
          applyPhone: '',
          propertyNo: '',
          idCard: ''
        },
        text: '',
        show: false
      }
    },
    methods: {
      xiugai(){
        this.sureInfo = false
      },
      sureNext(){
        this.sureInfo = false
        if(confirm("“天津市不动产登记受理凭证”原件请务必交回现场邮政EMS人员！")){
            sessionStorage.setItem('applyName', this.dataForm.applyName)
            sessionStorage.setItem('applyPhone', this.dataForm.applyPhone)
            sessionStorage.setItem('propertyNo', this.dataForm.propertyNo)
            sessionStorage.setItem('idCard', this.dataForm.idCard)
            this.$router.push({name: 'secondOrder'})
        }
      },
      goback () {
        if(this.dataForm.idCard === ''){
          this.show = true;
          this.text = "请输入凭证编号"
          return;
        }
        window.scrollTo(0, 0);
      },
      jump1 () {
        if(this.dataForm.applyName == '' || this.dataForm.applyName == null){
          alert('请输入申请人姓名')
        } else if(this.dataForm.applyPhone == '' || this.dataForm.applyPhone == null){
          alert('请输入手机号')
        } else if(this.dataForm.propertyNo == '' || this.dataForm.propertyNo == null){
          alert('请输入身份证号')
        }else if(this.dataForm.idCard == '' || this.dataForm.idCard == null){
          alert('请输入凭证编号')
        }else{
          let flag = true
          if(this.dataForm.applyName){
            let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
            if (!reg.test(this.dataForm.applyName)) {
              flag = false
              alert('请输入正确的申请人姓名')
              return;
            }
            window.scrollTo(0, 0);
          }

          if(this.dataForm.applyPhone){
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test(this.dataForm.applyPhone)) {
              flag = false
              alert('请输入正确的手机号')
              return;
            }
            window.scrollTo(0, 0);
          }

          if(this.dataForm.propertyNo){
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            let reg1 = /^[a-zA-Z][0-9]{8}$/


            if (!reg.test(this.dataForm.propertyNo) && !reg1.test(this.dataForm.propertyNo)) {
              flag = false
              alert('请输入正确的身份证号')
              return;
            }
            if(reg.test(this.dataForm.propertyNo)){
              alert("身份证号")
            }
            if(reg1.test(this.dataForm.propertyNo)){
              alert("港澳通行证||台湾通行证||护照")
            }
            window.scrollTo(0, 0);
          }

          if(flag){
            this.sureInfo = true
          }
        }
      }
    },
    mounted(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    },
    created(){
      if(this.dataForm.applyName == ''){
        this.dataForm.applyName = sessionStorage.getItem('applyName')
      }
      if(this.dataForm.applyPhone == ''){
        this.dataForm.applyPhone = sessionStorage.getItem('applyPhone')
      }
      if(this.dataForm.propertyNo == ''){
        this.dataForm.propertyNo = sessionStorage.getItem('propertyNo')
      }
      if(this.dataForm.idCard == ''){
        this.dataForm.idCard = sessionStorage.getItem('idCard')
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
