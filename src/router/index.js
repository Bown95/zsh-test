import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { Dialog } from 'vant';
import Home from '../views/Home.vue'

Vue.use(Router)

 let router= new Router({
  routes: [
 
    {
      path: '',
      redirect:'/home'
    },
    {
      path: '/home',//首页
      name: 'home',
      component: Home
    },
    {
      path: '/about',//公告页
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/detail/:id/:w',//公告详情页 
      name: 'detail',
      component: () => import('../views/detail.vue')
    },
    {
      path: '/person',//个人中心页面
      name: 'person',
      component: () => import('../views/person.vue')
    },
    {
      path: '/help',//帮助页面
      name: 'help',
      component: () => import('../views/help.vue')
    },
    {
      path: '/contact',//联系客服
      name: 'contact',
      component: () => import('../views/contact.vue')
    },
   
    {
      path: '/heat',//热力绑定编号
      name: 'heat',
      component: () => import('../views/heat.vue')
    },
    {
      path: '/addheat',//热力绑定编号
      name: 'addheat',
      component: () => import('../views/addheat.vue')
    },
    {
      path: '/paymentv',//在线缴费1
      name: 'paymentv',
      component: () => import('../views/paymentv.vue')
    },
    {
      path: '/payment:id',//在线缴费2
      name: 'payment',
      component: () => import('../views/payment.vue')
    },
    {
      path: '/success:id?',//在线 缴费成功
      name: 'success',
      component: () => import('../views/success.vue')
    },
    {
      path: '/notes:id?',// 缴费 记录
      name: 'notes',
      component: () => import('../views/notes.vue')
    },
    {
      path: '/recording',//报障记录
      name: 'recording',
      component: () => import('../views/recording.vue')
    },
    {
      path: '/repair',//维修报障
      name: 'repair',
      component: () => import('../views/repair.vue')
    },
  
    {
      path: '/repairnotes',//报障记录
      name: 'repairnotes',
      component: () => import('../views/repairnotes.vue')
    },
    {
      path: '/register',//注册页面
      name: 'register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/forget',//忘记密码页面
      name: 'forget',
      component: () => import('../views/forget.vue')
    },
    {
      path: '/login',//登录页面
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/v',//引导页面
      name: 'v',
      component: () => import('../views/v.vue')
    },
   
    
  ]
})
 
  router.beforeEach((to, from, next) => {
    
  window.scrollTo(0,0);
  let ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") { 
   
   
    location.href=store.state.httphost+"/#/v"
    
     
    
    
    } 
  
 
  if(to.name=='login'||to.name=='home'||to.name=='about'||to.name=='/detail'||to.name=='person'||to.name=='help'||
    to.name=='contact' ||to.name=='register'||to.name=='forget'||to.name=='v'
  ){
     next();
  } else {
     
      if(localStorage.getItem('token')){
         next()
      }else {
        
        Dialog.alert({ message: '请先登录' }).then(()=>{ next('/login') })
      }
  } 
}); 
 
export default router