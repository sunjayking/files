const orderList = () => import('@/components/Home/childrens/analyse/orderList/index'); //列表
const deliveryList = () => import('@/components/Home/childrens/analyse/deliveryList/index'); //添加编辑报表


export default [
  {
    path: 'analyse/orderlist',
    pathAlias: 'analyse/orderList',
    name: 'orderList',
    meta:{
      title: '下单时间分析',
    },
    component: orderList,
    menuShow: true
  },
  {
    path: 'analyse/deliverylist',
    pathAlias: 'analyse/deliverylist',
    name: 'deliveryList',
    meta:{
      title: '收货时间分析',
    },
    component: deliveryList,
    menuShow: true
  }
]