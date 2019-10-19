<template>
  <div class="paymentv">
      <!-- 热力编号 绑定   -->
      <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />  在线缴费
       </header>
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <ul class="content_topx">
         <van-list  v-model="loading"  :finished="finished"  finished-text="没有更多了"  @load="onLoad">
         <li   v-for="item in list" :key="item.id">
            <none v-if="!list" />
              <p class="paymentv_top">热力编号:&nbsp {{item.heat_no}}</p>
              
              <p style="position: relative;margin-top:0.16rem;" class="paymentv-conte"> {{item.head_name}}  <span class="line" ></span> <span class="paymentv-box"> {{item.mechanism_name}}</span></p>
 <p style="position: relative;margin-top:0.16rem;margin-bottom:0.45rem;" class="paymentv-conte ">供暖时间:<span class="paymentv-box" style="letter-spacing: 0.06em;">{{item.buy_time}}</span></p>
              
              <div class="line_top"></div>
            <div class="box" >
           
                <p>
                    缴费金额: <span> &nbsp ¥{{item.total_price}}</span>
                </p>
                <router-link :to="'/payment'+item.order_id" tag="div" class="btn">查看</router-link>
             </div>
             
            
         </li>
         </van-list>
       </ul>
         </van-pull-refresh>
  </div>
</template>

<script>
import {orderList} from '@/api/paymentv'
import none from '../components/none.vue'
import {request } from '../utils/loadmore'
export default {

  data () {
    return {
      list:[],
      page_index:1,
       page_size:4,
       isLoading: false,
       loading: false,
       finished: false,
       total:0,
        timer:1,
    }
  },

  methods: {
    onRefresh(){
       this.page_index=1
      this.onLoad()

    },
    onLoad(){
       if(this.timer==2){
        return
      }
        const c={
      token:this.$store.state.token,
     page_size:this.page_size,
      page_index:this.page_index,
      order_state:1
    }
     request(this,orderList(c))
    }
      
  },

  created () {

  }
}
</script>

<style lang='less' scoped>

  .paymentv {
    min-height:100vh;
    padding-bottom: 25px;
      padding-top: 120px;
      background: #eee;
      .content_topx {
          width: 700px;
          
          margin: 0 auto;
          padding-top:7px;
          .line {
              height:26px;
              
              position: absolute;
              display: inline-block;
               width:1Px;
               background:#ccc;
               top:-5px;
               margin:10px;
          }
          .paymentv-box {
            padding-left: 30px;
          }
          li {
            
              padding: 36px 26px 0;
               margin-top:20px;
              width: 700px;
              height: 305px;
              border-radius: 8px;
              background: #fff;
          .paymentv_top {
              color: #1c1b1b;
              font-size: 30px;
             
          }
          
        
          }
            .line_top {
              /* 这是模拟的边框 */
            width: 700px;
            height: 1Px;
            background:#eee;
            margin-left: -26px;
          }
          .box {
            display: flex;
            justify-content: space-between;
            height: 105px;
            line-height: 105px;
           p {
              font-size: 26px;
              color: #313131;
              > span {
                font-size: 32px;
              }
           }
            .btn {
              width: 120px;
              margin-top:30px;
              height: 46px;
              line-height: 50px;
              border:1Px solid #3399ff;
              text-align: center;
              font-size: 26px;
              color: #3399ff;
              border-radius: 21px;
              

            }

          }

      }
      .paymentv-conte {
        color: #595959;
        font-size: 24px;

      }

  }
</style>