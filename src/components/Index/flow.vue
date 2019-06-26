<template>
  <div class="content">
    <div class="title">不动产登记便民邮寄</div>
    <img src="../../img/beijing.png" class="bj">
    <div class="box">不动产权证办理流程<div class="sj"></div></div>
    <div class="box1">
      <div class="item1">
          <div class="fang1">
            <div class="yuan1">1</div>
          </div>
          <div class="ft1">提交申请</div>
      </div>
      <div class="item2">
          <div class="ft2">业务费用支付</div>
          <div class="fang2">
            <div class="yuan2">2</div>
          </div>
      </div>
      <div class="item1">
        <div class="fang1">
          <div class="yuan1">3</div>
        </div>
        <div class="ft1">不动产权证交接</div>
      </div>
      <div class="item2">
        <div class="ft2">快递员派送</div>
        <div class="fang2">
          <div class="yuan2">4</div>
        </div>
      </div>
      <div class="item1">
        <div class="fang1">
          <div class="yuan1">5</div>
        </div>
        <div class="ft1">业务完成</div>
      </div>
    </div>
    <div class="tab">
      <router-link to="/contract">快速办理>></router-link>
      <img src="../../img/kdy.png">
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
body{
    width:100%;
}
.content{
    font-size:0.28rem;
}
.title{
  font-size:0.36rem;
  color:#fff;
  text-align: center;
  background:#213980;
  height:0.8rem;
  line-height: 0.8rem;
}
.bj{
  display: block;
  width:7.5rem;
}
.box{
  width:7.1rem;
  height:0.8rem;
  margin:0.2rem;
  color:#fff;
  line-height: 0.8rem;
  background:#177abf;
  border-radius: 5px;
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
  padding:0.8rem 0 0;
}
.item1{
  display: flex;
  align-items: center;
  padding-left: 2.9rem;
  margin-bottom:0.6rem;
}
.item2{
  display: flex;
  align-items: center;
  padding-right: 3.2rem;
  justify-content: flex-end;
  margin-bottom:0.6rem;
}
.fang1{
  background:#468cce;
  width:0.9rem;
  height:0.9rem;
  font-size:0.4rem;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.fang2{
  background:#0156a7;
  width:0.9rem;
  height:0.9rem;
  font-size:0.4rem;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.yuan1{
  background:#fff;
  text-align: center;
  width:0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  border-radius: 50%;
  transform: rotate(-45deg);
  color:#468cce;
}
.yuan2{
  background:#fff;
  text-align: center;
  width:0.8rem;
  height:0.8rem;
  line-height: 0.8rem;
  border-radius: 50%;
  transform: rotate(-45deg);
  color:#0156a7;
}
.ft1{
  margin-left:-0.45rem;
  height:0.8rem;
  background:#f0f0f0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding:0 0.6rem 0 0.9rem; 
  line-height: 0.8rem;
  font-size: 0.28rem;
  color:#666;
  box-shadow:0px 0.05rem 10px 0px #c6cbd6; 
}
.ft2{
  margin-right:-0.45rem;
  height:0.8rem;
  background:#f0f0f0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding:0 0.9rem 0 0.6rem;
  line-height: 0.8rem;
  font-size: 0.28rem;
  color:#666;
  box-shadow:0px 0.05rem 10px 0px #c6cbd6; 
}
.tab{
  background:#383735;
  color:#fff;
  font-size:0.36rem;
  text-align: center;
  height:1rem;
  line-height: 1rem;
  font-weight: bold;
  position:relative;
}
.tab>img{
  position:absolute;
  width:2rem;
  right:0.25rem;
  bottom:0;
  }
  .tab>a{
    text-decoration: none;
    color:#fff;
  }
</style>
