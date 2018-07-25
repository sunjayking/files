
const explain = () => import('@/components/Home/childrens/indicatorExplain/explain/index'); //指标说明

export default [
	{
	    path: 'indicatorExplain/explain',
	    pathAlias: 'indicatorExplain/explain',
	    name: 'explain',
	    type: 'explain',
	    meta:{
        title: '指标说明',
	    },
      component: explain,
	    menuShow: true
	}
]