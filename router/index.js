import Vue from 'vue';
import Router from 'vue-router';
import { Loading } from 'element-ui';

import chart from './chart'; //图表管理
import report from './report'; //报表中心
import analyse from './analyse'; //报表中心
import dataBanner from './dataBanner/index.js'; //作战大屏
import set from './set'; //设置

// home
import home from '@/components/Home/index';

//过度页
const welcome = () => import('@/components/Home/childrens/welcome/index');
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      component: home,
      meta:{
      title: '主页',
      },
      menuShow: true,
      children: [
        ...chart,
        ...report,
        ...analyse,
        ...dataBanner,
        ...set,
        {
          path: '',
          component: welcome
        }
      ]
    },
    {
      path: '/',
      redirect: '/home/chart/show/first/company-week'
    }
  ],
})

let loadingInstance;
router.beforeEach((to, from, next) => {
  // loading
  loadingInstance = Loading.service({
    lock: true,
    text: '拼命获取数据中，别着急...',
    customClass: 'container-mask-loading'
  });

  // 清空图表
  window.chartsBox = window.chartsBox || [];
  // 清空swiper
  window._mySwiper = window._mySwiper || [];
  next()
})

router.afterEach((to, from, next) => {
  Vue.nextTick(() => {
   loadingInstance.close();
  })
})

export default router