const dataWarnManage = () => import('@/components/Home/childrens/set/warn/list/index'); //预警列表
const addDataWarn = () => import('@/components/Home/childrens/set/warn/add/index'); //添加编辑预警

const dataWarnRecord = () => import('@/components/Home/childrens/set/warn/record/index'); //预警详细记录


export default [
  {
    path: 'set/warn/list',
    pathAlias: 'set/warn/list',
    name: 'dataWarnManage',
    meta:{
      title: '预警管理',
    },
    component: dataWarnManage,
    menuShow: true
  },
  {
    path: 'set/warn/add/:id',
    pathAlias: 'set/warn/add',
    name: 'addDataWarn',
    meta:{
      title: '添加预警',
    },
    component: addDataWarn,
    menuShow: true
  },
  {
    path: 'set/warn/record',
    pathAlias: 'set/warn/record',
    name: 'dataWarnRecord',
    meta:{
      title: '预警记录',
    },
    component: dataWarnRecord,
    menuShow: true
  }
]