<template>
  <!--第二步-->
  <div class="content1">
    <!--<div class="zhe-zhao-ceng" v-if="showZheZhao" style="z-index: 99999">正在上传中，请稍后...</div>-->
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">
      <div class="tui" @click="tui()"></div>
      上传凭证
    </div>
    <!-- <div class="box1-title">
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
    <input type="file" id="saveImage2" name="myphoto" class="myinput" ref="closeUp" accept="image/*" capture="camera"> -->
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
    <p class='content1_tip'>
      <span class="redText" v-show="showPhotoWarn">提醒：请上传凭证照片</span>
    </p>
    <button class="btn" @click="jump">下一步</button>
  </div>

</template>

<script>
  var ownerPositive = '' // 正面身份证
  var ownerNegative = '' // 反面身份证
  var housingAuthority = '' // 房产证
  export default {
    data() {
      return {
        // showZheZhao: false,
        dialogVisible: false,
        imageSave1: '',
        imageSave2: '',
        imageSave3: '',
        show1: true,
        show2: true,
        show3: true,
        showPhotoWarn: false,
        xuanzhuan1: false,
        xuanzhuan2: false,
        xuanzhuan3: false
      }
    },
    methods: {
      tui() {
        this.$router.push({
          name: 'firstOrder'
        })
      },
      dataURLtoFile(dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
          type: mime
        })
      },
      postImg(fileData, type, imgName) {
        let formData = new FormData()
        // 接口接收参数 键值形式 添加到formData中
        formData.append('file', fileData)
        formData.append('type', type)
        formData.append('name', sessionStorage.getItem('applyName'))
        $.ajax({
          url: process.env.BASE_API + '/sys/file/uploadImg', // url地址
          type: 'post',
          data: formData,
          contentType: false,
          processData: false,
          async: false,
          success: function(res) {
            console.log(res)
            if (res.code === 0) {
              // ownerPositive = res.data
              // sessionStorage.setItem('ownerPositive', ownerPositive)
              sessionStorage.setItem(imgName, res.data)
            } else {
              console.log(res.msg)
            }
          }
        })
      },

      // 身份证正面旋转功能  如果图片高度大于宽度?旋转:不旋转
      monidianji1(event) {
        var self = this
        //      self.openModal()
        // this.dialogVisible =true;
        // console.log(this.dialogVisible);
        this.$confirm('为了保证证件清晰，请您home键向右横版拍照<br/><b>点击任意处关闭</b>', '温馨提示：', {
          // confirmButtonText: '确定',
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          callback: action => {
            // alert('温馨提示：为了保证证件清晰，请您home键向右横版拍照')
            document.getElementById('saveImage1').click()
            document.getElementById('saveImage1').onchange = function(e) {
              let reader = new FileReader()
              let fileData = ''
              reader.readAsDataURL(e.target.files[0])
              reader.onload = function() {
                self.show1 = false
                var img = new Image()
                img.src = this.result
                // 判断图片是否大于100K,是就直接上传，反之压缩图片
                if (this.result.length <= (100 * 1024)) {
                  self.imageSave1 = this.result
                  fileData = e.target.files[0]
                  self.postImg(fileData, 1, 'ownerPositive')
                } else {
                  img.onload = function() {
                    let ndata = self.compress(img)
                    self.imageSave1 = ndata
                    // BASE64转图片
                    fileData = self.dataURLtoFile(ndata)
                    self.postImg(fileData, 1, 'ownerPositive')
                  }
                }

                setTimeout(function() {
                  var width = img.width
                  var height = img.height
                  if (height > width) {
                    self.xuanzhuan1 = true
                  } else {
                    self.xuanzhuan1 = false
                  }
                }, 500)
              }
            }
          }
        })
      },

      // 身份证正面旋转功能  如果图片高度大于宽度?旋转:不旋转
      monidianji2(event) {
        var self = this
        // alert('温馨提示：为了保证证件清晰，请您home键向右横版拍照')
        this.$confirm('为了保证证件清晰，请您home键向右横版拍照<br/><b>点击任意处关闭</b>', '温馨提示：', {
          // confirmButtonText: '确定',
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          callback: action => {
            document.getElementById('saveImage2').click()
            document.getElementById('saveImage2').onchange = function(e) {
              let reader = new FileReader()
              let fileData = ''
              reader.readAsDataURL(e.target.files[0])
              reader.onload = function() {
                self.show2 = false
                var img = new Image()
                img.src = this.result
                // 判断图片是否大于100K,是就直接上传，反之压缩图片
                if (this.result.length <= (100 * 1024)) {
                  self.imageSave2 = this.result
                  fileData = e.target.files[0]
                  self.postImg(fileData, 1, 'ownerNegative')
                } else {
                  img.onload = function() {
                    let ndata = self.compress(img)
                    self.imageSave2 = ndata
                    // BASE64转图片
                    fileData = self.dataURLtoFile(ndata)
                    self.postImg(fileData, 1, 'ownerNegative')
                  }
                }
                setTimeout(function() {
                  var width = img.width
                  var height = img.height
                  if (height > width) {
                    self.xuanzhuan2 = true
                  } else {
                    self.xuanzhuan2 = false
                  }
                }, 500)
              }
            }
          }
        })
      },

      monidianji3(event) {
        var self = this
        // alert('温馨提示：为了保证证件清晰，请您home键向下竖版照相')

        document.getElementById('saveImage3').click()
        document.getElementById('saveImage3').onchange = function(e) {
          let reader = new FileReader()
          let fileData = ''
          reader.readAsDataURL(e.target.files[0])
          reader.onload = function() {
            self.show3 = false
            var img = new Image()
            img.src = this.result
            // 判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.imageSave3 = this.result
              fileData = e.target.files[0]
              self.postImg(fileData, 2, 'housingAuthority')
            } else {
              img.onload = function() {
                let ndata = self.compress(img)
                self.imageSave3 = ndata
                // BASE64转图片
                fileData = self.dataURLtoFile(ndata)
                self.postImg(fileData, 2, 'housingAuthority')
              }
            }
            setTimeout(function() {
              var width = img.width
              var height = img.height
              if (height > width) {
                self.xuanzhuan3 = false
              } else {
                self.xuanzhuan3 = false
              }
            }, 500)
          }
        }

      },

      jump() {
        // if (sessionStorage.getItem('ownerPositive') == '' || sessionStorage.getItem('ownerPositive') == null ||
        //   sessionStorage.getItem('ownerPositive') == 'null') {
        //   this.common.myAlert('请上传身份证正面照',this)
        // } else if (sessionStorage.getItem('ownerNegative') == '' || sessionStorage.getItem('ownerNegative') == null ||
        //   sessionStorage.getItem('ownerNegative') == 'null') {
        //   this.common.myAlert('请上传身份证反面照',this)
        // } else
        if (sessionStorage.getItem('housingAuthority') == '' || sessionStorage.getItem('housingAuthority') ==
          null || sessionStorage.getItem('housingAuthority') == 'null') {

          // this.common.myAlert('请上传不动产登记受理凭证',this)
          this.showPhotoWarn = true
        } else {
          this.$router.push({
            name: 'thirdOrder'
          })
        }
      },
      /** *******图片压缩********/
      compress(img) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 瓦片canvas
        let tCanvas = document.createElement('canvas')
        let tctx = tCanvas.getContext('2d')
        let initSize = img.src.length
        let width = img.width
        let height = img.height
        // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        if ((ratio = width * height / 4000000) > 1) {
          console.log('大于400万像素')
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        //        铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // 如果图片像素大于100万则使用瓦片绘制
        let count
        if ((count = width * height / 1000000) > 1) {
          console.log('超过100W像素')
          count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
          // 计算每块瓦片的宽和高
          let nw = ~~(width / count)
          let nh = ~~(height / count)
          tCanvas.width = nw
          tCanvas.height = nh
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height)
        }

        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1)
        console.log('压缩前：' + initSize)
        console.log('压缩后：' + ndata.length)
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
        console.log('压缩成功返回结果')
        console.log(ndata)
        return ndata
      }
    },
    components: {

    },
    mounted() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
    },
    created() {
      // if(sessionStorage.getItem('img1')){
      //   this.imageSave1 = sessionStorage.getItem('img1')
      //   this.show1 = false
      // }
      if (sessionStorage.getItem('ownerPositive')) {
        this.imageSave1 = decodeURIComponent('http://ems.tjeasytech.cn/' + sessionStorage.getItem('ownerPositive'))
        this.show1 = false
      }
      // if(sessionStorage.getItem('img2')){
      //   this.imageSave2 = sessionStorage.getItem('img2')
      //   this.show2 = false
      // }
      if (sessionStorage.getItem('ownerNegative')) {
        this.imageSave2 = decodeURIComponent('http://ems.tjeasytech.cn/' + sessionStorage.getItem('ownerNegative'))
        this.show2 = false
      }
      // if(sessionStorage.getItem('img3')){
      //   this.imageSave3 = sessionStorage.getItem('img3')
      //   this.show3 = false   ems.tjeasytech.cn
      // }
      if (sessionStorage.getItem('housingAuthority')) {
        this.imageSave3 = decodeURIComponent('http://ems.tjeasytech.cn/zip/受理凭证/' + sessionStorage.getItem(
          'housingAuthority'))
        this.show3 = false
      }
    }
  }
