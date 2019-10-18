<template>
  <div class='max'>
    <div class='qianming_btn max'>
      <button @click="overwrite()">清空</button>
      <button @click="writeend()">完成</button>
    </div>
    <section class="signature max">
      <div class="signatureBox max">
        <div class="canvasBox max" ref="canvasHW">
          <canvas ref="canvasF" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" v-if="tempImgUrl ==''" class='max'></canvas>
          <!--<img class="imgCanvas" v-if="tempImgUrl" :src="'/api/mongodb/getDownloadOutputStream?fileId='+imgUrl">-->
          <!--<div class="btnBox">-->
            <!--<div @click.native="overwrite">重写</div>-->
            <!--<div @click.native="commit" v-if="tempImgUrl ==''">确定</div>-->
          <!--</div>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  // import { exchangeDateMin } from '@/utils/validate'
  export default {
    data () {
      return {
        touchBegin: false,
        tempImgUrl: '',
        signatureTime: '',
        showPop: false,
        stageInfo: '',
        // imgUrl: '',
        client: {},
        points: [],
        canvasTxt: null,
        startX: 0,
        startY: 0,
        moveY: 0,
        moveX: 0,
        endY: 0,
        endX: 0,
        w: null,
        h: null,
        isDown: false,
        isViewAutograph: this.$route.query.isViews > 0,
        contractSuccess: this.$route.query.contractSuccess
      }
    },
    props: {
      url: {
        type: String
      },
      imgUrl: {
        type: String,
        default: ''
      }
    },
    model: {
      prop: 'url',
      event: 'handle'
    },
    mounted () {
      // let canvas = this.$refs.canvasF
      // canvas.height = this.$refs.canvasHW.offsetHeight
      // canvas.width = this.$refs.canvasHW.offsetWidth
      // this.canvasTxt = canvas.getContext('2d')
      // this.stageInfo = canvas.getBoundingClientRect()
    },
    methods: {
      writeend(){
        var img_path = this.$refs.canvasF.toDataURL()
        this.$emit('event1',img_path)
        console.log(img_path)
      },
      overwrite(){
        this.$refs.signaturePic.overwrite()
      },
      // mobile
      touchStart (ev) {
        this.touchBegin = true
        let canvas = this.$refs.canvasF
        this.canvasTxt = canvas.getContext('2d')
        this.stageInfo = canvas.getBoundingClientRect()
        ev = ev || event
        ev.preventDefault()
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clienX,
            y: ev.targetTouches[0].clientY
          }
          this.startX = obj.x
          this.startY = obj.y
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.points.push(obj)
        }
      },
      touchMove (ev) {
        ev = ev || event
        ev.preventDefault()
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }
          this.moveY = obj.y
          this.moveX = obj.x
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.startY = obj.y
          this.startX = obj.x
          this.points.push(obj)
        }
      },
      touchEnd (ev) {
        ev = ev || event
        ev.preventDefault()
        if (ev.touches.length == 1) {
          let obj = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.points.push(obj)
        }
      },
      // pc
      mouseDown (ev) {
        let canvas = this.$refs.canvasF
        this.canvasTxt = canvas.getContext('2d')
        this.stageInfo = canvas.getBoundingClientRect()
        ev = ev || event
        ev.preventDefault()
        if (1) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
          this.startX = obj.x
          this.startY = obj.y
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.points.push(obj)
          this.isDown = true
        }
      },
      mouseMove (ev) {
        ev = ev || event
        ev.preventDefault()
        if (this.isDown) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
          this.moveY = obj.y
          this.moveX = obj.x
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.startY = obj.y
          this.startX = obj.x
          this.points.push(obj)
        }
      },
      mouseUp (ev) {
        ev = ev || event
        ev.preventDefault()
        if (1) {
          let obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
          this.canvasTxt.beginPath()
          this.canvasTxt.moveTo(this.startX, this.startY)
          this.canvasTxt.lineTo(obj.x, obj.y)
          this.canvasTxt.stroke()
          this.canvasTxt.closePath()
          this.points.push(obj)
          this.points.push({ x: -1, y: -1 })
          this.isDown = false
        }
      },
      // 重写
      overwrite () {
        this.tempImgUrl = ''
        this.$nextTick(() => {
          this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
          this.points = []
        })
      },
      // 提交签名
      commit () {
        // this.imgUrl = this.$refs.canvasF.toDataURL()
        console.log(this.$refs.canvasF.toDataURL())
        this.dataURLtoFile(this.$refs.canvasF.toDataURL())
        this.showPop = false
        // this.$emit('handle', this.$refs.canvasF.toDataURL())
        // console.log(this.$refs.canvasF.toDataURL()) // 签名img回传后台
        // console.log(this.imgUrl)
      },
      // 将base64转换成file对象
      dataURLtoFile (dataurl, filename = new Date().getTime()) {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        // console.log(new File([u8arr], `${filename}.${suffix}`, {type: mime}))
        var file = new File([u8arr], `${filename}.${suffix}`, { type: mime })
        console.log(file)
        var formdata1 = new FormData()// 创建form对象
        formdata1.append('file', file) // 通过append向form对象添加数据,可以通过append继续添加数//或formdata1.append('img',file);
        formdata1.append('type', 3)
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
        // 添加请求头
        axios.post(process.env.BASE_API + '/sys/file/uploadImg', formdata1, config).then(res => {
          console.log(res)
          if (res && res.data.code === 1) {
            this.$emit('handle', res.data.data)
            // this.$emit('update:showSignature', exchangeDateMin(new Date().getTime()))
          }
        })
        // return new File([u8arr], `${filename}.${suffix}`, {type: mime})
      }
    },
    watch: {
      imgUrl () {
        this.tempImgUrl = this.imgUrl
      }
    }
  }
</script>

<style scoped>
  .max{
    width:100%;
    height:100%;
  }
  .qianming_btn button{
    width: 1rem;
    height: 0.45rem;
    text-align: center;
    line-height: 0.45rem;
    border-radius: 0.3rem;
    background: #177abf;
    border:none;
    outline: none;
    color:white;
  }
  .qianming_btn{
    position: absolute;
    top:0;
    left:-6rem;
    right:0;
    bottom:0;
    margin:auto;
    width:7.1rem;
    height:1rem;
    transform: rotateZ(90deg);
    z-index: 5;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
  .signatureBox {
    width: 100%;
    /*height: calc(100% - 50px);*/
    box-sizing: border-box;
    overflow: hidden;
    background:#f2f2f2;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  .canvasBox {
    box-sizing: border-box;
    flex: 1;
  }
  canvas {
    /*border: 1px solid #7d7d7d;*/
    width: 100%;
  }
  .btnBox {
    padding: 10px;
    text-align: center;
  }
  .btnBox button:first-of-type {
    background: transparent;
    border-radius: 4px;
    height: 40px;
    width: 80px;
    font-size: 14px;
  }
  .btnBox button:last-of-type {
    background: #71b900;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    width: 80px;
    font-size: 14px;
  }
</style>