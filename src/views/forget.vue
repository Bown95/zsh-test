<template>
  <div class="forget">
   <header class="header_xwx" style="background:#F6F6F6;color:black;">
        <van-icon @click="goback" class="icon_ziti" name="arrow-left" color="#4c4c4c" />忘记密码
    </header>
       <!-- 页面部分 -->
               <div class="input">
          <van-cell-group>
             <van-field 
               v-model="formData.phone"
               clearable
              label="手机号"
               placeholder="请输入手机号"
               :error-message='phoneError'
                @focus="phoneError=''"
               error-message-align='right'
              />
              <div class="content">
                     <van-field ref="inputcode"  v-model="formData.sms_code"  @focus="codeError=''"  :error-message='codeError'    error-message-align='left' label="验证码"  :placeholder="codetitle" />
                     <!-- <span>获取验证码</span> -->
                     <van-button @click="getcode" :disabled="disabled"  plain hairline type="danger">{{btntxt}}</van-button>
              </div>
             
               <van-field
                v-model="formData.password"
                type="password"
                 clearable
                label="密码"
                placeholder="请输入密码"
                :error-message='passError'
                @focus="passError=''"
                error-message-align='right'
                
              />
              <van-field class="makesure"
                v-model="formData.repassword"
                type="password"
                 clearable
                label="确认密码"
                placeholder="请输入密码"
                :error-message='passagainError'
                 @focus="passagainError=''"
                error-message-align='right'
                
              />
   
          
          </van-cell-group>
          
          <div style="margin-top:0.7rem;padding:0 10px;" >
           <van-button @click="sure" style="height:1.2rem;border-radius:0.15rem;font-size:0.4rem;   letter-spacing: 0.1em;" color="#3399ff" block>确认</van-button>
       </div>
         </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import {sms } from '@/api/register'
import {forget} from '@/api/forget'
export default {
 components: {
   
  },
  data () {
     return {
      formData:{
        phone:'',
        sms_code:'',
        password:'',
        repassword:'',
      },
      phoneError:'',
      codeError:'',
      passError:'',
      passagainError:'',
      codetitle:'请输入验证码',
      disabled:false,
      btntxt:'获取验证码',
      time:60,
     
    }
  },

  methods: {
    //获取验证码
    getcode(){
      //手机号验证
      if(this.formData.phone.length==0){
      this.phoneError='手机号不能为空'
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.formData.phone))){
      this.phoneError='手机号格式不正确'
       return
    } else {
      this.phoneError=''
      const s={
        phone:this.formData.phone,
       code_type:2
      }
      sms(s).then(res=>{
         if(res.data.sms_code==1){
           Dialog.alert({ message: '验证码已发送,请注意查收' })
         }
      })

    }
    this.timer();
    },
     timer() {
         if (this.time > 0) {
             this.disabled=true;
              this.time--;
              this.btntxt=this.time+"秒";
              setTimeout(this.timer, 1000);
         } else{
              this.time=60;
              this.btntxt="发送验证码";
              this.disabled=false;
         }
    },
    goback(){
        this.$router.go(-1);
     },
      sure(){
      
    if(this.formData.phone.length==0){
      this.phoneError='手机号不能为空'
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.formData.phone))){
      this.phoneError='手机号格式不正确'
       return
    } else {
      this.phoneError=''
     
    
    }
    //验证码
    if(this.formData.sms_code.length==0){
      
     
    
       Dialog.alert({
        message: '验证码不能为空'
      }).then(() => {
        // on close
       
      });
      return

    }  else {
      this.codeError=''  
    
    }
    //密码
    if(this.formData.password.length==0){
      this.passError='密码不能为空'
      
      return
    } else if (!(/^.{6,}$/.test(this.formData.password))){
      this.passError='密码必须大于6位数'
      return
     
    } else {
      this.passError='' 
      
    }
    //确认密码
     if(this.formData.repassword.length==0){
      this.passagainError='请再次输入密码'
      return
    } else if (this.formData.repassword != this.formData.password ){
      this.passagainError='两次输入密码不一致'
      return
     
    } else {
      this.passagainError=''
      //表单效验完毕并通过 
        forget(this.formData).then(res=>{
          if(res.data.code==1){
               Dialog.alert({
        message: '密码修改成功'
      }).then(() => {
        
        this.$router.push('/login')
      });
          }
        })
           
    }

   }
  },

  created () {
  }
}
</script>
<style lang='less' scoped>
  .forget {
     padding-top: 120px;
    
  
      .login_tit {
     text-align: left;
     padding-left: 17px;
     font-size: 38px;
     font-weight: 700;
     margin-bottom: 50px ;
    
   }   
  
   .content {
     position: relative;
     .van-button {
      position: absolute;
      right: 12px;
      top:22px;
      z-index: 8;
      background: transparent;
      color: #0585FF;
     
      
     }
   }
  }
</style>


<style lang="less">
 .forget {
     .van-button--danger {
     border:1Px solid #fff;
   }
   .login_tit {
     text-align: center;
     font-size: 38px;
     font-weight: 700;
     margin-bottom: 100px;
   }
   .input {
     padding: 10px;
     span {
        font-size: 30px;
     }
     
   }
      
  }
</style>
<style lang="less">
.forget {
    background: #fff;
   .login_tit {
     text-align: center;
     font-size: 38px;
     font-weight: 700;
     margin-bottom: 100px;
   }
   .input {
      
        
        .van-field__label {
          padding-top: 10px;
          span {
            font-size: 30px;
            color: #313131;
           
          }
        }
        .van-field__control {
         
          
             padding:10px 10px 10px 20px;
        }
        .van-cell  {
           line-height: 70px;
          height: 108px;
          
        }
       
        .van-cell::after {
              border-bottom: 1Px solid #dcdcdc;
        }
   }
   
     .makesure {
       .van-field__label {
         width: 120px;
       }
     } 
      .van-field__label {
          width:1.5rem;
          padding-top:10px;
        }
         [class*=van-hairline]::after {
    border-bottom: 1Px solid #dcdcdc ;
     border-top: 3Px solid #fff;
   }
    
    .van-cell:not(:last-child)::after {
    border-bottom: 1Px solid #dcdcdc ;
      margin-left:-50px;
     
    }
    .van-field__error-message {
      margin-top: -77px;
    }
  }
</style>
