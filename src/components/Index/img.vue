<template>
  <div>
    <div class='fuceng'>
        <img v-image-preview src="../../img/chaxundingdan.png"></img>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      is_fangda:false
    }
  },
   created(){
        
        this.getSrc()
        this.removeMeta()
    },

    methods: {
      getSrc(){
        var src = this.$route.params.img
        this.src = src
        console.log(src)
      },
      removeMeta(){
        var meta = document.getElementsByTagName('meta')['viewport-user']
        console.log(meta)
      }
    }
}
</script>

<style scoped>
    .fuceng{
        position:fixed;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.3);
    }
    .fuceng img{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        width:100%;
    }
</style>
