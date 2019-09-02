<template>
  <div>
    <div class='new_title'>不动产登记便民邮寄</div>
    <div class="new_box">
      <div class="new_tui" @click="new_tui()"></div>
      授权委托书
    </div>
    <!-- 截取授权委托书图片开始 -->
    <div ref="imageTofile">
      <div class='new_info_title'>授权委托书</div>
      <div class='new_yi new_info'>
        <span>委托人：</span>
        <span>{{dataForm.applyName}}</span>
      </div>
      <div class='new_id new_info'>
        <span>身份证：</span>
        <span>{{dataForm.propertyNo}}</span>
      </div>
      <div class='new_num new_info'>
        <span>凭证编号：</span>
        <span>{{dataForm.idCard}}</span>
      </div>
      <div class='new_jia new_info'>
        <span>受托人：</span>
        <span>中国邮政速递物流股份有限公司天津市分公司</span>
      </div>
      <div class='new_shi new_info'>
        <span>委托事项：</span>
        <span>权利人自愿委托中国邮政速递物流股份有限公司天津市分公司为合法代理人，代为领取本人申请办理的不动产权证/不动产登记证明，并邮寄送达本人，受托人在其权限范围内依法所作的一切行为，接受问询的行为及签署的一切文件，委托人均予以承认。</span>
      </div>
      <div class='new_white new_info'>
        <div class='white_title'>
          <span>委托人签名：</span>
          <button @click="overwrite">清空</button>
        </div>
        <div class='new_qianzi'>
          <Signature ref="signaturePic"></Signature>
        </div>
      </div>
      <div style="height: 10px;"></div>
      <!-- 截取授权委托书图片结束 -->
    </div>

    <button class='new_sub' @click="jump5" :disabled="payOrder">提交</button>
    <div class="new_dianzi"></div>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import Signature from '../Index/signature.vue'
  var commission = ''
  export default {
    data(){
      return{
        payOrder: false,
        dataForm: {
          orderId: '',
          applyName: sessionStorage.getItem('applyName'),
          applyPhone: sessionStorage.getItem('applyPhone'),
          propertyNo: sessionStorage.getItem('propertyNo'), //身份证号
          name: sessionStorage.getItem('name'),
          idCard: sessionStorage.getItem('idCard'), // 产权证号
          phone: sessionStorage.getItem('phone'),
          mobileCode: '',
          ownerPositive: sessionStorage.getItem('ownerPositive'),
          ownerNegative: sessionStorage.getItem('ownerNegative'),
          housingAuthority: sessionStorage.getItem('housingAuthority'),
          postType: sessionStorage.getItem('postType'),
          postRisk: sessionStorage.getItem('postRisk'),  // 投递保险(1是，2否)
          postRiskId: sessionStorage.getItem('postRiskId'),  // 投递保险运费id
          riskName: '',
          postProvinceId: sessionStorage.getItem('postProvinceId'),
          postCityId: sessionStorage.getItem('postCityId'),
          postCountyId: sessionStorage.getItem('postCountyId'),
          postAddress: sessionStorage.getItem('postAddress'),
          handleAreaId: sessionStorage.getItem('handleAreaId'),
          openid: '',
          handleId: sessionStorage.getItem('handleId'),
          commission: ''
        }
      }
    },
    methods:{
      new_tui(){
        this.$router.push({name: 'fourthOrder'})
      },
      overwrite(){
        this.$refs.signaturePic.overwrite()
      },
      jump5(){
        if(this.$refs.signaturePic.touchBegin){
          this.payOrder = true
          // 截图 授权委托书
          this.toImage()
        }else {
          alert('请签字确认')
        }
      },
      toImage() {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        html2canvas(this.$refs.imageTofile, {
          backgroundColor: null,
          width: 480,
          height: 800
        }).then((canvas) => {
          let url = canvas.toDataURL('image/png');
          this.dataURLtoFile(url)
        }).then(()=>{
          this.createOrderInfo()
        })
      },
      dataURLtoFile (dataurl, filename = new Date().getTime()) {
        let _this = this
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        let file = new File([u8arr], `${filename}.${suffix}`, { type: mime })
        let formdata1 = new FormData()// 创建form对象
        formdata1.append('file', file) // 通过append向form对象添加数据,可以通过append继续添加数//或formdata1.append('img',file);
        formdata1.append('type', 3)
        formdata1.append("name", sessionStorage.getItem('applyName'))
        $.ajax({
          url: process.env.BASE_API + '/sys/file/uploadImg',//url地址
          type:'post',
          data: formdata1,
          contentType: false,
          processData: false,
          success:function(res){
            if(res.code === 0){
              commission = res.data
              // setTimeout(()=>{
              //   _this.updateCommission(commission)
              // },1000)
              // success
            }else{
              console.log(res.msg)
            }
          }
        })
      },
      createOrderInfo(){
        this.dataForm.commission = commission
        this.dataForm.openid = localStorage.getItem("openid")

        this.$http({
          url: this.$http.adornUrl('/mobile/order/create'),
          method: 'post',
          data: this.$http.adornData(this.dataForm)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.orderId = data.data.orderId
            this.wechatPay(data.data.orderId)
          } else {
            alert(data.msg)
          }
        })
      },
      updateCommission(commission){
        this.$http({
          url: this.$http.adornUrl('/mobile/order/updateCommission'),
          method: 'get',
          params: this.$http.adornParams({
            'commission': commission,
            'orderNum': this.dataForm.orderId
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            // success
          } else {
            alert(data.msg)
          }
        })
      },
      // 支付
      wechatPay(orderId){
        this.orderNum = orderId
        this.$http({
          url: this.$http.adornUrl('/pay/create'),
          method: 'get',
          params: this.$http.adornParams({
            'orderId': orderId,
            'returnUrl': 'http://ems.jujinkeji.net/mobile/orderInfo'
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
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              _this.$router.push({name:"list"})
            } else{
              _this.$router.push({name:"list"})
            }
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
      }
    },
    components:{
      Signature,
      html2canvas
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
