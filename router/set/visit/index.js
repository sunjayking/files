const visitList = () => import('@/components/Home/childrens/set/visit/list/index'); //访问列表


export default [
  {
    path: 'set/visit/list',
    pathAlias: 'set/visit/list',
    name: 'visitList',
    meta:{
      title: '访问列表',
    },
    component: visitList,
    menuShow: true
  }
  
]