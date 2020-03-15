import Vue from 'vue'


export default {
  
   myAlert:function(txtMsg, self) {
    self.$confirm(txtMsg + '<br/><b>点击任意处关闭</b>', '提示：', {
      // confirmButtonText: '确定',
      showCancelButton: false,
      dangerouslyUseHTMLString: true,
      showConfirmButton: false,
      closeOnClickModal: true
    })
  }
}
