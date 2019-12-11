<template>
  <div class="payment">
     
      <header class="header_xwx">
          <van-icon @click="goto" class="icon_ziti" name="arrow-left" />  在线缴费  
       </header>
       <ul class="payment_content">
         <li>
           <span>金额</span>
           <span class="payment_h"> ¥{{list.total_price}}</span>
         </li>
         <li>
              <span>热力编号</span>
           <span class="payment_h">{{list.heat_no}}</span>
         </li>
         <li>
            <span>  户主</span>
             <span class="payment_h">{{list.head_name}}</span>
          
         
         </li>
         <li>
             <span>供暖时间</span>
           <span class="payment_h">  {{list.buy_time}}</span>
         
         </li>
         <li class="typtex"> 
            <span>地址信息</span>
           <p style="word-break: break-all"  class="payment_h"> {{list.address}}</p>
         
         </li>
         <li >
            <span>机构名称</span>
           <span class="payment_h ">  {{list.mechanism_name}}</span>
         
         </li>
        
       </ul>
       <div class="payment_btn">
           <van-button @click="gotopay" style="height:1.1rem;border-radius:0.15rem;font-size:0.4rem;   letter-spacing: 0.1em;" color="#3399ff" block>立即缴费</van-button>
       </div>
      <van-popup class="paymme" v-model="show">
        <van-icon @click="show=false" class="iconfo" name="close" />
          
              <ul>
              
              <li class="second" @click="wepy">
                 <img  class="imgg" src="../assets/images/5182024.png" alt="">
                <p >微信支付</p>
              </li>
              <li class="first"  @click="alipayment" >
                <img src="../assets/images/20190925181856.png" alt="">
                <p>支付宝支付</p>

              </li>
            </ul>
      </van-popup>
     
     
  </div>
</template>

<script>
import {orderdetail,weixinpay,alipay} from '@/api/paymentv'
import {storage} from '../utils/localstorage'
import {go} from "@/utils/go"
export default {

  data () {
    return {
      list:{},
      show: false,
      order_num:'',
      nonce_str:'',
      package:'',
      pay_sign:'',
      time_stamp:'',
      mweb_url:'',
      appId:'',
      
      href:'',
      
    }
  },

  methods: {
    goto(){
     // this.$router.push('/notes')
     storage(3)
      this.go('/notes')
    
      
    },
    go,
   
    alipayment(){
      
      let c={
         token:this.$store.state.token,
         order_no:this.order_num,
         quit_url :this.$store.state.httphost+"/#/payment"+this.$route.params.id,
         return_url:this.$store.state.httphost+"/#/success"+this.$route.params.id
                  
      }
      alipay(c).then(res=>{
        if(res.data.code==1){
          console.log(res.data.data)
          const div = document.createElement('div');
           div.style.display="none";
          div.innerHTML = (res.data.data);  //res.data是返回的表单
         document.body.appendChild(div);
          document.forms.alipaysubmit.submit();
        }
      })
    },
     gotopay(){
       this.show = true;
     },
     shuaxin(){
        this.$router.go(0)
     },
     wepy(){
       
      storage(1)
  
       
         let cc ={
         token:this.$store.state.token,
         order_num:this.order_num,
         isjsapi :false,
         openid :""
         }
       weixinpay(cc).then(res=>{
        
         console.log(res.data.data)
         this.nonce_str=res.data.data.nonce_str;
       
         this.package=res.data.data.package;
         this.pay_sign=res.data.data.pay_sign,
         this.time_stamp=res.data.data.time_stamp;
         this.mweb_url=res.data.data.mweb_url;
       
       window.location.href=this.mweb_url+"&redirect_url="+encodeURIComponent(this.$store.state.httphost+"/#/success"+this.$route.params.id)
   
       })
       setTimeout(()=>{
        this.show=false;
       },300)
  
      
      
  









//前台发起微信支付
  /*  WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
         "appId":"wxbbf5ec86930d8424",     //公众号名称，由商户传入     
         "timeStamp":this.time_stamp,         //时间戳，自1970年以来的秒数     
         "nonceStr":this.nonce_str, //随机串     
         "package":this.package,     
       //  "signType":"MD5",         //微信签名方式：     
         "paySign":this.pay_sign //微信签名 
      },
      function(res){
    
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
      // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
           alert('恭喜你支付成功')
      } 
   });  */


     }
     
     
  },

 created () {
 
    const c={
      token:this.$store.state.token,
       order_id:this.$route.params.id
    }
    
    orderdetail(c).then(res=>{
    
        if(res.data.data.order_state==2){
        
         this.$router.push('/success'+res.data.data.order_id )
        }
        // console.log(res)
         this.list=res.data.data;
      
      this.order_num=res.data.data.order_no
     /*  } */
     
    })
  },
  destroyed(){
    this.show=false;
  }
  
}
</script>

<style lang='less' scoped>

  .payment {
    height:100vh;
      padding-top: 120px;
      background: #fff;
      .uuu {
        border-radius: 35px;
        li {
          height: 100px;
          width: 450px;
          line-height: 100px;
          border-bottom: 1px solid #ccc;
          
        }
      }
   .imgg {
            width: 85px;
            
          }
      .payment_content {
        li {
          border-bottom: 1Px solid #eee;
          min-height: 105px;
          line-height: 105px;
          padding:0 25px;
          display: flex;
          justify-content: space-between;
          font-size: 26px;
          color: #313131;
          

        }
        .payment_h {
          font-size: 30px;
        }
        .typtex {
          padding-top: 15px;
          span {
            display: inline-block;
            width: 320px;
          }
          p {
             line-height: 45px;
             text-align: right;
          }
        }
      }
     .payment_btn {
       padding-top:86px;
       width: 695px;
       margin:0 auto;
       
       
     }
   
  }
</style>
<style lang="less">

    .paymme {
      width: 480px;
      height: 360px;
      border-top: 1px solid transparent;
      background: transparent;
      ul{
        margin-top: 40px;
        width: 430px;
      height: 230px;
       position: relative;
        li {
          border-radius:10px 10px 10px 10px;
         float: left;
        
         
           width: 50%;
          text-align: center;
          height: 260px;
          background: #fff;
          padding-top: 40px;
       
         
           P {
              padding-top: 37px;
              letter-spacing: 0.07em;
              font-size: 28px;
             
           }
        }
        .first {
          border-right: 1px solid #eee;
           border-radius:0px 10px 10px 0px;
           img {
            
             width: 1.39rem;
           }
        }
        .second {
          
            border-radius:10px 0px 0px 10px;
          padding-top: 48px;
          p {
              padding-top: 48px;
          }
        }
      }
      .iconfo {
        position: absolute;
        right: 0;
        color: #fff;
        font-size: 40px;
      }
    }
    .payment {
      .van-popup--center {
        border-radius: 10px;
      }
    }
</style>