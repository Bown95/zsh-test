<template>
  <div class="box_contact" >
     <header class="header_xwx">联系客服</header>
       <div class="contact">
        
         <div class="boxswwd">
         <!--   <a class="contact_rrs" href="tel:400-425-45254">400-425-45254</a>
             <van-card  desc="油田地区:"   title="濮阳市新星清洁能源有限公司"><div slot="thumb">
                     <van-icon  class="icon-top" name="service-o" />  </div>
            </van-card>
           -->

            <!--  <van-card centered @click="docopy"
                desc="400-492-45254"  
                title="微信客服">
                  <div slot="thumb" style="margin-top:-0.14rem">
                    
                      <img class="box_mingi" style="margin-top:-0.25rem;" src="../assets/images/contact_03.jpg" alt="">
                  </div>
            </van-card> -->
         </div>
        <ul  class="contact_rr_tt">
          <li class="clearfix">
            <div class="first first_wxs">  <van-icon  class="icon-top" name="service-o" />  </div>
             <div class="two"> 
               <div  style="color:#313131;">
                 濮阳市新星清洁能源有限公司
               </div>
                <div>
                  油田地区: <a class="contact_rrs" href="tel:0393-2090049">0393-2090049</a> 
                 </div> 
                  <div>
                 清丰地区: <a class="contact_rrs" href="tel:0393-2090029">0393-2090029</a> 
                 </div> 
                  <div>
                  南乐地区: <a class="contact_rrs" href="tel:0393-2090039">0393-2090039</a> 
                 </div> 
              </div>
          </li>
        </ul>
         <ul  class="contact_rr_tt" style="margin-top:0.15rem;">
          <li class="clearfix">
            <div class="first first_next">  <van-icon  class="icon-top" name="service-o" />  </div>
             <div class="two"> 
               <div  class="wxrits" style="color:#313131;">
                中石化新星丰汇河北新能源开发有限公司 
               </div>
                <div>
                  客服1: <a class="contact_rrs" href="tel:0310-4903800">0310-4903800</a> 
                 </div> 
                  <div>
                客服2: <a class="contact_rrs" href="tel:0310-6382908">0310-6382908</a> 
                 </div> 
                  <div>
                  客服3: <a class="contact_rrs" href="tel:0310-6382909">0310-6382909</a> 
                 </div> 
              </div>
          </li>
        </ul>
         <ul  class="contact_rr_tt"  style="margin-top:0.15rem;">
          <li class="clearfix">
            <div class="first first_last" >  <van-icon  class="icon-top" name="service-o" />  </div>
             <div class="two"> 
               <div  class="wxrits" style="color:#313131;">
                 中石化新星河南新能源开发有限公司兰考分公司	
               </div>
                <div>
                  兰考地区: <a class="contact_rrs" href="tel:0371-23256626">0371-23256626</a> 
                 </div> 
                  <div>
                  兰考地区: <a class="contact_rrs" href="tel:0371-23258638">	0371-23258638</a> 
                 </div>
                  <div>
                  长垣地区: <a class="contact_rrs" href="tel:0371-23221517">0371-23221517</a> 
                 </div> 
                 
              </div>
          </li>
        </ul>
    
    
     <!--  用户反馈区域  -->
      <div class="content">
        <div class="online">在线反馈</div>
        <van-cell-group>
          <van-field class="input"
            v-model="userInfo.link_name"
              placeholder="请输入姓名"
             :error-message='errorname'
            @focus="errorname=''"
              error-message-align="right"
          />
          <van-field
            v-model="userInfo.phone" class="input"
            placeholder="请输入联系方式"
             :error-message='errortel'
             @focus="errortel=''"
              error-message-align="right"
          />
          <van-field class="inputerea"
            v-model="userInfo.content"
            type="textarea"
            placeholder="请输入反馈内容"
            :error-message='errormessage'
             @focus="errormessage=''"
              error-message-align="right"
            
          />
        </van-cell-group>
        <van-button class="btns" @click="submit" size="large" type="info">提交</van-button>
      </div>
    <tabbar  v-show="hidshow"/>
  </div>
  </div>
 
</template>

