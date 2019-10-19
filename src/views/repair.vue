<template>
  <div class="repair">
    <header class="header_xwx">
            <van-icon @click="goback" class="icon_ziti" name="arrow-left" />  维修报障
            <router-link to="/repairnotes" class="header_xwxy" tag="span">报障记录</router-link>       
    </header>
      <div class="content"> 
        <van-cell-group>
          <van-field class="input"
            v-model="userInfo.userName"
            placeholder="姓名"
            :error-message='errorname'
             @focus="errorname=''"
            error-message-align="right"
          />
          <van-field
            v-model="userInfo.tel" class="input"
            placeholder="联系方式"
            :error-message='errortel'
            @focus="errortel=''"
              error-message-align="right"
          />
           <div class="box2" style="padding-bottom:0.2rem;background:#eee;">
  <van-field disabled :error-message='valueerror' error-message-align="right" 
  style="padding:0.25rem;border-radius:0.15rem;padding-left:0.43rem;" v-model="value"   right-icon="arrow" placeholder="热力编号"  @click="showPopup1" />
             </div>
          <van-field class="inputerea"
            v-model="userInfo.message"
            type="textarea"
            :error-message='errormessage'
            @focus="errormessage=''"
              error-message-align="right"
            placeholder="报障内容"
            row="10"
          />
        </van-cell-group>
       
        <van-button @click="submit" size="large" type="info" style="font-size:0.4rem;">提交</van-button>
      </div>
      <van-popup  position="bottom" :style="{ height: '40%' }" v-model="show1">   <van-picker  show-toolbar :columns="columns"  @cancel="show1 = false" @confirm="confirm1" />   </van-popup>

  </div>
</template>
<script>
import {houseList} from '@/api/heat'
import {repair } from '@/api/repair'
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
 components: {
   
  },
  data () {
    return {
        active: 2,
        show1:false,
        items:[],
        columns: [],
        value:'',
      editable:'',
      userInfo:{
        userName:'',
        tel:'',
        message:''
      },
       errorname:'',
      errortel:'',
      errormessage:'',
      valueerror:'',
    }
  },

  methods: {
    showPopup1() {
      this.show1 = true;
    },
    confirm1(e){
      this.value=e;
       this.show1 = false;
       
      
    },
    goback(){
        this.$router.go(-1);
     },
   submit(){
      if(this.userInfo.userName.length==0){
      this.errorname='姓名不能为空'
      return
    } else {
      this.errorname=''  
    }

    if(this.userInfo.tel.length==0){
      this.errortel='手机号不能为空'
      return
    } else if(!(/^1[3456789]\d{9}$/.test(this.userInfo.tel))){
         this.errortel='手机号格式不正确'
         return
    }else {
      this.errortel=''  
    }
    if(this.value.length==0){
      console.log(11)
      this.valueerror='请选择热力编号'
      return
    } else {
      this.valueerror=''  
    }

    if(this.userInfo.message.length==0){
      this.errormessage='请输入反馈内容'
      return
    } else {
         this.errormessage=''  
       const c={
         token:this.$store.state.token,
         heat_no:this.value,
         link_name:this.userInfo.userName,
         phone:this.userInfo.tel,
         content:this.userInfo.message
         

       }
       console.log(c)
       repair(c).then(res=>{
          if(res.data.code==0){
            Dialog.alert({
              title: '错误提示',
               message: res.data.msg 
              })
            return
          }
         if(res.data.code==1){
          
          Dialog.alert({ message: '反馈成功'}).then(()=>{
              this.$router.push('/repairnotes')
          })
           
           

         }
       })
    
           
      
    }
    }
  },

    created () {
    const c={
      token:this.$store.state.token,
      page_size:8888,
      page_index:1

    }
    houseList(c).then(res=>{
    if(res.data.code==1){
      
      
      res.data.data.forEach(item=>{
        this.columns.push(item.heat_no)
      })
    }
    })

    
  }
}
</script>
<style lang='less' scoped>
  
  .repair{
    
  height: 100vh; 
     
      background: #eee;
        .header_xwxy {
       position: absolute;
       z-index: 2;
       right: 15px;
       top:10px;
    
     font-size: 26px;
       vertical-align: middle;
       
     }
      .content {
        padding: 30px 36px;
        margin-top: 10px;
        border-radius: 8px;
       /*  background-color: #fff; */
       //background: red;
       background: #eee;
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
          border-radius: 10px;
          font-size: 18px;
          color: #dbdbdb;
          border: 1Px solid #eee;
        }
        
      }
  }
</style>
<style lang="less" scoped>
.repair {
  padding-top: 120px;
    .van-card {
    padding: 38px 36px;
    font-size: 30px;
    border-radius: 10px;
    margin: 10px 0px;
    background-color: #fff;
    .van-card__thumb {
      border-right: 1px solid #d7d4d4;
      margin-right: 45px;
      div {
        width: 100%;
        height: 100%;
        text-align: center;
        padding-right: 24px;
        line-height: 100px;
        font-size: 65px;
      }
    }
    .van-card__title {
      height: 30px;
      margin-bottom: 20px;
      line-height: 33px;
    }
    .van-card__desc {
      height: 50px;
      padding: 0;
      max-height: 100px;
    }
  }

  .inputerea {
    height: 208px;
    border-radius: 1px;
    border: 1Px solid #eee;
    margin-top: 15px;
  }

  .van-button {
    margin-top: 80px;
    height: 80px;
    border-radius: 6px;
    line-height: 80px;
  }
  
}
</style>
<style lang="less">
   .repair {
       textarea {
         line-height: 38px;
         height: 186px;
         padding:10px 0;
       }
       .van-cell-group {
         background: #eee;
       }
       .van-field__error-message {
      margin-top: -85px;
      //width: auto;
     // display: inline;
     width: 260px;
     float: right;
    }
         .box2 {
            .van-field__error-message {
      margin-top: -45px;
        
    
     padding-right: 30px;
    }
    }
     }
  
</style>