<template>
  <div class="detail">
      <!-- 公告详情页 -->
      <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />
         {{ state ? '公告':'问题' }}详情
       </header>
       <div class="center">
            <h2 style="text-align:center;">{{list.title}} </h2>
            <p style="text-align:right;" >  {{list.create_date}} </p>
       <p  style="margin-bottom:30px;" ref='xxx' class="detailtop  yyy" v-html="list.content">
       </p>
       <p  class="detail_bottom">
        {{list.description}}
       </p> 
       
       </div>
  </div>
</template>
<script>
import {detail}from '@/api/detail'
export default {

  data () {
    return {
        list:{},
        state:''
    }
  },
  created () {
      //this.$refs.xxx.style.color = 'red'
     this.state=this.$route.params.w-0
      detail(this.$route.params.id).then(res=>{
          if(res.data.code==1){
              this.list=res.data.data;
    
          }
         
      })
     
  }
}
</script>
<style  lang="less">
    .detail {
        background: #fff;
       padding-top: 120px;
        .center {
            width: 700px;
            margin:0 auto;
            padding-top: 33px;
            padding-bottom: 88px;
            h2 {
                font-size: 36px;
                color: #313131;
               
            }
            p {
                padding-top:20px;
                font-size: 28px;
                color: #595959;
                img {
                  margin-bottom: 30rpx;
                  color: blue;
                }
            }
              .imgbox {
            padding-top: 43px;
            img {
                width: 700px;
              }
           }
         
            .detail_bottom{
                   font-size: 28px;
                color: #595959;
                line-height: 54px;
            }
        }
     
    }
 
   
</style>
<style >
 .detail .detailtop img {
   vertical-align: baseline;
   
 }
</style>
