<template>
  <div>
    <div class="content1" v-show="first">
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
      <input type="file" id="saveImage1" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">
      <div @click="monidianji2" class="box1">
        <div v-show="show2">身份证反面</div>
        <img :src=imageSave2 id="portrait2" class="img"/>
      </div>
      <input type="file" id="saveImage2" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">
      <div class="box1-title">
        <img src="../../img/shu.png">
        <div>不动产登记受理凭证(上传图片)</div>
      </div>
      <div @click="monidianji3" class="box1">
        <div v-show="show3">上传凭证</div>
        <img :src=imageSave3 id="portrait3" class="img"/>
      </div>
      <input type="file" id="saveImage3" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">
      <button class="btn" @click="jump" v-bind:disabled="mybtn1" >下一步</button>
    </div>
    <div class="content2" v-show="second">
      <div class="title">不动产登记便民邮寄</div>
      <div class="box"><div class="tui" @click="tui1"></div>EMS邮寄信息<div class="sj"></div></div>
      <div class="smtitle">
        <div class="l">提示:</div>
        <div class="r">为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息为了确保邮件投递准确无误,请申请人准确、详细填写收件人信息</div>
      </div>
      <div class="item">
        <div class="title">姓名</div>
        <input type="text" placeholder="输入收件人姓名" @blur.prevent="changeName()" v-model="dataForm.name" autofocus="autofocus">
      </div>
      <!--<div class='item'>-->
        <!--<div class='title'>身份证号</div>-->
        <!--<input type="text" v-model="dataForm.propertyNo"  @blur.prevent="changeId()">-->
      <!--</div>-->
      <div class="item">
        <div class="title">联系电话</div>
        <input type="text" placeholder="输入收件人手机号" @blur.prevent="changePhone()" v-model="dataForm.phone">
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
          <select v-model="dataForm.postCountyId" @change="getdiNames" id="selecta">
            <option class="option11"></option>
            <option v-for="(item,index) in countyNames" :key="index" :value="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="title">详细地址</div>
        <input type="text" placeholder="输入详细地址" @blur.prevent="changeDizhi()" v-model="dataForm.postAddress">
      </div>
      <div class="tishi" v-show="show">
        <img src="../../img/i.png">
        <div>{{text}}</div>
      </div>
      <button class="btn" @click="jump4">下一步</button>
    </div>
    <div class="content3" v-show="third">
      <div class="title">不动产登记便民邮寄</div>
      <div class="box"><div class="tui" @click="tui2"></div>订单支付<div class="sj"></div></div>
      <div class="box1-title">
        <img src="../../img/xin.png">
        <div>邮寄信息</div>
      </div>
      <div class="box1">
        <div class="item">
          <div class="title">姓名</div>
          <div class="info">{{dataForm.name}}</div>
        </div>
        <div class="item">
          <div class="title">联系电话</div>
          <div class="info">{{dataForm.phone}}</div>
        </div>
        <div class="item">
          <div class="title">收件地址</div>
          <div class="info">
            <div class="dizhi">{{province + city + district + dataForm.postAddress}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">凭证编号</div>
          <div class="info">
            <div class="dizhi">{{dataForm.idCard}}</div>
          </div>
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
      <div class="item">
        <div class="title">邮寄费用</div>
        <div class="info">
          <div class="dizhi">{{postPrice / 100}}</div>
        </div>
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
          <div class="price"><span>￥</span>{{dataForm.postRisk == 2 ? 0 : (rateFree / 100)}}</div>
        </div>
        <div class="item">
          <div class="title">受理地址</div>
          <div class="dz">
            <div>{{detailRiskName}}</div>
            <img src="../../img/dz.png">
          </div>
        </div>
      </div>
      <button class="btn" @click="jump2">下一步</button>
    </div>


    <!----------------------------------受理人信息---------------------------------------->
    <div v-show="fourth">
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
          <input type="text" v-model="dataForm.shoujian_name"  @blur.prevent="changeName()">
        </div>

        <div class='user_phone'>
          <div class='left'>手机号</div>
          <input type="text" v-model="dataForm.shoujian_phone" @blur.prevent="changePhone()">
        </div>

        <div class='item'>
          <div class='left'>身份证号</div>
          <input type="text" v-model="dataForm.propertyNo"  @blur.prevent="changeId()">
        </div>

        <div class='user_num'>
          <div class='left'>凭证编号</div>
          <input type="text" v-model='dataForm.idCard' @blur.prevent="changeBianhao()">
        </div>
      </div>
      <button class='next' @click="jump1()">下一步</button>
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
        postPrice: '', // 邮寄价格
        rateFree: '',  // 保险价格
        detailRiskName: '',
        first: true,
        second: false,
        third: false,
        fourth:false,
        parentId: 1,
        provinceNames: [],
        cityNames: [],
        countyNames: [],
        insuredList: [],
        handleAreas: [],
        postInfo: '',
        //删掉了{id：2，value：'正式'}
        //将{id：1，value：房本}改为{id:1,value:'不动产权证'}
        postTypes:[{
          id:1, value: '不动产权证'
        },{
          id:2, value: '其他'
        }],
        dataForm:{
          orderId: '',
          shoujian_name:'',
          shoujian_phone:'',
          propertyNo: '', //身份证号
          name: '',
          idCard: '', // 产权证号
          phone: '',
          mobileCode: '',
          ownerPositive: '',
          ownerNegative: '',
          housingAuthority: '',
          postType: '',
          postRisk: 2,  // 投递保险(1是，2否)
          postRiskId: '',  // 投递保险运费id
          riskName: '',
          postProvinceId: '',
          postCityId: '',
          postCountyId: '',
          postAddress: '',
          handleAreaId: '',
          openid: '',
          handleId: ''
        },
        //地址
        province:'',
        city:'',
        district:"",

        riskPrice:0,
        // uploading页面属性
        imageSave1:"",
        imageSave2:'',
        imageSave3:'',
        show1:true,
        show2:true,
        show3:true,
        mybtn1:false,

        // info页面属性
        show:false,
        text:'',

        // order页面属性
        isShow:false
      }
    },
    methods:{
      // 根据地区编号，获取id
      getHandleAreaInfo(){
        this.$http({
          url: this.$http.adornUrl('/mobile/handlerArea/getHandleAreaBySystemNo'),
          method: 'get',
          params: this.$http.adornParams({
            'systemNo': localStorage.getItem("areaid")
          })
        }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data)
            console.log(data.data)
            // this.dataForm.riskName = data.data.handleAddress
            this.dataForm.handleAreaId = data.data.areaId
            this.detailRiskName = data.data.handleAddress
            this.dataForm.handleId = data.data.id
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
        }else{
          this.first = false
          this.second = false
          this.third = true
          this.fourth = false
        }
      },
      radio(){
        if(this.third){
          $(".myinput1").eq(0).attr("checked","true")
          // this.rateFree = this.insuredList[0].insuredRate
        }
      },
      handleRadio(index){
        this.rateFree = this.insuredList[index].insuredRate
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

            //console.log(data.msg)

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
            var i = this.dataForm.postProvinceId
            var lis = this.provinceNames
            for(var j =0;j<lis.length;j++){
              if(lis[j].id==i){
                this.province= lis[j].name

                console.log("邮费计算----------------")
                if(this.province != '新疆维吾尔自治区' && this.province != '西藏自治区'){
                  this.dataForm.postRiskId = this.insuredList[0].id
                  this.postPrice = this.insuredList[0].price  // 邮寄价格
                  this.rateFree = this.insuredList[0].insuredRate  // 保险费率价格
                }else{
                  this.dataForm.postRiskId = this.insuredList[1].id
                  this.postPrice = this.insuredList[1].price  // 邮寄价格
                  this.rateFree = this.insuredList[1].insuredRate  // 保险费率价格
                }
                console.log(this.insuredList)



                console.log(this.dataForm.postRiskId)
                console.log(this.postPrice)
                console.log(this.rateFree)

              }
            }
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
      getdiNames(){
        var that = this
        for(var i = 0;i<$("option").length;i++){
            var content = $("option").eq(i).html();
            var value = content.substring(0,4);
            $("option").eq(i).html(value);
            $("option").eq(i).attr('title',content);
        }
        this.district = $("#selecta option:selected").text();
      },

      // 地理位置
      // getMyLocation(){
      //   let that = this;
      //   that.$http({
      //     url: that.$http.adornUrl('/wechatJs/location'),
      //     method: 'get',
      //     params: that.$http.adornParams({
      //       'url': window.location.href.replace(location.hash, '')
      //     })
      //   }).then(({ data }) => {
      //     if (data && data.code === 0) {
      //
      //       wx.config({
      //         debug: false,
      //         appId: data.data.appId,
      //         nonceStr: data.data.nonceStr,
      //         timestamp: data.data.timestamp,
      //         url: data.data.url,
      //         signature: data.data.signature,
      //         jsApiList: [
      //           'checkJsApi', 'openLocation', 'getLocation'
      //         ],
      //       });
      //
      //       wx.checkJsApi({
      //         jsApiList: ['getLocation'],
      //         success: function (res) {
      //           if (res.checkResult.getLocation == false) {
      //             alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
      //             return;
      //           }
      //         }
      //       });
      //
      //       wx.ready(function () {
      //         wx.getLocation({
      //           type: 'wgs84',
      //           success: function (res) {
      //             that.pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //             that.pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //
      //             that.$http({
      //               url: that.$http.adornUrl('/getLocationName'),
      //               method: 'get',
      //               params: that.$http.adornParams({
      //                 'lng': that.pointX,
      //                 'lat': that.pointY
      //               })
      //             }).then(({ data }) => {
      //               if (data && data.code === 0) {
      //                 that.dataForm.riskName = data.data.district
      //                 that.detailRiskName = data.data.detailAddress
      //               } else {
      //                 alert(data.msg)
      //               }
      //             })
      //           },
      //           cancel: function (res) {
      //             alert('用户拒绝授权获取地理位置');
      //             // that.getShopFjStudio()
      //           },
      //           fail: function (res) {
      //             alert("获取地理位置失败")
      //           }
      //         });
      //       });
      //
      //       wx.error(function (res) {
      //         alert("获取地理位置失败");
      //       });
      //     } else {
      //       alert(data.msg)
      //     }
      //   })
      // },

      // uploading页面方法
      jump(){
        if(this.show1==true){
          alert("请上传身份证正面照片")
          return
        }if(this.show2==true){
          alert("请上传身份证反面照片")
          return
        }if(this.show3==true){
          alert("请上传凭证")
          return
        }else{
          this.first = false
          this.second = false
          this.third = false
          this.fourth = true
        }
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
        var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        var reg2 = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        var reg3 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(this.dataForm.shoujian_name==''){
          alert("请输入姓名")
          return
        }if(!reg1.test(this.dataForm.shoujian_name)){
          alert("请输入正确的姓名")
          return
        }
        if(this.dataForm.shoujian_phone==""){
          alert("请输入电话号码")
          return
        }
        if(!reg2.test(this.dataForm.shoujian_phone)){
          alert("请输入正确的电话号码")
          return
        }
        if(this.dataForm.propertyNo == ""){
          alert("请输入身份证号")
          return
        }
        if(!reg3.test(this.dataForm.propertyNo)){
          alert("请输入正确的身份证号码")
          return
        }
        if(this.dataForm.idCard==""){
          alert("请输入凭证编号")
          return
        }else{
        this.first = false
        this.second = true
        this.third = false
        this.fourth = false
        this.radio();
        }
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
      changeId(e){
        var u = event.currentTarget.value;
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(u)){
          this.show=false;
        }if(!reg.test(u)){
          this.show=true;
          this.text="请输入正确的身份证号"
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
      switchDepartment:function(){  // 是否投递保险
        this.isShow=!this.isShow;
        if(this.isShow){
          // this.riskPrice=1;
          this.dataForm.postRisk = 1
        }else{
          // this.riskPrice=0;
          this.dataForm.postRisk = 2
        }
      },
      jump2(){
        this.dataForm.ownerPositive = ownerPositive
        this.dataForm.ownerNegative = ownerNegative
        this.dataForm.housingAuthority = housingAuthority
        this.dataForm.openid = localStorage.getItem("openid")
        // this.dataForm.postRiskId = $('input:radio[name="dizhi"]:checked').val();val


        // let index = 'http://ems.jujinkeji.net/mobile/Index'
        // location.href = 'http://ems.jujinkeji.net/mobile-ems/wechat/authorize?returnUrl=' + index

        this.$http({
          url: this.$http.adornUrl('/mobile/order/create'),
          method: 'post',
          data: this.$http.adornData(this.dataForm)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data)
            // this.$message({
            //   message: '操作成功',
            //   type: 'success',
            //   duration: 1500,
            //   onClose: () => {
            //     this.visible = false
            //     this.$emit('refreshDataList')
            //   }
            // })
            // alert(data.orderId + '---------------' + data.data.orderId)
            this.dataForm.orderId = data.data.orderId
            // this.wechatPay(data.data.orderId)
            console.log("操作成功")
            this.$router.push("/list")
          } else {
            // this.$message.error(data.msg)
            alert(data.msg)
          }
        })
      }
    },
    mounted(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
      this.yulan1();
      this.yulan2();
      this.yulan3();
      // this.getInsuredList()
    },
    created(){
      this.getInsuredList()
      this.getProvinceNames()
      // this.getMyLocation()
      this.getHandleAreaInfo()
    },
    // beforeRouteEnter (to, from, next) {
    //   let u = navigator.userAgent;
    //   let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   // XXX: 修复iOS版微信HTML5 History兼容性问题
    //   if (isiOS && "/mobile" + to.path !== window.location.pathname) {
    //     window.location.assign('http://ems.jujinkeji.net/mobile/orderInfo')
    //   } else {
    //     next()
    //   }
    // },
  }
</script>

<style scoped>
.option11{
  display:none;
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
  .content3 .item .title{
    color:#333!important;
  }
</style>
