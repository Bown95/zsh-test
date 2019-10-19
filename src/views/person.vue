<template>
  <div class="person">
      <!-- 个人中心 -->
      <div class="headebox">
         <h3>个人中心</h3>
         <p class="title">Hi,&nbsp&nbsp {{phone}}</p>
         <!-- 用margin负值没有生效,用定位吧 -->
         <ul  class="person_list clearfix">
                <li @click="titleshow">
                  
                  <span> <van-icon style="font-size:20px;" color="#51A8FF" class="ict icon" class-prefix="iconfont" name="icon-nuanqi-" />&nbsp&nbsp暖气账号绑定</span>
                  <van-icon name="arrow" />
                </li>
                <router-link tag="li" to="/paymentv">
                  
                  <span><van-icon  style="font-size:20px;"  class="person-icon" name="refund-o" />在线缴费</span>
                  <van-icon name="arrow" />
                </router-link>
                <router-link tag="li" to="/notes">
                  
                  <span><van-icon  style="font-size:20px;" color="#51A8FF" class="ict icon" class-prefix="iconfont" name="icon-wsdzb_zzgzt_dwgl_dfjngl_dfjnjl" />&nbsp&nbsp缴费记录</span>
                  <van-icon name="arrow" />
                </router-link>
                <router-link tag="li" to="/repair">
                  
                  <span><van-icon style="font-size:20px;" color="#51A8FF" class="ict icon" class-prefix="iconfont" name="icon-weixiushenqing" />&nbsp&nbsp维修报障</span>
                  <van-icon name="arrow" />
                </router-link>
        </ul>
      </div>
     
      
        <tabbar/>
  </div>
</template>
<script>
import tabbar from '../components/tabbar.vue'
import { Dialog } from 'vant'
import {person } from '@/api/person'
export default {
 components: {
    tabbar
  },
  data () {
    return {
      active: 3,
      phone:'游客'
    }
  },

  methods: {
    titleshow(){//弹窗提示
     this.$router.push('/heat')
      /*   Dialog.confirm({
       title: '温馨提示',
      message: '首次开通用户,必须前往我们的收费大厅核实面记录如入信息才能进行后续的使用(地址:xxx)'
          }).then(() => {
         // on confirm
        
             }).catch(() => {
           // on cancel
          }); */
    }

  },

  created () {
    person(localStorage.getItem('token')).then(res=>this.phone=res.data.data.phone)
  }
}
</script>
<style  lang="less">
    .person {
        background: #eee;
        height: 100vh;//这里写了固定的高度
      .headebox {
          position: relative;
            height: 455px;
            background: #3399ff;
            text-align: center;
            padding-top:73px;
            font-size: 36px;
            color: #fff;
        h3  {
            
        }
        .title {
            padding-top: 115px;

        }
            
      }
      .person_list {
          position: absolute;
          left:50%;
          transform: translateX(-50%);
           width: 695px;
           bottom: -372px;
          
           li {
               width: 100%;
               padding: 28px;
               background: #fff;
               color: #1c1b1b;
               font-size: 30px;
               border-radius: 10px;
               margin-bottom: 11px;
               display: flex;
               justify-content:space-between;
               font-size: 30px;
               color: #1c1b1b;
               .person-icon {
                 padding-right: 18px;
                 color: #3399ff;
                 font-size: 43px;
                 
               }
           }
         .van-icon {
           top: 8px;
         }
      }
      .foottabbar {
        background: #eee;
      }
    }
 
  
</style>
