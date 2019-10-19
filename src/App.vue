<template>
  <div id="app" ref="app">
    
    
    <router-view/>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
//  @import './assets/css/common.css';

#app {

  .header_xwx {
       height: 120px;
       position: fixed;
       z-index: 8888;
       top:0;
       width: 100%;
       text-align: center;
       color: #fff;
       background: #3399ff;
       font-size: 36px;
       line-height: 120px;    
       letter-spacing: 0.1em;
     .icon_ziti{
      position: absolute;
      left: 13px;
      top:50%;
      transform: translateY(-50%);
      font-size: 55px;
      font-weight: 500;
     }
  }
 
  
}
 .van-notify--success {
    height: 120px;
    font-size: 30px;
    line-height: 100px;
}
/* 错误提示 */
 .van-field__error-message {
     
     width: 330px;
     float: right;
    }
   #app .inputerea  {
      .van-field__error-message  {
        margin-top: -180px;
      }
    }
    .van-dialog {
      width: 70%;
    }
</style>
