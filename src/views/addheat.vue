<template>
  <div class="addheat">
      <!-- 热力编号 绑定   -->
      <header class="header_xwx">
          <van-icon @click="$router.go(-1)" class="icon_ziti" name="arrow-left" />  添加热力编号
       
          
       </header>
       <!-- <van-area :area-list="areaList" :columns-num="2" title="标题" /> -->
       <div class="addheat_conte">
         <van-cell-group>
             <div class="box1" style="padding-bottom:0.2rem;background:#eee;">
                   <van-field  disabled  :error-message='cityerror' error-message-align="right" style="padding:0.35rem;border-radius:0.15rem;" v-model="city"  right-icon="arrow" placeholder="省市区(县)" @click="showPopup" />
             </div>
              <div class="box2" style="padding-bottom:0.2rem;background:#eee;">
<van-field disabled :error-message='valueerror' error-message-align="right" style="padding:0.35rem;border-radius:0.15rem;" v-model="value"   right-icon="arrow" placeholder="机构名称"  @click="showPopup1" />
             </div>
             <div class="box2" style="padding-bottom:0.2rem;background:#eee;">
<van-field  :error-message='head_nameerror' error-message-align="right" style="padding:0.35rem;border-radius:0.15rem;" v-model="head_name"    placeholder="请输入登记的户主姓名进行匹配"  />
             </div>
              <div class="box3" style="padding-bottom:0.2rem;background:#eee; ">
                  <van-field  :error-message='searcherror' error-message-align="right" style="padding:0.35rem;border-radius:0.15rem;width:7rem;" v-model="search"  clearable placeholder="热力编号" />  <van-button class="btn" @click="searchgo" plain type="primary">搜索</van-button>
             </div>

               <div class="box4" style="padding-bottom:0.2rem;background:#eee;">
                 <van-field  disabled style="padding:0.35rem;border-radius:0.15rem; " v-model="name"  clearable  label="户主" placeholder="**" />
             </div>
              <div class="box4" style="padding-bottom:0.2rem;background:#eee;">
                 <van-field  disabled style="padding:0.35rem;border-radius:0.15rem; " v-model="commnity_name"  clearable  label="小区" placeholder="**" />
             </div>
             <div class="box4" style="padding-bottom:0.2rem;background:#eee;">
                 <van-field  disabled style="padding:0.35rem;border-radius:0.15rem; " v-model="mianji"  clearable  label="面积" placeholder="**" />
             </div>
              <div class="box4" style="padding-bottom:0.2rem;background:#eee;">
                 <van-field  disabled style="padding:0.35rem;border-radius:0.15rem; " v-model="danjia"  clearable  label="单价" placeholder="**" />
             </div>
           
            
            
        </van-cell-group>
        <div style="margin-top:1.4rem;">
           <van-button @click="submit"  style="height:1.1rem;border-radius:0.15rem;font-size:0.4rem;   letter-spacing: 0.1em;border:1Px solid #3399ff;" color="#3399ff" block>添加</van-button>
       </div>
     
     
       </div>
      
<van-popup  position="bottom" :style="{ height: '40%' }" v-model="show">  <van-picker ref="picker" show-toolbar  @confirm="confirm" @cancel="cancel" @change="change" :value="cityselect"  :columns="columnscity"  /></van-popup>
<van-popup  position="bottom" :style="{ height: '40%' }" v-model="show1">   <van-picker  show-toolbar :columns="columns"  @cancel="show1 = false" @confirm="confirm1" />   </van-popup>
  </div>
</template>

<script>
 import { Dialog } from 'vant';
import { Notify } from 'vant';