<script>
import tabbar from '../components/tabbar.vue'
/* import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify); */
import { Dialog } from 'vant';
import {contact} from '@/api/contact'
import {copy} from '../utils/copy'
export default {
 components: {
    tabbar
  },
  data () {
    return {
      active: 2,
      editable:'',
      userInfo:{
        link_name:'',
        phone:'',
        content:''
      },
      errorname:'',
      errortel:'',
      errormessage:'',
      height:'100vh',
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true  //显示或者隐藏footer
     
    }
  },

  methods: {
    docopy(){
      console.log(1)
     Dialog.alert({ message: '微信号复制成功'})
    //   Notify({ type: 'success', message: '微信号复制成功' });
      copy('400-492-45254')
      
    },
    submit(){
      if(this.userInfo.link_name.length==0){
      this.errorname='姓名不能为空'
      return
    } else {
      this.errorname=''  
    }

    if(this.userInfo.phone.length==0){
      this.errortel='联系方式不能为空'
      return
    } else if(!(/^1[3456789]\d{9}$/.test(this.userInfo.phone))){
     this.errortel='手机号格式不正确'
     return
    }
     else {
      this.errortel=''  
    }

    if(this.userInfo.content.length<5){
      this.errormessage='反馈内容不能小于5个字'
      return
    } else {
       //表单效验完毕并通过 
        this.errormessage='' 
        this.userInfo.token=localStorage.getItem('token')
           
       contact(this.userInfo).then(res=>{
         if(res.data.code==1){
            Dialog.alert({ message: '反馈成功'})
         // Notify({ type: 'success', message: '反馈成功' });
          this.userInfo.link_name=''
          this.userInfo.phone=''
          this.userInfo.content=''
         }
       })
      
      
    }


    }

  },

  watch:{
    showHeight() {
        if(this.docmHeight > this.showHeight){
            this.hidshow=false
        }else{
            this.hidshow=true
        }
    }

  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
        })()
    }
  },

}
</script>
<style lang="less" scoped>
.contact_rr_tt {
  padding:20px 15px;
  background: #fff;
  border-radius: 10px;
                .first_last,
  .first_next {
    padding-top: 20px;
    height: 240px;
    .van-icon-service-o {
       
       /*  top: 50%; */
       margin-top: 60%;
         
       }
     
  }
  .first_wxs {
    height: 200px;
  }
  li {

     div {
      float: left;
     /*  height: 168px; */
      
     }
     .first {
       border-right: 2px solid #ddd;
       width: 200px;
       position: relative;
      
       font-size: 98px;
       text-align: center;
       .van-icon-service-o {
         display: inline-block;
         margin-top: 50%;
         transform: translateY(-50%)
       }
     }
     .two {
       width: 435px;
       padding-top: 8px;
       padding-bottom: 8px;
       div {
         padding-left: 40px;
         font-size: 28px;
         line-height: 46px;
        
         color: #7f7e7e;
         a {
           color: #7f7e7e;
         }
       }

     }
  }
}
</style>
<style lang="less" >

.boxswwd {
  position: relative;
  .contact_rrs {
    position: absolute;
    top:77px;
    padding-left: 135px;;
      right: 0;
    z-index: 1;
    /* right: 233px; */
    left: 38%;
     max-height: 0.533333rem;
    color: #7d7e80;
    font-size: 30px;
  }
}
   .contact {
     .van-card__bottom, .van-card__desc {
    line-height: 0.666667rem;
}
  
    .van-card .van-card__title {
     line-height: 0.28rem;
    margin-bottom: 0.133333rem;
    
}
  .icon-top {
    color: #f3ae45;
  }
  .icon-bottom {
    color: #5bbd7d;
  }
  .van-field__control{
     //  vant input 输入框类名 
     padding-top:5px;
   
  }
 
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
textarea.van-field__control {
  height: 180px;
  line-height: 40px;
}
 .van-field__error-message {//错误提示
      margin-top: -90px;
    }
   }
 .box_contact .van-cell:not(:last-child)::after {
    
    border-bottom: 0;
   
}
</style>
<style lang='less' scoped>
 .box_contact {
   min-height: 100vh;
 }
  .contact {
    padding-top: 120px;
      /* margin-top: 120px; */
      height: 100%;
     
      padding: 132px 28px 0px;
      background-color: #eee;
      .foottabbar {
        background-color: #eee;
      }
      .content {
        padding: 30px 36px 90px;
        margin-top: 10px;
        border-radius: 8px;
        background-color: #fff;
        font-size: 21px;
        color: #3c3c3c;
        .online {
          margin-bottom: 32px;
          color: #3c3c3c;
          font-size: 28px;
        }
        .input {
          height: 86px;
          padding-top: 0px;
          line-height: 86px;
          margin-bottom: 29px;
          border-radius: 6px;
          font-size: 18px;
          color: #dbdbdb;
          border: 1Px solid #eee;
        }
        
      }
      .box_mingi {
        width: 63px;
        
      }
  }
  .van-card {
    padding: 38px 36px;
    font-size: 30px;
    border-radius: 10px;
    margin: 10px 0px;
    background-color: #fff;
    .van-card__thumb {
      
      margin-right: 45px;
      div {
        border-right: 1px solid #d7d4d4;
        text-align: center;
        padding-right: 24px;
        line-height: 100px;
        font-size: 65px;
        margin-top: -6px;
      }
    }
    .van-card__title {
      height: 30px;
     
      line-height: 33px;
    }
    .van-card__header {
        height: 70px;
        margin-top: -6px;
    }
   .van-card__content--centered {
      margin-top: -50px;
   }
  }

  .inputerea {
    height: 208px;
    border-radius: 6px;
    border: 1Px solid #eee;
  }
  .van-button {
    margin-top: 80px;
    height: 80px;
    border-radius: 6px;
    line-height: 80px;
  }
 
</style>
