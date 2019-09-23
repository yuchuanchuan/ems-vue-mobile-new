<template>
  <!--第二步-->
  <div class="content1">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box"><div class="tui" @click="tui()"></div>上传凭证</div>
    <div class="box1-title">
      <img src="../../img/ren.png">
      <div>产权人身份证明<span>（温馨提示：为了保证证件清晰，请您home键向右横版拍照）</span></div>
    </div>
    <div @click="monidianji1" class="box1">
      <div v-show="show1">身份证正面</div>
      <img :src=imageSave1 ref="imgSave1" id="portrait1" :class="xuanzhuan1?'img xuanzhuan':'img'" :style="{'z-index': (show1==false ? '2':'-1')}" />
    </div>
    <input type="file" id="saveImage1" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">
    <div @click="monidianji2" class="box1">
      <div v-show="show2">身份证反面</div>
      <img :src=imageSave2 id="portrait2" :class="xuanzhuan2?'img xuanzhuan':'img'" :style="{'z-index': (show2==false ? '2':'-1')}" />
    </div>
    <input type="file" id="saveImage2" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">
    <div class="box1-title">
      <img src="../../img/shu.png">
      <div>不动产登记受理凭证(上传图片)</div>
    </div>
    <div @click="monidianji3" class="box1">
      <div v-show="show3">上传凭证</div>
      <img :src=imageSave3 id="portrait3" :class="xuanzhuan3?'img xuanzhuan':'img'" :style="{'z-index': (show3==false ? '2':'-1')}" />
    </div>
    <input type="file" id="saveImage3" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera">

    <p class='content1_tip'>
      <span class='content1_tip_title'>温馨提示：</span>
      <span class='content1_tip_text'>上传的图片需要边框整齐字体清晰，如材料有误或不清晰的，可能需要重新上传。</span>
    </p>
    <button class="btn" @click="jump">下一步</button>
  </div>
</template>

<script>
  var ownerPositive = '';  // 正面身份证
  var ownerNegative = '';  // 反面身份证
  var housingAuthority = ''; // 房产证
  export default {
    data(){
      return{
        imageSave1:"",
        imageSave2:'',
        imageSave3:'',
        show1:true,
        show2:true,
        show3:true,
        xuanzhuan1:false,
        xuanzhuan2:false,
        xuanzhuan3:false
      }
    },
    methods:{
      tui(){
        this.$router.push({name: 'firstOrder'})
      },

      //身份证正面旋转功能  如果图片高度大于宽度?旋转:不旋转
      monidianji1(event){
        var self = this
        if(confirm("温馨提示：为了保证证件清晰，请您home键向右横版拍照")){
          document.getElementById('saveImage1').click()
          document.getElementById('saveImage1').onchange = function(e){
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(){
              self.imageSave1 = this.result
              self.show1 = false
              console.log(self.show1)
              var img = new Image();
              img.src = this.result
              setTimeout(function(){
                var width = img.width
                var height = img.height
                if(height > width){
                  self.xuanzhuan1 = true
                }else{
                  self.xuanzhuan1 = false
                }
              },50)
            }
          }
        }
      },

      //身份证正面旋转功能  如果图片高度大于宽度?旋转:不旋转
      monidianji2(event){
        var self = this
        if(confirm("温馨提示：为了保证证件清晰，请您home键向右横版拍照")){
          document.getElementById('saveImage2').click()
          document.getElementById('saveImage2').onchange = function(e){
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(){
              self.imageSave2 = this.result
              self.show2 = false
              var img = new Image();
              img.src = this.result
              setTimeout(function(){
                var width = img.width
                var height = img.height
                if(height > width){
                  self.xuanzhuan2 = true
                }else{
                  self.xuanzhuan2 = false
                }
              },50)
            }
          }
        }
      },

      monidianji3(event){
        var self = this
        if(confirm("温馨提示：为了保证证件清晰，请您home键向右横版拍照")){
          document.getElementById('saveImage3').click()
          document.getElementById('saveImage3').onchange = function(e){
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function(){
              self.imageSave3 = this.result
              self.show3 = false
              console.log(self.show3)
              var img = new Image();
              img.src = this.result
              setTimeout(function(){
                var width = img.width
                var height = img.height
                if(height > width){
                  self.xuanzhuan3 = true
                }else{
                  self.xuanzhuan3 = false
                }
              },50)
            }
          }
        }
      },

      jump(){
        if(sessionStorage.getItem('ownerPositive') == '' || sessionStorage.getItem('ownerPositive') == null || sessionStorage.getItem('ownerPositive') == 'null'){
          alert('请上传身份证正面照')
        }else if(sessionStorage.getItem('ownerNegative') == '' || sessionStorage.getItem('ownerNegative') == null || sessionStorage.getItem('ownerNegative') == 'null'){
          alert('请上传身份证反面照')
        }else if(sessionStorage.getItem('housingAuthority') == '' || sessionStorage.getItem('housingAuthority') == null || sessionStorage.getItem('housingAuthority') == 'null'){
          alert('请上传不动产登记受理凭证')
        }else{
          this.$router.push({name: 'thirdOrder'})
        }
      }
    },
    mounted(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

    },
    created(){
      // if(sessionStorage.getItem('img1')){
      //   this.imageSave1 = sessionStorage.getItem('img1')
      //   this.show1 = false
      // }
      if(sessionStorage.getItem("ownerPositive")){
        this.imageSave1 = decodeURIComponent("http://ems.jujinkeji.net/" + sessionStorage.getItem("ownerPositive"))
        this.show1 = false
      }
      // if(sessionStorage.getItem('img2')){
      //   this.imageSave2 = sessionStorage.getItem('img2')
      //   this.show2 = false
      // }
      if(sessionStorage.getItem("ownerNegative")){
        this.imageSave2 = decodeURIComponent("http://ems.jujinkeji.net/" + sessionStorage.getItem("ownerNegative"))
        this.show2 = false
      }
      // if(sessionStorage.getItem('img3')){
      //   this.imageSave3 = sessionStorage.getItem('img3')
      //   this.show3 = false
      // }
      if(sessionStorage.getItem("housingAuthority")){
        this.imageSave3 = decodeURIComponent("http://ems.jujinkeji.net/zip/受理凭证/" + sessionStorage.getItem("housingAuthority"))
        this.show3 = false
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
    overflow: hidden;
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

  .inp_list>div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.3rem;
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
  .box1-title span{
    font-size:0.26rem;
    color:red;
  }
  .xuanzhuan{
    transform: rotateZ(-90deg);
    height: 5.2rem!important;
    width: 3rem!important;
  }
</style>
