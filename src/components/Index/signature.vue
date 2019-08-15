<template>
  <div class="signatureBox">
    <!--<div class="visaDetailTop">-->
      <!--<p>-->
        <!--<button class="btnBack" @click="backHome"></button>-->
        <!--<img src="static/imagesWbe/leftIcon.png" style="height: 1.2em;margin-top: 0.2em;" @click="backHome"/>-->
      <!--</p>-->
      <!--<p>-->
        <!--<img src="static/imagesWbe/daohanga.png" style="height: 1.2em;margin-top: 0.2em;"/>-->
        <!--<img src="static/imagesWbe/shareB.png" style="height: 1.2em;margin-top: 0.2em;margin-left: 0.2em;"/>-->
      <!--</p>-->
      <!--<p class="visaTitle">电子签名</p>-->
    <!--</div>-->
    <div class="canvasBox" ref="canvasHW">
      <canvas @touchstart='touchStart'
              @touchmove='touchMove'
              @touchend='touchEnd'
              ref="canvasF"
              @mousedown="mouseDown"
              @mousemove="mouseMove"
              @mouseup="mouseUp"></canvas>
      <div class="btnBox">
        <button @click="overwrite">重写</button>
        <button>提交签名</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "signature",
    data(){
      return{
        points:[],
        canvasTxt:null,
        startX:0,
        startY:0,
        moveY:0,
        moveX:0,
        endY:0,
        endX:0,
        w:null,
        h:null,
        isDown:false
      }
    },
    created(){

    },
    mounted(){
      let canvas=this.$refs.canvasF;
      // canvas.height = this.$refs.canvasHW.offsetHeight - 60;
      // canvas.width =this.$refs.canvasHW.offsetWidth-10;
      this.canvasTxt=canvas.getContext("2d");
    },
    // components:{
    //   NavPublic
    // },
    methods:{
      backHome(){
        window.history.back();
      },
      //电脑设备事件
      mouseDown(ev){
        ev = ev || event;
        ev.preventDefault();
        console.log(ev);
        if(1){
          let obj={
            x:ev.offsetX,
            y:ev.offsetY
          };
          console.log(obj);
          this.startX=obj.x;
          this.startY=obj.y;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.isDown=true;
        }
      },
      //移动设备事件
      touchStart(ev){
        ev = ev || event;
        ev.preventDefault();
        if(ev.touches.length == 1) {
          let obj={
            x:ev.targetTouches[0].clientX,
            y:ev.targetTouches[0].clientY-48
          };
          this.startX=obj.x;
          this.startY=obj.y;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseMove(ev){
        ev = ev || event;
        ev.preventDefault();
        if(this.isDown){
          let obj={
            x:ev.offsetX,
            y:ev.offsetY
          };
          this.moveY=obj.y;
          this.moveX=obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY=obj.y;
          this.startX=obj.x;
          this.points.push(obj);
        }
      },
      //移动设备事件
      touchMove(ev){
        ev = ev || event;
        ev.preventDefault();
        if(ev.touches.length == 1) {
          let obj={
            x:ev.targetTouches[0].clientX,
            y:ev.targetTouches[0].clientY-48
          };
          this.moveY=obj.y;
          this.moveX=obj.x;
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.startY=obj.y;
          this.startX=obj.x;
          this.points.push(obj);
        }
      },
      //电脑设备事件
      mouseUp(ev){
        ev = ev || event;
        ev.preventDefault();
        if(1){
          let obj={
            x:ev.offsetX,
            y:ev.offsetY
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x:-1,y:-1});
          this.isDown=false;
        }
      },
      //移动设备事件
      touchEnd(ev){
        ev = ev || event;
        ev.preventDefault();
        console.log(ev);
        if(ev.touches.length == 1) {
          let obj={
            x:ev.targetTouches[0].clientX,
            y:ev.targetTouches[0].clientY-48
          };
          this.canvasTxt.beginPath();
          this.canvasTxt.moveTo(this.startX, this.startY);
          this.canvasTxt.lineTo(obj.x, obj.y);
          this.canvasTxt.stroke();
          this.canvasTxt.closePath();
          this.points.push(obj);
          this.points.push({x:-1,y:-1});
        }
      },
      //重写
      overwrite(){
        this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
        this.points=[];
      }
    }
  }
</script>

<style scoped>
  .signatureBox{
    /*position: absolute;*/
    /*bottom: -60px;*/
    /*width: 100%;*/
    /*height: 100%;*/
    box-sizing: border-box;
    overflow: hidden;
    background: red;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  .visaDetailTop{
    /*position: absolute;*/
    /*top: 0px;*/
    /*left: 0px;*/
    width: 100%;
    /*overflow: hidden;*/
    padding: 5px;
    box-sizing: border-box;
    z-index: 2;
    border-bottom: 1px solid #e5e5e5;
  }
  .visaDetailTop p{
    margin: 0px;
    text-align: center;
    color: #000;
    font-size: 1em;
    position: relative;
  }
  p.visaTitle{
    width: 100%;
    position: absolute;
    top: 5px;
    left: 0px;
    text-align: center;
    font-size: 1.2em;
  }
  .btnBack{
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: transparent;
    border-color: transparent;
    outline: none;
  }
  .btnDaoHang{
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 2.2em;
    width: 2em;
    z-index: 1;
    background: transparent;
    border-color: transparent;
    outline: none;
  }
  .visaDetailTop p span{
    color: #fff;
    font-size: 1.2em;
  }
  .visaDetailTop p:first-of-type{
    float: left;
  }
  .visaDetailTop p:nth-of-type(2){
    float: right;
  }
  .canvasBox{
    padding: 10px 5px;
    box-sizing: border-box;
    flex: 1;
  }
  canvas{
    /*border: 1px solid #71b900;*/
  }
  .btnBox{
    height: 30px;
    padding: 5px;
    text-align: right;
    line-height: 30px;
  }
  .btnBox button:first-of-type{
    border: 1px solid #71b900;
    background: transparent;
    border-radius: 4px;
    padding: 5px 10px;
  }
  .btnBox button:last-of-type{
    border: 1px solid #71b900;
    background: #71b900;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
  @media only screen and (min-width: 750px){
    .signatureBox{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      overflow: visible;
    }
  }
</style>
