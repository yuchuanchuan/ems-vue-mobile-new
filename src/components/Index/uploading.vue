<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <div class="box">上传凭证<div class="sj"></div></div>
    <div class="box1-title">
        <img src="../../img/ren.png">
        <div>产权人身份证明</div>
    </div>
    <div @click="monidianji1" class="box1">
        <div v-show="show1">身份证正面</div>
        <img :src=imageSave1 id="portrait1" class="img" cap ture="camera"/>
    </div>
    <input type="file" name="image myphoto" accept="image/*" capture="user" id="saveImage1" class="myinput">
    <div @click="monidianji2" class="box1">
        <div v-show="show2">身份证反面</div>
        <img :src=imageSave2 id="portrait2" class="img" capture="camera"/>
    </div>
    <input type="file" name="image myphoto" accept="image/*" capture="user" id="saveImage2" class="myinput">
    <div class="box1-title">
        <img src="../../img/shu.png">
        <div>不动产登记受理凭证(上传图片)</div>
    </div>
    <div @click="monidianji3" class="box1">
        <div v-show="show3">上传凭证</div>
        <img :src=imageSave3 id="portrait3" class="img" capture="camera"/>
    </div>
    <input type="file" name="image myphoto" accept="image/*" capture="user" id="saveImage3" class="myinput">
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
                show3:true
            }
        },
        methods:{
            jump(){
                this.$router.push("/tip")
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
    },
    mounted(){
        this.yulan1();
        this.yulan2();
        this.yulan3();
    }
}
</script>
<style scoped>
body{
    width:100%;
}
.content>.title{
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
.box1{
    width:5.2rem;
    height:3rem;
    background:#f2f2f2;
    margin:0 1.25rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
}
.img{
    display: block;
    height:100%;
    position:absolute;
    z-index:2;
}
.box1>div{
    font-size:0.28rem;
    position: absolute;
    z-index:1;
}
.box1-title{
    height:1rem;
    display: flex;
    align-items: center;
    padding:0 0.6rem;
    font-size:0.28rem;
    color:#333;
}
.box1-title>img{
    width:0.4rem;
    margin-right: 0.1rem;
}
.myinput{
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
</style>
