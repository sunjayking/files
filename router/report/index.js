const reportList = () => import('@/components/Home/childrens/report/list/index'); //列表
const addReport = () => import('@/components/Home/childrens/report/add/index'); //添加编辑报表
const exportReport = () => import('@/components/Home/childrens/report/export/index'); //导出报表
const preview = () => import('@/components/Home/childrens/report/preview/index'); //预览


export default [
  {
    path: 'report/list',
    pathAlias: 'report/list',
    name: 'reportList',
    meta:{
      title: '报表管理',
    },
    component: reportList,
    menuShow: true
  },
  {
    path: 'report/add/:id',
    pathAlias: 'report/add',
    name: 'addReport',
    meta:{
      title: '添加报表',
    },
    component: addReport,
    menuShow: true
  },
  {
    path: 'report/preview',
    pathAlias: 'report/preview',
    name: 'preview',
    meta:{
      title: '预览',
    },
    component: preview,
    menuShow: true
  },
  {
    path: 'report/export',
    pathAlias: 'report/export',
    name: 'exportReport',
    type: 'exportReport',
    meta:{
      title: '报表导出',
    },
    component: exportReport,
    menuShow: true
  },
]