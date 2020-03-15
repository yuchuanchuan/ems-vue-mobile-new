<template>
  <div id="app" class="app-container">
    <router-view />
    </div>
</template>
<script>
  export default {
    name: 'App',
    created: function () {
      this.setting()
    },
    methods: {
      setting: function() {
        if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
          handleFontSize()
        } else {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
          }
          else if(document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', handleFontSize)
            document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
          }
        }
        function handleFontSize() {
          //设置网页字体为默认大小
          WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
          })
          //重写设置网页字体大小的事件
          WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', {
              'fontSize': 0
            })
          })
        }
      }
    }
  }
</script>
<style>
  html {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100% !important;
  }

  .app-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
