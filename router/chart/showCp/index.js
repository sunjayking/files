const first = () => import('@/components/Home/childrens/chart/show/components/first/index'); //模板1
const xyss = () => import('@/components/Home/childrens/chart/show/components/xyss/index');  //闲鱼实时模板
const opposs = () => import('@/components/Home/childrens/chart/show/components/opposs/index');  //oppo实时模板
const vivoss = () => import('@/components/Home/childrens/chart/show/components/vivoss/index');  //vivo实时模板

export default [
	{
        path: 'chart/show/first/:id',
        pathAlias: 'chart/show/first',
        type: 'firstComponents',
        name:'chartShowFirst',
        title: '模板1',
        component: first,
        menuShow: true
    },
    {
        path: 'chart/show/xyss',
        pathAlias: 'chart/show/xyss',
        type: 'xyss',
        name:'xyss',
        title: '闲鱼实时',
        component: xyss,
        menuShow: true
    },
    {
        path: 'chart/show/opposs',
        pathAlias: 'chart/show/opposs',
        type: 'opposs',
        name:'opposs',
        title: 'oppo实时',
        component: opposs,
        menuShow: true
    },
    {
        path: 'chart/show/vivoss',
        pathAlias: 'chart/show/vivoss',
        type: 'vivoss',
        name:'vivoss',
        title: 'vivo实时',
        component: vivoss,
        menuShow: true
    },
]