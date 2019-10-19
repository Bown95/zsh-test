<template>
  <div class="home">
      <header class="header_xwx">首页</header>
      <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#3399ff">
       <van-swipe-item v-for="item in 4 " :key="item">
          <img src="../assets/images/index_02.jpg" alt="">
       </van-swipe-item>
    </van-swipe>
   
    <!-- 公告 -->
    <div class="banner">
       <div class="title clearfix">
          <h2 style="font-size:0.5rem;">公告</h2>
          <router-link to="/about" tag="span" style="font-size:0.4rem;" >更多</router-link>
       </div>
       <div class="img">
          <div class="content"> 
             <h3>缴自来水费拿居家好礼</h3>
             <p>百元水费优惠券快来抢 </p>
          </div>
          <img src="../assets/images/index-jiaofei_03.jpg" alt="">
          <div class="boottom">
             <h3>缴费通知</h3>
          </div>
       </div>
      
       
    </div>

    <div class="home_container">
       <div class="content_box clearfix" v-for="item in list" :key="item.id">
          <router-link :to="'/detail/'+item.id+'/1'" tag="div" class="announcement fl">
           <p  class="top"  >{{item.title}}</p>
           <p class="bottom">{{item.summary }}</p>
          </router-link>
         <div class="bosx fr">
           
            <img :src=" $store.state.imgapi+'155/155/0/'+item.main_img" alt="">
         </div>
       </div>
    
    </div>
     <tabbar/>
   
  </div>
</template>
<script>
  import tabbar from '../components/tabbar.vue'
  import {tim} from '../utils/time'
  import {test,fetchlist} from '@/api/home'
export default {
  name: 'home',
   data() {
    return {
      active: 'home',
      list:[]
    }
  },
  components: {
    tabbar
  },
 methods: {
    
 is_weixn(){
 

let ua = navigator.userAgent.toLowerCase();  

if(ua.match(/MicroMessenger/i)=="micromessenger") { 
 /* alert('我是在微信')  */
 this.$router.push('/v')
  
  

} 

}  

 },

 created(){

    this.is_weixn()
     const c={
        category_id:0,
        page_index:1,
        page_size:2,
        article_type:1
     }
   fetchlist(c).then(res=>{
     
      if(res.data.code==1){
          this.list=res.data.data
      }
   })
   
    
 }

 
}
</script>
<style  lang="less" scoped>
   .home {
     
     padding-top: 120px;
       background: #eee;
       padding-bottom: 70px;
       .foottabbar {
           background: #eee;
       }
       .header_xwx {
       height: 120px;
       width:100%;
       position: fixed;
       top:0;
       width: 100%;
       text-align: center;
       color: #fff;
       background: #3399ff;
       font-size: 36px;
       line-height: 120px;    
       letter-spacing: 0.1em;
       z-index:1;

  }
     
      .banner{
        
         margin: 16px 27px 0;
         background: #fff;
         border-radius: 10px 10px 0 0;
         padding:32px;
         .title {
            padding-bottom: 28px;
            h2 {
               float: left;
               font-size: 34px;
               color:#313131;
               font-weight: 700;
               letter-spacing: 0.1em;
            }
            span {
               float: right;
               font-size: 24px;
               color:#999;
            }
         }
         .img {
            letter-spacing: 0.1em;
            position: relative;
             height: 228px;
           img {
              width: 100%;
              height: 100%;
             
           }
           .content {
              position: absolute;
              top:0;
              width: 100%;
              padding-top:74px;
              text-align: center;
              color: #fff;
              h3 {
                 font-size: 36px;
                 font-weight: 700;
                
              }
              p {
                 padding-top:6px;
                  font-size: 24px;
              }

           }
           .boottom {
              
              height: 53px;
              width: 100%;

              background: rgba(0, 0,0, .5);
              line-height: 53px;
              position: absolute;
              bottom: 0;
              left: 0;
              padding-left:25px;
             color: #fff;
              font-size: 24px;
              


           }
         }

         
      }
      /* 公告页面布局 */
         .content_box {
            overflow: hidden;
            border-top: 1Px solid #eee;
            margin: 0 27px;
            background: #fff;
            padding:0 32px;
          //  padding-top:35px;
             padding-top:55px;
        //    padding-bottom: 55px;
           // margin-bottom: 55px;

          .announcement {
               line-height: 48px;
             width: 442px;
             .top {
                font-size: 30px;
                color: #313131;
               
               // font-weight: 700;
               
             }
            
             .bottom {
                color: #595959;
                font-size: 24px;
                 line-height: 46px;
                 margin-bottom: 50px;
                
             }
          }
          .bosx {
             width: 155px;
             height: 155px;
             img {
                width: 100%;
             }
          }

         }
         .content_box:first-child {
              padding-top:25px;
            border-top:0;
         }
         .content_box:last-child {
           
            border-radius:0px 0px 10px 10px;
            margin-bottom:70px;
         }
          /* 公告页面布局结束 */
        
 
   
   }
</style>
<style lang="less">
/* 这个地步固定导航栏是要封装组件的 */
.foottabbar {
   .van-tabbar-item{
      font-size: 18px;
   }
   .van-icon {
      font-size: 42px;
   }
   
}
.home {
    .van-swipe__indicator {
         width: 12px;
         height: 12px;
         border-radius: 50%;
         background: #fff;
      }
      .van-swipe-item {
         img {
            width:100%;
         }
      }
      .van-swipe__indicator {
      opacity: 1;
   }
}
</style>
