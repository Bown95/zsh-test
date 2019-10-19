<template>
  <div class="login">
      <p class="login_tit">欢迎来到中石化集中缴费系统</p>
      <div class="input">
         <van-cell-group>
              <van-field
                v-model="formData.phone"
                
                clearable
                label="手机号"
                
                placeholder="请输入手机号"
                 :error-message='phoneError'
                error-message-align="right"
                @focus="phoneError=''"
              />

              <van-field
                v-model="formData.password"
                type="password"
                label="密码"
                :error-message='passError'
                @focus="passError=''"
                error-message-align="right"
                 clearable
                placeholder="请输入密码"
                
              />
             <!--  <van-cel/> -->
          </van-cell-group>
      </div>
      <router-link to="/forget" class="forget fr "> 忘记密码 </router-link>
         <div style="padding-top:2.37rem;" >
           <van-button   @click="login" style="height:1.1rem;border-radius:0.15rem;font-size:0.4rem;   letter-spacing: 0.1em;" color="#3399ff" block>登录</van-button>
       </div>
         <div style="margin-top:0.64rem;;">
           <van-button  to="/register" plain style="height:1.1rem;border-radius:0.15rem;font-size:0.4rem;   letter-spacing: 0.1em;border:1Px solid #3399ff;" color="#3399ff" block>注册</van-button>
       </div>
        
  </div>
</template>

<script>
import {login} from '@/api/login'
export default {

  data () {
    return {
      formData:{
        phone:'',
        password:''
      },
      phoneError:'',
      passError:''
    }
  },
  methods: {
   login(){

    if(this.formData.phone.length==0){
      this.phoneError='手机号不能为空'
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.formData.phone))){
      this.phoneError='手机号格式不正确'
       return
    } else {
      this.phoneError=''  
    
    }
    if(this.formData.password.length==0){
      this.passError='密码不能为空'
      return
    } else if (!(/^.{6,}$/.test(this.formData.password))){
      this.passError='密码必须大于6位数'
      return
     
    } else {
      this.passError='' 
     
      login(this.formData).then(res=>{
        console.log(res.data)
        
        if(res.data.code==1){
        
       const token=res.data.data
     
       this.$store.commit('setToken',token) 
           this.$router.push('/home')
        }
      })
    }

   }
  },

  created () {
   
  },
  
}
</script>

<style lang='less' scoped>
  .login {
    padding-top: 278px;
    width: 600px;
    margin:0 auto;
   .login_tit {
    text-align: left;
    padding-left: 10px;
     font-size: 36px;
     font-weight: 700;
     margin-bottom: 150px;
     color: #2c2c2c;
   }   
   .payment_btn {
       padding-top:86px;
       width: 695px;
       margin:0 auto;
     } 
     .forget {
       margin-top: 20px;
       font-size: 22px;
       color: #0084ff;
     }
  }
</style>
<style lang="less">
 .login {
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
 
        .van-cell::after {



          
           border-bottom: 1Px solid #dcdcdc;
        }
        .van-field__label {
          width:1.5rem;
          line-height: 25px;
        }
   }
   [class*=van-hairline]::after {
    border-bottom: 1Px solid #dcdcdc ;
     border-top: 3Px solid #fff;
   }
    .van-cell {
      padding-left: 0;
    }  
    .van-cell:not(:last-child)::after {
      border-bottom:1Px  solid #dcdcdc ;
      margin-left:-50px;
     
    }
    .van-field__error-message {
      margin-top: -45px;
    }
  }
</style>
