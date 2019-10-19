<template>
  <div class="notice">
      <!-- 公告 -->
       <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />公告

       </header>
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
               <div class="ww">
          <div class="banner">
      
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
           <van-list  v-model="loading"  :finished="finished"  finished-text="到底了"  @load="onLoad">
              
                   <div class="content_box clearfix" v-for="(item,index) in list" :key="index">
                      <none v-if="!list" />
                           <router-link :to="'/detail/'+item.id+'/1'" tag="div" class="announcement fl">
                        <p  class="top"  >{{item.title}}</p>
                        <p class="bottom">{{item.summary}}</p>
                        </router-link>
                        <div class="bosx fr">
                        <img :src=" $store.state.imgapi+'155/155/0/'+item.main_img" alt="">
                        </div>
                   </div>

           </van-list>
           
       </div>


       </div>    
          </van-pull-refresh>
       
   
  </div>
</template>

<script>
import none from '../components/none.vue'
import {fetchlist} from '@/api/home'
 import {request } from '../utils/loadmore'
export default {
    components: {
    none
  },
  data () {
    return {
        isLoading: false,
       list:[],
       loading: false,
       finished: false,
       page_index:1,
       total:0,
       page_size:6,
       timer:1,
       
    }
  },

  methods: {
    
     onLoad() {
      // 异步更新数据
      if(this.timer==2){
        return
      }
         const c = {
        category_id:0,
        page_index: this.page_index,
        page_size: this.page_size,
        article_type: 1,
    }
    request(this,fetchlist(c))
     
     
    
       
     
    },
     onRefresh() {

       this.page_index=1
      this.onLoad()
    }
    
  },


}
</script>

<style  lang="less" scoped>
 
 .notice {
      padding-top: 120px;
    background: #eee;
    padding-bottom: 30px;
   .ww {
 
  padding-top:15px;
   
  
   .header_xwx {
     position: fixed;
      top:0;
       height: 120px;
       width: 100%;
       width: 750px;
       text-align: center;
       color: #fff;
       background: #3399ff;
       font-size: 36px;
       line-height: 120px;    
       letter-spacing: 0.1em;

  }
    .banner{
         /* height: 800px; */
         margin: 16px 27px 0px;
         background: #fff;
        /*  border-radius: 10px; */
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
              padding-top:5px;
            border-top:0;
         }
         .content_box:last-child {
           
           // border-radius:0px 0px 10px 10px;
            padding-bottom:70px;
         }
          /* 公告页面布局结束 */

  
 }
 }
 
   
</style>
<style >

.van-loading__spinner--circular  {
   
   display: none;
}
.van-pull-refresh__head {
   top: -0.8rem;

}

</style>