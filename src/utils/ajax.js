
import axios from 'axios'
import store from '../../store'
import router from '../router'
import { Dialog } from 'vant';


// create an axios instance
const service = axios.create({
  baseURL: api, 
  timeout: 7000 
})

//request
service.interceptors.request.use(config => {
    
    /*   if(store.state.token){
       config.headers.common['token']=store.state.token   //要求给你
      } */
  
      return config;
    }, error => {
    // 请求错误
      return Promise.reject(error);
    });
  
    //  //respone
    service.interceptors.response.use(
        response => {
       
          const res=response.data;
        
          if(res.code==403){
            Dialog.alert({ message: '请先登录' }).then(()=>{ router.push('/login') })
     
            return
          }else if(res.code==2){
            Dialog.alert({
              title: '温馨提示',
               message: res.msg ,
               className:'addheat_diss'
              })
              return
          }
           else if(res.code !=1 ) {
            Dialog.alert({
              title: '错误提示',
               message: res.msg 
              })
              return
          }
          return response;
         
        
        },
      
        error => {  //默认除了2XX之外都为错误
          // if(error.response){
          //   switch(error.response.status){
          //     case 401:
          //       this.$store.commit('delToken');
          //       router.replace({ //跳转到登录页面
          //         path: '/managerLogin',
          //         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          //       });
          //   }
          // }
          return Promise.reject(error.response);
        }
      );
 export default service