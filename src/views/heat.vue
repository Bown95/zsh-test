<template>
  <div class="heat">
      <!-- 热力编号 绑定   -->
      <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />  热力编号绑定
          <router-link to="/addheat" class="header_xwxy" tag="span"> <van-icon  name="plus"/>添加</router-link>
       </header>

       <ul class="content">
           <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list  v-model="loading"  :finished="finished"  :finished-text="title"  @load="onLoad">
           <li v-for="(item,index) in list" :key="index"   @click="gonext(item.heat_no)" >
              <none v-if="!list" />
                <p class="heat_top">热力编号:&nbsp {{item.heat_no}}</p>
                <p class="heat_middle clearfix">
                   
                    <van-icon  name="arrow" class="fr" />
                    
                </p>
                <p style="position: relative;" class="heat-conte"> {{item.head_name}}  <span class="line" ></span>  <span class="heat-box">{{item.mechanism_name}}</span>  </p>
           </li>
           </van-list>
        </van-pull-refresh>
       </ul>
  </div>
</template>

<script>
import {houseList} from '@/api/heat'
import none from '../components/none.vue'
import {request,list } from '../utils/loadmore'
export default {

  data () {
    return {
      list:[],
      page_index:1,
       page_size:8,
       isLoading: false,
       loading: false,
       finished: false,
       total:0,
      timer:1,
      title:'到底了'
    }
  },

  methods: {
        onRefresh(){
      this.page_index=1
      this.onLoad()

    },
    gonext(a){
        this.$router.push('/notes'+a)
    },
    onLoad(){
      if(this.timer==2){
        return
      }
      const c={
      token:this.$store.state.token,
      page_size:this.page_size,
      page_index:this.page_index
    }
     request(this,houseList(c))     
    } 
  },
  watch:{
    list
  },
  created () {
    
  
  }
}
</script>
<style lang="less" >

   .heat {
     .header_xwx {
         .header_xwxy {
       position: absolute;
       z-index: 2;
       right: 15px;
       top:10px;
    
     font-size: 26px;
       vertical-align: middle;
       
     }
   

     }
   }
</style>
<style lang='less' scoped>

  .heat {
    min-height:100vh;
      padding-top: 120px;
      background: #eee;
      .content {
          width: 700px;
          margin: 0 auto;
          padding-top:10px;
          .line {
              height:26px;
              
              position: absolute;
              display: inline-block;
               width:1Px;
               background:#ccc;
               top:-5px;
               margin:10px;
          }
          .heat-box {
            padding-left: 30px;
          }
          li {
            
              padding: 36px 26px 0;
               margin-top:20px;
              width: 700px;
              height: 150px;
              border-radius: 8px;
              background: #fff;
          .heat_top {
              color: #1c1b1b;
              font-size: 30px;
          }
          .heat_middle {
              font-size: 40px;
              color: #4d4d4d;
              margin-top: -18px;
          }
        
          }

      }
      .heat-conte {
        color: #595959;
        font-size: 24px;

      }

  }
</style>
<style  >
.van-list {
  min-height: 100vh
}
</style>