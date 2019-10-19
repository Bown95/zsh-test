<template>
  <div class="notes">
      <!-- 缴费成功页面   -->
      <header class="header_xwx">
          <van-icon @click="$router.push('/person')" class="icon_ziti" name="arrow-left" />  缴费记录  
       </header>
      <van-tabs v-model="activeName"   @click="tab">
        <van-tab v-for="item in category" :key="item.id" class="notes_tabbar" :title="item.value" :name="item.key">
          <div class="notes_num">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list :immediate-check="false"    v-model="loading"  :finished="finished"  :finished-text="title"  @load="onLoad">
               
               <com :list="list"/>
           </van-list>
          </van-pull-refresh>

           
          </div>
       
        </van-tab>

      </van-tabs>     
  </div>
</template>

<script>
import {request,list } from '../utils/loadmore'
import com from '@/components/paylist'
import {orderList} from '@/api/paymentv'//这个是可以根据热力编号获取对应的所有订单,此时我只需要传一个热力编号,
import {getheader} from '@/api/notes'

export default {
  components:{
      com
  },

  data () {
    return {
      category:[],
       activeName: 'a',
       list:[],
       page_index:1,
       page_size:4,
       order_state:0,
      loading: false,
       finished: false,
        isLoading: false,
       timer:'',
       total:0,
       title:'到底了',
       timer:1,
     
    }
  },

  methods: {
    onLoad(){
       if(this.timer==2){
        return
      }
      this.getdata()
    },
     onRefresh() {
       this.page_index=1
       this.onLoad()

    },
    tab(n){
      this.category.forEach(item=>{
        if(item.key==n){
          this.order_state=item.key
          return
        }
      })
    
        this.page_index=1
        this.getdata()
    },
    getdata(){
         const c={
      token:this.$store.state.token,
      page_size:this.page_size,
      page_index:this.page_index,
      order_state:this.order_state,
      heat_no:this.$route.params.id
    }
     
     request(this,orderList(c))
    }
    
  },
  created () {
    this.getdata()
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

  .notes {
    min-height:100vh;
      padding-top: 120px;
      background: #eee;
      padding-bottom: 25px;
    
     .paymentv-conte {
       font-size: 24px;
       color: #595959;
     }

  }
</style>
<style lang="less">
.notes {
 
.van-ellipsis  { 
  font-size: 30px;
     height: 98px; 
   
     line-height: 98px; 
     color: #595959;
   }

.van-tabs--line .van-tabs__wrap {
  height: 98px;
}
.van-tabs__nav {
  display: flex;
  .van-tab {
    flex:1;
  }
 
}
.van-tabs__line {
  background: #3399ff;
  height: 4px;
}
}

</style>