</script>

<style scoped>
  /*.zhe-zhao-ceng{*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*position: absolute;*/
  /*background-color: #000000;*/
  /*opacity: 0.3;*/
  /*text-align: center;*/
  /*padding-top: 45%;*/
  /*}*/
  .dz select {
    width: 100%;
    height: 0.8rem;
    background: none;
    border: none;
    outline: none;
  }

  .btn_list div {
    font-size: 0.36rem;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 0.9rem;
  }

  .info_list div {
    margin: 0.1rem 0;
  }

  .content1_tip {
    font-size: 0.28rem;
    width: 6rem;
    margin: 0 auto;
    margin-bottom: 0.1rem;
    margin-top: 0.3rem;
  }

  .content1_tip_title {
    color: #333;
  }

  .content1_tip_text {
    color: #999;
  }

.redText{
  color: #FF0000;
  font-weight: bolder;
}

  body {
    width: 100%;
  }

  .content1>.title,
  .content2>.title,
  .content3>.title {
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
    background: #213980;
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .box {
    width: 7.5rem;
    height: 0.8rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.8rem;
    background: #177abf;
    text-align: center;
    position: relative;
  }

  .tui {
    position: absolute;
    top: 0.25rem;
    left: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url("../../img/zuo.png");
    background-size: 0.3rem 0.3rem;
    background-repeat: no-repeat;
  }

  .content1 .box1 {
    overflow: hidden;
    width: 5.2rem;
    height: 3rem;
    background: #f2f2f2;
    margin: 0 1.25rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .content1 .img {
    display: block;
    height: 100%;
    position: absolute;
    z-index: -1;
    width: 100%;
  }

  .content1 .box1>div {
    font-size: 0.28rem;
    position: absolute;
    z-index: 1;
  }

  .content1 .box1-title {
    height: 1rem;
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    font-size: 0.28rem;
    color: #333;
  }

  .content1 .box1-title>img {
    width: 0.4rem;
    margin-right: 0.1rem;
  }

  .content1 .myinput {
    display: none;
  }

  .btn {
    background: #177abf;
    width: 6rem;
    height: 1rem;
    line-height: 1rem;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 5px;
    margin: 0 0.75rem 0.6rem;
    outline: none;
    border: none;
  }

  .content2 .item>.title {
    font-weight: bold;
    font-size: 0.32rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    width: 2.1rem;
    background: #f2f2f2;
    border: 1px solid #666;
    border-radius: 5px;
    margin-right: 0.2rem;
    color: #333;
  }

  .content2 .item>input {
    font-size: 0.28rem;
    border-radius: 5px;
    background: #f0f0f0;
    border: 0;
    outline: none;
    width: 3.8rem;
    height: 0.75rem;
    padding: 0 0.4rem;
  }

  .content2 .select>select {
    background: #f2f2f2;
    font-size: 0.2rem;
    border-radius: 5px;
    border: 0;
    outline: none;
    color: #666;
    width: 1.4rem;
    height: 0.8rem;
    text-overflow: ellipsis;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding: 0 0.2rem;
    background: url("../../img/down.png");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 0.2rem;
  }

  .content2 .select>select::-ms-expand {
    display: none;
  }

  .content2 .tishi {
    font-size: 0.28rem;
    color: #f00;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
  }

  .content2 .tishi>img {
    width: 0.4rem;
    margin-right: 0.1rem;
  }

  .content2 .box1 {
    width: 5.2rem;
    height: 3rem;
    background: #f2f2f2;
    margin: 0 1.25rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .content2 .img {
    display: block;
    height: 100%;
    position: absolute;
    z-index: 2;
  }

  .content2 .box1>div {
    font-size: 0.28rem;
    position: absolute;
    z-index: 1;
  }

  .content2 .box1-title {
    height: 1rem;
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    font-size: 0.28rem;
    color: #333;
  }

  .content2 .box1-title>img {
    width: 0.4rem;
    margin-right: 0.1rem;
  }

  .content2 .myinput {
    display: none;
  }

  .content3 .box1-title {
    height: 1rem;
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    font-size: 0.28rem;
    color: #333;
  }

  .content3 .box1-title>img {
    width: 0.4rem;
    margin-right: 0.1rem;
  }

  .content3 .item {
    margin: 0 0.3rem 0.3rem;
    height: 0.8rem;
    align-items: center;
    display: flex;
  }

  .content3 .item>.title {
    font-weight: bold;
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    width: 2.42rem;
    background: #f2f2f2;
    border: 1px solid #666;
    border-radius: 5px;
    margin-right: 0.2rem;
  }

  .content3 .item>select {
    flex-shrink: 0;
    width: 4.35rem !important;
    height: 0.8rem;
    border: 0;
    outline: none;
    background: #f2f2f2;
    border-radius: 5px;
    color: #666;
    padding: 0 0.3rem;
  }

  .content3 .box2>.title {
    font-size: 0.32rem;
    color: #333;
    font-weight: bold;
    height: 1rem;
    line-height: 1rem;
  }

  .content3 .top1>.price>span {
    font-size: 0.18rem;
  }

  .content3 input[type=radio] {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 1px solid #dadada;
    background-color: transparent;
    outline: 0 !important;
    line-height: 5vw;
  }

  .content3 input[type=radio]:after {
    content: "";
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.2rem;
    box-sizing: border-box;
  }

  .content3 input[type=radio]:checked {
    border: 0;
  }

  .content3 input[type=radio]:checked:after {
    content: "L";
    color: #fff;
    transform: matrix(-0.766044, -0.642788, -0.642788, 0.766044, 0, 0);
    -webkit-transform: matrix(-0.766044, -0.642788, -0.642788, 0.766044, 0, 0);
    border-color: 2px solid #177abf;
    background-color: #177abf;
  }

  .content3 .item>.price>span {
    font-size: 0.2rem;
    color: #999;
  }

  .content3 .dz>img {
    width: 0.3rem;
    display: block;
  }

  .content3 .dz>div {
    width: 3.8rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .content3 .dz>div::-webkit-scrollbar {
    display: none;
  }

  .inp_list>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .inp_list input {
    width: 4.6rem;
    height: 0.8rem;
    background: #f2f2f2;
    border: none;
    outline: none;
    border-radius: 0.15rem;
    text-indent: 0.64rem;
  }

  .title {
    margin-top: 0;
    height: 0.8rem;
    width: 100%;
    background: white;
    font-size: 0.32rem;
    font-weight: bold;
    color: white;
    background: #177abf;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .content3 .item .title {
    color: #333 !important;
  }

  .white_title button {
    padding: 0;
    margin: 0;
    width: 1rem;
    height: 0.45rem;
    text-align: center;
    line-height: 0.45rem;
    border-radius: 0.3rem;
    background: #177abf;
    outline: none;
    border: none;
    color: white;
  }

  .new_info span:first-child {
    font-size: 0.28rem;
    font-weight: bold;
  }

  .box1-title span {
    font-size: 0.26rem;
    color: red;
  }

  .xuanzhuan {
    transform: rotateZ(-90deg);
    height: 5.2rem !important;
    width: 3rem !important;
  }
</style>
