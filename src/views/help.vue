<template>
  <div class="help">
  <!--   帮助页面 -->
        <header class="header_xwx">帮助中心</header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="header">
          <li @click="tog(item.id)"  v-for="(item) in category" :key="item.id"> 
              <div class="circle" style="background:#18d3bd;">
               <!--  <van-icon class="ict" name="friends-o" /> -->
                 <img :src=" $store.state.imgapi+'45/45/0/'+item.icon" alt="">
              </div>
            <p :class="category_id==item.id?'active':''">  {{item.name}} </p> 
          </li>
        
        </ul >
        <h3 class="help_title">热门问题</h3>
          <div class="box_help">
             <van-list  :immediate-check="false"  v-model="loading"  :finished="finished"  :finished-text="title"  @load="onLoad">
             
             
            <ul class="help_text"  v-for="(item ,index ) in list" :key="index">
               <none v-if="!list" />
              <!-- <li>
                <router-link  :to="'/detail/'+item.id+'/0'"  > {{item.title}} </router-link>
                <span> {{item.create_date}} </span>
              </li> -->
              <router-link tag="li" :to="'/detail/'+item.id+'/0'" >
                <span style="color:rgba(49,49,49,1);"  > {{item.title}} </span>
                <span> {{item.create_date}} </span>
              </router-link>
            </ul>
           
          </van-list>
          </div>
          
        </van-pull-refresh>
    <tabbar/>
  </div>
</template>

<script>
import tabbar from '../components/tabbar.vue'
import none from '../components/none.vue'
 import {fetchlist} from '@/api/home'
 import {detail} from '@/api/help'
 import {togc,list } from '../utils/loadmore'
export default {
 components: {
    tabbar,
    none
  },
  data () {
    return {
      
      timer:1,
      active: 1,
      num:6,
      list:[],
      category:[],
      category_id:6,//分类id
      loading: false,
      finished: false,
      page_index:1,
      page_size:9,
       isLoading: false,
        total:0,
        article_type:2,
       biaoji:1,
       title:'到底了'
      
    }
  },

  methods: {
    tog(params){//他进行切换时候一定是只在加载第一页
      this.finished=false
      this.page_index=1
      this.category_id=params 
      this.onLoad()
    }, 
    
   
    onLoad() {
      if(this.timer==2){
        return
      }else{
         togc(this.category_id,this)
      }
      
  
    },
     onRefresh() {
       this.page_index=1
      togc(null,this)

    },
    first(q){
        //第一步
      detail(2).then(res=>{
       
      if(res.data.code==1){
          this.category=res.data.data
         
           res.data.data.forEach(item=>{

             if(item.name=='常见问题'){
                this.category_id=item.id       
             }
           })
       
          togc(null,this)
 
      }
     })
    }
    
  },


  created () {
      this.first()
   
  },
   watch:{
    list
  }
}
</script>

<style lang='less' scoped>
  .help {
    background: #eee;
     padding-top: 120px;
      .header {
        height: 282px;
         display: flex;
         justify-content:space-around;
         li {
           padding-top: 58px;
         
           height: 100%;
           width: 25%;
           background: #fff;
             
           p {
             text-align: center;
             font-size: 28px;
             color: #595959;
           }
          .circle {
            width: 94px;
            height: 94px;
            border-radius: 50%;
            position: relative;
            margin:0 auto;
             margin-bottom: 26px;
             img {
               display: block;
               width: 95px;
               height: 95px;
               border-radius: 50%;

             }
           .ict {
             position: absolute;
             top: 50%;
             left:50%;
             transform: translate(-50%,-50%);
             font-size: 50px;
             color:#fff;
           }
          }
           
         }

      }
      .help_title {
        background: #fff;
        margin-top:10px;
        font-size: 34px;
        color: #313131;
        height: 100px;
        line-height: 100px;
        padding-left:30px;
        letter-spacing: 0.1em;
         border-bottom: 1Px solid #e5e5e5;
      }
      .help_text {
        padding:0 13px;
          background: #fff;
          
        li {

            display: flex;
            justify-content: space-between;
            padding:0 15px;
            height: 85px;
            line-height: 85px;
            border-bottom: 1Px solid #e5e5e5;
           
            a {
                 font-size: 30px;
            color: #313131;
            }
            span {
              color: #999;
            }
        }

      }
      .active {
        color: #3399FF!important;
      }
  }
</style>
<style  >
  .van-pull-refresh {
    min-height: 100vh;
  }
</style>