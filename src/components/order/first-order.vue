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
        <input type="text" v-model="dataForm.shoujian_name">
      </div>

      <div class='user_phone'>
        <div class='left'>手机号</div>
        <input type="text" v-model="dataForm.shoujian_phone">
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
          <div class='user_name'>申请人：{{dataForm.shoujian_name}}</div>
          <div class='user_id'>身份证号：{{dataForm.propertyNo}}</div>
          <div class='user_phone'>手机号：{{dataForm.shoujian_phone}}</div>
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
          shoujian_name: '',
          shoujian_phone: '',
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
        sessionStorage.setItem('shoujian_name', this.dataForm.shoujian_name)
        sessionStorage.setItem('shoujian_phone', this.dataForm.shoujian_phone)
        sessionStorage.setItem('propertyNo', this.dataForm.propertyNo)
        sessionStorage.setItem('idCard', this.dataForm.idCard)

        this.$router.push({name: 'secondOrder'})
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
        if(this.dataForm.shoujian_name == ''){
          alert('请输入申请人姓名')
        } else if(this.dataForm.shoujian_phone == ''){
          alert('请输入手机号')
        } else if(this.dataForm.propertyNo == ''){
          alert('请输入身份证号')
        }else if(this.dataForm.idCard == ''){
          alert('请输入凭证编号')
        }else{
          let flag = true
          if(this.dataForm.shoujian_name){
            let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
            if (!reg.test(this.dataForm.shoujian_name)) {
              flag = false
              alert('请输入正确的申请人姓名')
            }
            window.scrollTo(0, 0);
          } else if(this.dataForm.shoujian_phone){
            let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if (!reg.test(this.dataForm.shoujian_phone)) {
              flag = false
              alert('请输入正确的手机号')
            }
            window.scrollTo(0, 0);
          } else if(this.dataForm.propertyNo){
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(this.dataForm.propertyNo)) {
              flag = false
              alert('请输入正确的身份证号')
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
      if(this.dataForm.shoujian_name == ''){
        this.dataForm.shoujian_name = sessionStorage.getItem('shoujian_name')
      }
      if(this.dataForm.shoujian_phone == ''){
        this.dataForm.shoujian_phone = sessionStorage.getItem('shoujian_phone')
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

  .btn_list div{
    font-size:0.36rem;
    width:50%;
    height:100%;
    text-align: center;
    line-height:0.9rem;
  }

  .info_list div{
    margin:0.1rem 0;
  }
  body{
    width:100%;
  }

  .content1>.title,.content2>.title,.content3>.title{
    font-size:0.36rem;
    color:#fff;
    text-align: center;
    background:#213980;
    height:0.8rem;
    line-height: 0.8rem;
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
  .content1 .box1>div{
    font-size:0.28rem;
    position: absolute;
    z-index:1;
  }

  .content1 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
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

  .content2 .box1>div{
    font-size:0.28rem;
    position: absolute;
    z-index:1;
  }

  .content2 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
  }

  .content3 .box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
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

  .content3 .box2>.title{
    font-size:0.32rem;
    color:#333;
    font-weight: bold;
    height:1rem;
    line-height: 1rem;
  }

  .content3 .top1>.price>span{
    font-size:0.18rem;
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

  .content3 .item>.price>span{
    font-size: 0.2rem;
    color:#999;
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

  .content3 .item .title{
    color:#333!important;
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
  .new_info span:first-child{
    font-size:0.28rem;
    font-weight: bold;
  }


</style>
