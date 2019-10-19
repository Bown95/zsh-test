<template>
  <div class="repairnotes">
      <!-- 缴费成功页面   -->
      <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />  报障记录  
       </header>
      <van-tabs v-model="activeName" @click="tab">
     
        <van-tab  v-for="item in category" :key="item.id"  class="notes_tabbar"  :title="item.value" :name="item.key">
       
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list :immediate-check="false"    v-model="loading"  :finished="finished"   :finished-text="title"  @load="onLoad">
                  <com :list="list"/>
              </van-list>
          </van-pull-refresh>

        </van-tab>
       
        
      </van-tabs>     
  </div>
</template>

<script>
import {getrepair,getheader } from '@/api/repair'
import com from '@/components/repairlist'
import {request,list } from '../utils/loadmore'
export default {
  components:{
    com
  },

  data () {
    return {
       activeName: 'a',
       page_index:1,
       page_size:5,
       state:0,
       list:[],
       loading: false,
       finished: false,
        isLoading: false,
       timer:'',
       title:'到底了',
        timer:1,
        category:[],
    }
  },

  methods: {
      onLoad(){
         if(this.timer==2){
        return
      }
       this.getlist()
     
        },
      getlist(){
       const c={
          token:this.$store.state.token,
          order_state:this.state,
          page_index:this.page_index,
          page_size:this.page_size
        }
   
        request(this,getrepair(c))

      },
       onRefresh() {
       this.page_index=1
       this.onLoad()

    },
      tab(n){
        this.category.forEach(item=>{
        if(item.key==n){
          this.state=item.key
          return
        }
      })
          this.page_index=1
          this.getlist();
      },
  },

  created () {
     this.getlist() 
     getheader().then(res=>{
      if(res.data.code==1){
        
         this.category=res.data.data;
      }
     
    })
  },
     watch:{
       list
 
  }
}
</script>

<style lang='less' scoped>

  .repairnotes {
     
     min-height: 100vh;
      padding-top: 120px;
      background: #eee;
      padding-bottom: 25px;
  }
</style>
<style lang="less">
.repairnotes {

.van-ellipsis  { 
  font-size: 30px;
     height: 98px; 
     display: inline-block;
     line-height: 98px; 
     color: #595959;
   }

.van-tabs--line .van-tabs__wrap {
  height: 98px;
}

   
      .van-tabs__line {
        background: #3399ff;
        width: 88px!important;
        height: 4px;
      }
}

</style>