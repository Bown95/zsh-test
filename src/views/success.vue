<template>
  <div class="success">
      <!-- 缴费成功页面   -->
      <header class="header_xwx">
          <van-icon @click="$router.push('/notes')" class="icon_ziti" name="arrow-left" />  在线缴费  
       </header>
       <div class="success_container">
          <p>-¥ {{list.total_price}}</p>
          <p class="next">缴费成功</p>
       </div>
       <ul class="success_content">
         <li>
           <span>热力编号</span>
           <span>{{list.heat_no}} </span>
         </li>
          <li>
            <span>  户主</span>
             <span>{{list.head_name}}</span>
          
         
         </li>
         <li>
             <span>供暖时间</span>
           <span>  {{list.buy_time}}</span>
         
         </li>
         <li class="typtex"> 
            <span>地址信息</span>
           <p style="word-break: break-all"  class="payment_h"> {{list.address}}</p>
         
         </li>
         <li>
            <span>机构名称</span>
           <span>  {{list.mechanism_name}}</span>
         </li>
           <li>
              <span>缴费时间</span>
           <span>{{ timeformat(list.pay_time) }}</span>
           
         </li>
           <li>
              <span>订单号</span>
           <span>{{list.order_no}}</span>
         </li>
        
        
       </ul>
       <div class="content">
          <span>公章</span>
          <div class="img_box">

       <!--    <img :src="$store.state.imgapi+'126/126/0/'+list.stamp_img" alt="">
        -->
        <img :src="$store.state.imgapi+'136/136/1/'+list.stamp_img" alt="">
          </div>
       </div>
      
       <tabbar/>
  </div>
</template>

<script>
import { Dialog } from 'vant';
 import tabbar from '../components/tabbar.vue'
import {orderdetail} from '@/api/paymentv'
import {timeformat} from "@/utils/time"
import axios from 'axios'
export default {
 components: {
    tabbar
  },
  data () {
    return {
      list:{},
    }
  },

  methods: {
       timeformat,
       goback(){
        this.$router.go(-1);
     },
     
  },

  created () {
   
     alert('即将前往支付结果查看页面')
    const c={
      token:this.$store.state.token,
       order_id:this.$route.params.id
    }
  
     
    orderdetail(c).then(res=>{
      if(res.data.data.order_state==1){
        
         this.$router.push('/payment'+this.$route.params.id )
         return
        }
      console.log(res)
      this.list=res.data.data;
      
      this.order_num=res.data.data.order_no
    })
  }
}
</script>

<style lang='less' scoped>

  .success {
    height:100vh;
      padding-top: 120px;
      background: #fff;
      .success_container {
        height: 198px;
        text-align: center;
        padding-top:66px;
        font-size: 46px;
      .next {
        padding-top:18px;
        font-size: 26px;
        color: #349e0b;
      }

      }
   
      .success_content {
        li {
          border-bottom: 1Px solid #eee;
          min-height: 105px;
          line-height: 105px;
          padding:0 25px;
          display: flex;
          justify-content: space-between;
          font-size: 30px;
          color: #313131;

        
      }
     .success_btn {
       padding-top:86px;
       width: 695px;
       margin:0 auto;
       
       
     }
     .content {
      padding:40px 25px 0;
      display: flex;
      justify-content: space-between;
     font-size: 30px;
     .img_box {
      padding-top: 8px;
      width:126px;
      
      img {
        width: 100%;

      }

     }
     }
   .typtex {
          padding-top: 20px;
          span {
            display: inline-block;
            width: 330px;
          }
          p {
            padding-top: 8px;
             line-height: 45px;
             text-align: right;
          }
        }
  }
</style>