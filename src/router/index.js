import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Public/Login/login'
import Member from '../pages/Home/member'
import Punch from '../pages/Home/punch'
import Leave from '../pages/Home/leave'

Vue.use(Router)

const router =  new Router({
    routes: [
    {  //設定路徑
        path: '/Login', //自訂路徑
        name: 'Login', //設定名稱
        component: Login, //選擇要對應的元件
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem("id")){
            next('member')
          }next();
        }
      },
      {  //設定路徑
        path: '/member', //自訂路徑
        name: 'Member', //設定名稱
        component: Member //選擇要對應的元件
      },
      {  //設定路徑
        path: '/punch', //自訂路徑
        name: 'Punch', //設定名稱
        component: Punch //選擇要對應的元件
      },
      {  //設定路徑
        path: '/leave', //自訂路徑
        name: 'Leave', //設定名稱
        component: Leave //選擇要對應的元件
      },
    {  //設定路徑
        path: '/', //自訂路徑
        redirect: {
            name: 'Login'
        }
      }

]

  })


  router.beforeEach(function(to, from, next) {
    if (!localStorage.getItem('id') && to.name != 'Login') {
     return next('/Login');
    }
    next();
  });

  export default router;