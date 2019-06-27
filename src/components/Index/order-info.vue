<template>
  <div>
    <div class="content1" v-if="first">
      <div class="title">不动产登记便民邮寄</div>
      <div class="box">上传凭证<div class="sj"></div></div>
      <div class="box1-title">
        <img src="../../img/ren.png">
        <div>产权人身份证明</div>
      </div>
      <div @click="monidianji1" class="box1">
        <div v-show="show1">身份证正面</div>
        <img :src=imageSave1 id="portrait1" class="img"/>
      </div>
      <input type="file" id="saveImage1" name="myphoto" class="myinput" ref="closeUp" accept="image">
      <div @click="monidianji2" class="box1">
        <div v-show="show2">身份证反面</div>
        <img :src=imageSave2 id="portrait2" class="img"/>
      </div>
      <input type="file" id="saveImage2" name="myphoto" class="myinput" ref="closeUp" accept="image">
      <div class="box1-title">
        <img src="../../img/shu.png">
        <div>不动产登记受理凭证(上传图片)</div>
      </div>
      <div @click="monidianji3" class="box1">
        <div v-show="show3">上传凭证</div>
        <img :src=imageSave3 id="portrait3" class="img"/>
      </div>
      <input type="file" id="saveImage3" name="myphoto" class="myinput" ref="closeUp" accept="image">
      <button class="btn" @click="jump">下一步</button>
    </div>
    <div class="content2" v-if="second">
      <div class="title">不动产登记便民邮寄</div>
      <div class="box"><div class="tui" @click="tui1"></div>EMS邮寄信息<div class="sj"></div></div>
      <div class="smtitle">
        <div class="l">提示:</div>
        <div class="r">为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息</div>
      </div>
      <div class="item">
        <div class="title">姓名</div>
        <input type="text" placeholder="输入收件人姓名" @blur.prevent="changeName()" v-model="dataForm.name">
      </div>
      <div class="item">
        <div class="title">联系电话</div>
        <input type="text" placeholder="输入收件人手机号" @blur.prevent="changePhone()" v-model="dataForm.phone">
      </div>
      <div class="item">
        <div class="title">收件地址</div>
        <div class="select">
          <select v-model="dataForm.postProvinceId" @change="getCityNames">
            <option v-for="(item,index) in provinceNames" :key="index" :value="item.id">{{item.name}}</option>
          </select>
          <select v-model="dataForm.postCityId" @change="getCountyNames">
            <option v-for="(item,index) in cityNames" :key="index" :value="item.id">{{item.name}}</option>
          </select>
          <select v-model="dataForm.postCountyId" @change="getdiNames">
            <option v-for="(item,index) in countyNames" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="title">详细地址</div>
        <input type="text" placeholder="输入详细地址" @blur.prevent="changeDizhi()" v-model="dataForm.postAddress">
      </div>
      <div class="item">
        <div class="title">凭证编号</div>
        <input type="text" placeholder="请输入凭证编号" @blur.prevent="changeBianhao()" v-model="dataForm.idCard">
      </div>
      <div class="tishi" v-show="show">
        <img src="../../img/i.png">
        <div>{{text}}</div>
      </div>
      <button class="btn" @click="jump1">下一步</button>
    </div>

    <div class="content3" v-if="third">
      <div class="title">不动产登记便民邮寄</div>
      <div class="box"><div class="tui" @click="tui2"></div>订单支付<div class="sj"></div></div>
      <div class="box1-title">
        <img src="../../img/xin.png">
        <div>邮寄信息</div>
      </div>
      <div class="box1">
        <div class="item">
          <div class="title">姓名</div>
          <div class="info">李海霞</div>
        </div>
        <div class="item">
          <div class="title">联系电话</div>
          <div class="info">18001360553</div>
        </div>
        <div class="item">
          <div class="title">收件地址</div>
          <div class="info">
            <div class="dizhi">天津市花园产业园区海泰信息广场天津市花园产业园区海泰信息广场</div>
          </div>
        </div>
        <div class="item">
          <div class="title">凭证编号</div>
          <div class="info">125423651428674</div>
        </div>
      </div>
      <div class="box1-title">
        <img src="../../img/zhifu.png">
        <div>支付信息</div>
      </div>
      <div class="item">
        <div class="title">邮寄文件类型</div>
        <select v-model="dataForm.postType">
          <option v-for="(item,index) in postTypes" :key="index" :value="item.id">{{item.value}}</option>
        </select>
      </div>
      <div class="box2">
        <div class="title">寄达地</div>
        <label v-for="(item,index) in insuredList" :key="index">
          <div class="b2-item">
            <div class="top">
              <div class="top1">
                <div class="title">{{item.name}}</div>
                <div class="price"><span>￥</span>{{item.price / 100}}</div>
              </div>
              <div class="top2">
                <input type="radio" class="myinput1" name="dizhi"/>
              </div>
            </div>
            <!--<div class="bottom">500g以内</div>-->
          </div>
        </label>
        <!--<label>-->
          <!--<div class="b2-item">-->
            <!--<div class="top">-->
              <!--<div class="top1">-->
                <!--<div class="title">天津/外阜 (新疆、西藏除外)</div>-->
                <!--<div class="price"><span>￥</span>20</div>-->
              <!--</div>-->
              <!--<div class="top2">-->
                <!--<input type="radio" class="myinput1" name="dizhi"/>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="bottom">500g以内</div>-->
          <!--</div>-->
        <!--</label>-->
      </div>
      <div class="box3">
        <div class="item">
          <div class="title">是否投递保险</div>
          <div class="kg">
                <span class="switch" :class="{on:isShow}" @click="switchDepartment">
                    <div class="switch-circle" :class={right:isShow}></div>
                </span>
          </div>
        </div>
        <div class="item">
          <div class="title">保险费用</div>
          <div class="price"><span>￥</span>5</div>
        </div>
        <div class="item">
          <div class="title">受理地址</div>
          <div class="dz">
            <div>西青区不动产登记事务中心西青区不动产登记事务中心西青区不动产登记事务中心</div>
            <img src="../../img/dz.png">
          </div>
        </div>
      </div>
      <button class="btn" @click="jump2">下一步</button>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  var ownerPositive = '';  // 正面身份证
  var ownerNegative = '';  // 反面身份证
  var housingAuthority = ''; // 房产证
  export default {
    name: 'order-info',
    data(){
      return{
        first: true,
        second: false,
        third: false,
        parentId: 1,
        provinceNames: [],
        cityNames: [],
        countyNames: [],
        insuredList: [],
        handleAreas: [],
        postInfo: '',
        postTypes:[{
          id:1, value: '房本'
        },{
          id:2, value: '正式'
        },{
          id:3, value: '其他'
        }],
        dataForm:{
          orderId: '',
          name: '',
          idCard: '',
          phone: '',
          mobileCode: '',
          ownerPositive: '',
          ownerNegative: '',
          housingAuthority: '',
          postType: '',
          postRisk: 1,
          postRiskId: '',
          riskName: '',
          postProvinceId: '',
          postCityId: '',
          postCountyId: '',
          postAddress: '',
          handleAreaId: '',
          openid: ''
        },

        // uploading页面属性
        imageSave1:"",
        imageSave2:'',
        imageSave3:'',
        show1:true,
        show2:true,
        show3:true,

        // info页面属性
        show:false,
        text:'',

        // order页面属性
        isShow:false
      }
    },
    methods:{
      getdiNames(){
        for(var i = 0;i<$("option").length;i++){
            var content = $("option").eq(i).html();
            var value = content.substring(0,4);
            $("option").eq(i).html(value);
            $("option").eq(i).attr('title',content);
        }  
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
                price: item.insuredAmount
              })
            })
          } else {
            console.log(data.msg)
          }
        })
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
            console.log(data.msg)
          }
        })
      },
      getCityNames(){
        for(var i = 0;i<$("option").length;i++){
            var content = $("option").eq(i).html();
            var value = content.substring(0,4);
            $("option").eq(i).html(value);
            $("option").eq(i).attr('title',content);
        } 
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
          } else {
            console.log(data.msg)
          }
        })
      },
      getCountyNames(){
        for(var i = 0;i<$("option").length;i++){
            var content = $("option").eq(i).html();
            var value = content.substring(0,4);
            $("option").eq(i).html(value);
            $("option").eq(i).attr('title',content);
        } 
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
          } else {
            console.log(data.msg)
          }
        })
      },

      // 支付
      wechatPay(orderId){
        this.$http({
          url: this.$http.adornUrl('/pay/create'),
          method: 'get',
          params: this.$http.adornParams({
            'orderId': orderId,
            'returnUrl': 'http://ems.jujinkeji.net/mobile/flow'
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
              // updatePayStatus();
              const TIME_COUNT1 = 3;
              if (!this.atimer) {
                this.show = false;
                this.acount = TIME_COUNT1;
                this.atimer = setInterval(() => {
                  if (this.acount > 0 && this.acount <= TIME_COUNT1) {
                    this.acount--;
                    this.show = false;
                  }else {
                    // this.$router.push({path:'/index'})
                    // location.href = 'http://ems.jujinkeji.net/mobile/Index'
                    window.location.assign('http://ems.jujinkeji.net/mobile/Index')
                    clearInterval(this.atimer);
                    this.atimer = null;
                  }
                }, 1000)
              }
              // this.$http({
              //   url: this.$http.adornUrl('/mobile/order/mail'),
              //   method: 'post',
              //   data: this.$http.adornData({
              //     orderId: this.dataForm.orderId
              //   })
              // }).then(({ data }) => {
              //   if (data && data.code === 0) {
              //     location.href = 'http://ems.jujinkeji.net/mobile/Index'
              //   } else {
              //     alert(data.msg)
              //   }
              // })
            }
            //location.href = "${returnUrl}";
          }
        );
      },

      // 地理位置
      getMyLocation(){
        let that = this;

        that.$http({
          url: that.$http.adornUrl('/wechatJs/location'),
          method: 'get',
          params: that.$http.adornParams({
            'url': window.location.href.replace(location.hash, '')
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {

            wx.config({
              debug: false,
              appId: data.data.appId,
              nonceStr: data.data.nonceStr,
              timestamp: data.data.timestamp,
              url: data.data.url,
              signature: data.data.signature,
              jsApiList: [
                'checkJsApi', 'openLocation', 'getLocation'
              ],
            });

            wx.checkJsApi({
              jsApiList: ['getLocation'],
              success: function (res) {
                if (res.checkResult.getLocation == false) {
                  alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                  return;
                }
              }
            });

            wx.ready(function () {
              console.log("初始化地理位置信息")
//                wx.invoke('getLocation', 'openLocation', {}, function(res) {
//                    //alert(res.err_msg + "唯一");
//                });
              wx.getLocation({
                type: 'wgs84',
                success: function (res) {

                  that.pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  that.pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                  that.$http({
                    url: that.$http.adornUrl('/getLocationName'),
                    method: 'get',
                    params: that.$http.adornParams({
                      'lng': that.pointX,
                      'lat': that.pointY
                    })
                  }).then(({ data }) => {
                    if (data && data.code === 0) {
                      that.dataForm.riskName = data.data
                    } else {
                      alert(data.msg)
                    }
                  })
                },
                cancel: function (res) {
                  alert('用户拒绝授权获取地理位置');
                  // that.getShopFjStudio()
                },
                fail: function (res) {
                  console.log("获取地理位置失败")
                }
              });
            });

//             wx.error(function (res) {
//               alert("获取地理位置失败");
//                console.log(res)
// //               that.getShopFjStudio()
//             });
          } else {
            console.log(data.msg)
          }
        })
      },

      // uploading页面方法
      jump(){
        this.first = false
        this.second = true
        this.third = false
      },
      monidianji1(){
        document.getElementById('saveImage1').click()
      },
      yulan1(){
        var that =this
        document.getElementById('saveImage1').onchange = function () {
          that.show1=false
          var imgFile = this.files[0];
          var fr = new FileReader();
          fr.onload = function () {
            document.getElementById('portrait1').src = fr.result;
          };
          fr.readAsDataURL(imgFile);
          let formData = new FormData();
          //接口接收参数 键值形式 添加到formData中
          formData.append("file",$(this)[0].files[0]);
          $.ajax({
            url: process.env.BASE_API + '/sys/file/uploadImg',//url地址
            type:'post',
            data: formData,
            contentType: false,
            processData: false,
            success:function(res){
              console.log(res);
              if(res.code === 0){
                ownerPositive = res.data
              }else{
                console.log(res.msg)
              }
            }
          })
        }
      },
      monidianji2(){
        document.getElementById('saveImage2').click()
      },
      yulan2(){
        var that =this
        document.getElementById('saveImage2').onchange = function () {
          that.show2=false
          var imgFile = this.files[0];
          var fr = new FileReader();
          fr.onload = function () {
            document.getElementById('portrait2').src = fr.result;
          };
          fr.readAsDataURL(imgFile);
          let formData = new FormData();
          //接口接收参数 键值形式 添加到formData中
          formData.append("file",$(this)[0].files[0]);
          $.ajax({
            url: process.env.BASE_API + '/sys/file/uploadImg',//url地址
            type:'post',
            data: formData,
            contentType: false,
            processData: false,
            success:function(res){
              console.log(res);
              if(res.code === 0){
                ownerNegative = res.data
              }else{
                console.log(res.msg)
              }
            }
          })
        }
      },
      monidianji3(){
        document.getElementById('saveImage3').click()
      },
      yulan3(){
        var that =this
        document.getElementById('saveImage3').onchange = function () {
          that.show3=false
          var imgFile = this.files[0];
          var fr = new FileReader();
          fr.onload = function () {
            document.getElementById('portrait3').src = fr.result;
          };
          fr.readAsDataURL(imgFile);
          let formData = new FormData();
          //接口接收参数 键值形式 添加到formData中
          formData.append("file",$(this)[0].files[0]);
          $.ajax({
            url: process.env.BASE_API + '/sys/file/uploadImg',//url地址
            type:'post',
            data: formData,
            contentType: false,
            processData: false,
            success:function(res){
              console.log(res);
              if(res.code === 0){
                housingAuthority = res.data
              }else{
                console.log(res.msg)
              }
            }
          })
        }
      },

      //  info页面方法
      tui1(){
        this.first = true
        this.second = false
        this.third = false
      },
      tui2(){
        this.first = false
        this.second = true
        this.third = false
      },
      jump1(){
        this.first = false
        this.second = false
        this.third = true
      },
      changeName(e){
        var u = event.currentTarget.value;
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if(reg.test(u)){
          this.show=false;
        }if(!reg.test(u)){
          this.show=true;
          this.text="请输入正确的收件人姓名"
          return;
        }
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
      },
      changeDizhi(e){
        var u = event.currentTarget.value;
        if(u==""){
          this.show=true;
          this.text="请输入详细地址"
          return;
        }else{
          this.show=false;
        }
      },
      changeBianhao(e){
        var u = event.currentTarget.value;
        if(u==""){
          this.show=true;
          this.text="请输入详细地址"
          return;
        }else{
          this.show=false;
        }
      },

      // order页面方法
      switchDepartment:function(){
        this.isShow=!this.isShow;
      },
      jump2(){
        this.$router.push("./submit")
      }
    },
    mounted(){
      this.yulan1();
      this.yulan2();
      this.yulan3();
    },
    created(){
      this.getInsuredList()
      this.getProvinceNames()
      this.getMyLocation()
    }
  }
</script>

<style scoped>
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
    z-index:2;
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
    font-size:0.32rem;
    height:0.8rem;
    line-height: 0.8rem;
    text-align: center;
    width:2.1rem;
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
    width:4.6rem;
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
    width:3.65rem;
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
</style>