import {defaultcity,pickercity,mchanismList,bindheat,addheat} from '@/api/addheat'
import {common} from '@/utils/circle'
export default {

  data () {
    return {
      city:'',//省市
      cityselect:'',
      name:'',//户主
      head_name:'',
      commnity_name:'',
      danjia:'',
      mianji:'',
      phone:'',
      value:'',//结构名称
      search:'',//搜索
      show: false,
      show1: false,
      province_list:null,//后台返回省数据
      city_list:null,//后台返回市
      area_list:null,//后台返回区
      columnscity:[   //这里存的是模拟数据一会就干掉你
        {
          values:[],
          defaultIndex:15,
          className:'a'
        },
         {
          values:[],
          defaultIndex:0,
          className:'b'
        },
         {
          values:[],
          defaultIndex:4,
          className:'c'
        }
      ],
      columns: [],
     cityerror:'',
     valueerror:'',
     searcherror:'',
     head_nameerror:'',
     list:null,
     ida:'',//返回后台的省id
     idb:'',
       idc:1 ,//区id
   //  idc:1755 ,//区id
     jigoulist:null,//存储后台返回结构数据
     jigouid:'',//机构id
     success:0,
    
    }
  },

  methods: {
    
     submit(){
       this.success=0;
     if(this.city.length==0){
      this.cityerror='地区不能为空'
      return
    } else {
      this.cityerror=''  
    }
     
    if(this.value.length==0){
      this.valueerror='结构名称不能为空'
      return
    } else {
      this.valueerror=''  
    }
     if(this.head_name.length==0){
      this.head_nameerror='姓名不能为空'
      return
    } 
    else {
      this.head_nameerror=''  
    }


     if(this.search.length==0){
      this.searcherror='热力编号不能为空'
      return
    } else {
      this.searcherror=''  
    }

    if(this.name.length==0){
      this.errormessage='请输入户主姓名'
      return
    } else {
      
       this.errormessage='';
       
       const w={
          heat_no: this.search ,
          token:this.$store.state.token,
          mechanism_id:this.jigouid,
           head_name:this.head_name,
      }
    addheat(w).then(res=>{
      if(res.data.code==1){
           Dialog.alert({ message:res.data.msg  })
           setTimeout(() => {
             this.$router.push('/heat')
           },2000);
           
      }
    })
      
      
    }


    },
     showPopup() {
      this.show = true;
      this.columns=[]
      this.value=''
    },
    
    cancel(){//取消
      this.show = false;
    },
    confirm(val,key){//确认
    let count =key[2]
    this.idc=this.area_list[count].id
      this.columns=[]
      this.show = false;
      let str='';
     val.forEach(item => str += item);
     this.city=str;
     mchanismList(this.idc).then(res=>{
       if(res.data.code==1){
      this.jigoulist=res.data.data
        res.data.data.forEach(item=>this.columns.push(item.name))
         
       }
     })

     
    

    },
    change(v,w,n){//取消
      
      if(n==0){
          this.province_list.forEach(item=>{
        if(item.name==w[n]){
    
          this.ida=item.id
          return
        }
      })
      const c={
        default_province_id:this.ida
      }
      pickercity(c).then(res=>{
        if(res.data.code==1){

              let arr=[]
              this.city_list=res.data.data.city_list
              res.data.data.city_list.forEach(item=>arr.push(item.name))
             this.$refs.picker.setColumnValues(1,arr)
              
            const ccc={
                  default_city_id:this.city_list[0].id
                 }
             pickercity(ccc).then(res=>{
               if(res.data.code==1){
              
              let arr1=[]
              this.area_list=res.data.data.area_list
              this.idc=this.area_list[0].id
              res.data.data.area_list.forEach(item=>arr1.push(item.name))
             this.$refs.picker.setColumnValues(2,arr1)
        }
             })

        }
         
         
      })
     

      }else if (n==1){
          this.city_list.forEach(item=>{
        if(item.name==w[n]){
           let city_list_id=item.id//这一句费弃
            this.idb=item.id
            return
        }
      })
      const cc={
        default_city_id:this.idb
      }
      pickercity(cc).then(res=>{
        
        if(res.data.code==1){
             let arr1=[]
              this.area_list=res.data.data.area_list
              res.data.data.area_list.forEach(item=>arr1.push(item.name))
             this.$refs.picker.setColumnValues(2,arr1)
        }
         
         
      })

      } else {
          this.area_list.forEach(item=>{
        if(item.name==w[n]){
         this.idc=item.id
          return
        }
      })
      }
      
     
    },
    showPopup1() {
      this.show1 = true;
     
    },
    confirm1(e){
      this.value=e;
       this.show1 = false;
       
       this.jigoulist.forEach(item=>{
           if(item.name==e){
             this.jigouid=item.id
             return
           }
       })
       
    },
    //搜索功能
    searchgo(){
      if(this.head_name.length==0){
      this.head_nameerror='姓名不能为空'
      return
    } 
    else {
      this.head_nameerror=''  
    }
    if(this.search.length==0){
       Dialog.alert({
              
               message: '热力编号不能为空' ,
              
              })
        return    
    }
    this.name="**"
      const c={
          heat_no: this.search ,
          token:this.$store.state.token,
          mechanism_id:this.jigouid,
          head_name:this.head_name,
      }
        bindheat(c).then(res=>{
         
          if(res.data.code==0){
          
             Dialog.alert({ message:res.data.msg  })
             return
          }
          if(res.data.code==1){
         let  dat=res.data.data
            this.name=dat.head_name
            this.danjia=dat.unit_price+"元/平方米"
            this.mianji=dat.house_area+"平方米"
            this.commnity_name=dat.commnity_name+""+dat.floor_no+""+dat.unit_no+""+dat.room_no

            
          }

        })
    }
    
  },
  created () {
    defaultcity().then(res=>{
      if(res.data.code==1){
     
    
    this.province_list=res.data.data.province_list
    this.city_list=res.data.data.city_list
    this.area_list=res.data.data.area_list
     res.data.data.province_list.forEach(item=> this.columnscity[0].values.push(item.name))
      res.data.data.city_list.forEach(item=>this.columnscity[1].values.push(item.name))
     res.data.data.area_list.forEach(item=> this.columnscity[2].values.push(item.name) ) 
  

      }
     
    })

  }
}
</script>
<style lang="less"  >
.addheat .van-field__error-message--right {
  padding-right: 0.35rem;
  line-height: 43px;
}
</style>
<style lang='less' scoped>

  .addheat {
    height:100vh;
      padding-top: 120px;
      background: #eee;
    .addheat_conte {
      margin:15px 25px 0;
      .btn {
        height: 92px;
        font-size: 30px;
        width: 160px;
        border-radius: 10px;
        color: #3399ff;
      }
     .van-button--primary {
       border: 1Px solid #3399ff;
     }
    }
       .addheat_conte {
         .box3 {
            display: flex;justify-content: space-between;
           
         }
          
       } 

  }
</style>
<style  >
   .addheat_diss  .van-dialog__header{
    color: orangered;
  }
</style>
<style lang="less">
.addheat {
  .van-popup  {
    font-size: 32px;

  }
  
  .box4  .van-cell__title span {
  color: #969799;
  }
   

  .van-picker__cancel, .van-picker__confirm {
    font-size: 30px;
  }
  .van-ellipsis {
    font-size: 28px;
  }
  .van-cell__title  {
    span {
      line-height: 40px;
      font-size: 28px;
      color: #d8d8d8;
    }
  }
  .van-field__control:disabled {
    color: #323233;
  }
  .van-field__label {
    width: 1.5rem;
  }
   .van-field__error-message {
      margin-top: -45px;
    }
   
}

</style>