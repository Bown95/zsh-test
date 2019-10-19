<template>
  <div class="recording">
   <header class="header_xwx">保障记录</header>
   <!-- 这是维修报障表单区域 -->
   <div class="recording_content">
     <van-cell-group>
      <van-field v-model="reportInfo.userName" placeholder="姓名" />
      <van-field v-model="reportInfo.iphone" placeholder="联系方式" />
      <van-field class="areainfo"
      v-model="reportInfo.message"
      type="textarea"
      placeholder="报障内容"
    />
    </van-cell-group>
    <van-button size="large" type="info">提交</van-button>
   </div>
    <tabbar/>
  </div>
</template>
<script>
import tabbar from '../components/tabbar.vue'
export default {
 components: {
   tabbar
  },
  data () {
    return {
      reportInfo:{
        userName:'',
        iphone:'',
        message:''
      }
    }
  },

  methods: {},

  created () {
  }
}
</script>
<style lang='less'>

  .van-field__control::-webkit-input-placeholder{/*Webkit browsers*/
    color:#999;
    font-size:30px;
  }
.van-field__control:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
   color:#999;
   font-size:30px;
}
.van-field__control::moz-placeholder{/*Mozilla Firefox 19+*/
   color:#999;
   font-size:30px;
}
.van-field__control:-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
    font-size:30px;
}

</style>

<style lang="less" scoped>
//  html,body,#app {
//       height: 100%;
//     }
  .recording {
       height: 100vh;
      padding-top: 120px;
      background-color: #eee;
    .recording_content {
      padding: 20px 28px 0px;
     /*  margin-top: 120px; */
      .van-cell-group {
         background-color: #eee;
        .van-cell {
          height: 90px;
          line-height: 90px;
          padding: 0px 35px;
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 8px;
          
          
        }
      }
      .van-button {
        height: 80px;
        margin-top: 82px;
        border-radius: 8px;
        font-size: 34px;
        letter-spacing: 0.2em;
      }
     
    }  
  }
  .areainfo {
    height: 232px!important;
    font-size: 36px;
    textarea {
      line-height: 40px;
    }
  }
</style>
