<template>
  <div class="payment">
     
      <header class="header_xwx">
          <van-icon @click="$router.push('/notes')" class="icon_ziti" name="arrow-left" />  在线缴费  
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
           <!--  <ul>
              <li class="first">
                <img src="../assets/images/20190925181856.png" alt="">
                <p>支付宝支付</p>

              </li>
              <li class="second" @click="wepy">
                 <img  class="imgg" src="../assets/images/5182024.png" alt="">
                <p>微信支付</p>
              </li>
            </ul> -->
             <ul>
              <!-- <li class="first">
                <img src="../assets/images/20190925181856.png" alt="">
                <p>支付宝支付</p>

              </li> -->
              <li class="second" @click="wepy">
                 <img  class="imgg" src="../assets/images/5182024.png" alt="">
                <p>微信支付</p>
              </li>
            </ul>
      </van-popup>
      <van-popup v-model="show1"> 
      <ul class="uuu" style="text-align:center;">
        <li>请确认微信支付是否已经完成</li>
        <li @click="shuaxin" style="color:red;"> 已完成支付</li>
        <li @click="shuaxin"> 支付遇到问题,重新支付</li>
      </ul></van-popup>
  </div>
</template>

<script>
import {orderdetail,weixinpay} from '@/api/paymentv'

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
      show1:false,
      href:'',
      
    }
  },

  methods: {
     
     gotopay(){
       this.show = true;
     },
     shuaxin(){
        this.$router.go(0)
     },
     wepy(){
       
       
  
       
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
 // alert('进入create钩子函数')
   
 //第一次进入页面刷新一次，仅一次
　　//location.href.indexOf("#")获取当前页面地址并在其中查找"#"首次出现位置，找不到就是-1
   /*  if(location.href.indexOf("#aaahhhhhhhhhmfhddxsaaf")==-1){
　　//在当前页面地址加入"#"，使下次不再进入此判断
    //alert('我是第一次进来')
    
    location.href=location.href+"#aaahhhhhhhhhmfhddxsaaf";
    location.reload();
    
    } */
    const c={
      token:this.$store.state.token,
       order_id:this.$route.params.id
    }
    
    orderdetail(c).then(res=>{
    
        if(res.data.data.order_state==2){
        
         this.$router.push('/success'+res.data.data.order_id )
        }
         console.log(res)
         this.list=res.data.data;
      
      this.order_num=res.data.data.order_no
     /*  } */
     
    })
  },
  /* beforeDestroy(){///这个方案失败了,废弃掉
    alert('组件销毁前调用执行')
     if(location.href.indexOf("#aaahhhhhhhhhmfhddxsaaf")>-1){
　　
    alert('组件销毁前还原loction.href')
    }
  } */
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
          height: 70px;
          width: 450px;
          line-height: 70px;
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
          width: 100%;
          text-align: center;
          height: 260px;
          background: #fff;
          padding-top: 40px;
           P {
              padding-top: 40px;
           }
        }
        .first {
          border-right: 1px solid #eee;
           border-radius:10px 0px 0px 10px;
           img {
             
             width: 100px;
           }
        }
        .second {
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