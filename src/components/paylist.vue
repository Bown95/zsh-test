<template>
  <div class="timer">
      <ul class="content_top">
                <li   v-for="item in list" :key="item.id">
                    
                      <p class="paymentv_top"> <span>热力编号:&nbsp {{item.heat_no}}</span>    <span class="zhi" :style="{color:item.order_state==1?'#FF7A03':''}"> {{item.order_state_name}}</span> </p>
                      
                      <p style="position: relative;margin-top:0.16rem;" class="paymentv-conte">{{item.head_name}}  <span class="line" ></span> <span class="paymentv-box">{{item.mechanism_name}}</span></p>
                      <p style="position: relative;margin-top:0.16rem;margin-bottom:0.45rem;" class="paymentv-conte ">供暖时间:   <span class="paymentv-box" style="letter-spacing: 0.06em;">{{item.buy_time}}</span></p>
                      
                      <div class="line_top"></div>
                    <div class="box" v-if="item.order_state!=-1">
           
                <p>
                    缴费金额: <span> &nbsp ¥{{item.total_price}}</span>
                </p>
                <router-link :to="'/payment'+item.order_id" tag="div" class="btn">查看</router-link>
             </div>
               <div class="box" v-if="item.order_state==-1">
           
                <p style="color:#313131;width:100%;">
      缴费金额: <span> &nbsp ¥{{item.total_price}}  </span >    <span    class="timer_xx" >请您前往公司收费处先补交</span>   <span class="timer_ww"  >欠费</span> 
 
                </p>
                
             </div>
                </li>              
           </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeshow: false,
       
    }
  },
  props:['list'],
  created(){
      
  },

  methods: {
      gont(a){
          this.$router.push('/payment'+a )
      }
  }
}
</script>

<style lang='less' scoped>
   .content_top {
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
              display: flex;
              justify-content: space-between;
              .zhi {
                font-size: 24px;
                color: #349e0b;
              }
             
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
</style>

<style lang="less">

    #app  .timer_xx {
          color:#aaa;
          font-size:26px;
      }
    #app  .timer_ww {
          color:red;
          font-size:26px;
      }

</style>