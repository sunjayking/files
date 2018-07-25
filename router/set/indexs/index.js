
const dataImport = () => import('@/components/Home/childrens/Index/import/index'); //指标数据录入

export default [
	{
	    path: 'Index/import',
	    pathAlias: 'Index/import',
	    name: 'dataImport',
	    type: 'dataImport',
	    meta:{
        title: '指标数据录入',
	    },
      component: dataImport,
	    menuShow: true
	}
]