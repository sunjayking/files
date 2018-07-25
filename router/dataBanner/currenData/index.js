// const recovery = () => import('@/components/Home/childrens/dataBanner/hotData/recovery/index'); //回收部分
const detection = () => import('@/components/Home/childrens/dataBanner/hotData/detection/index'); //检测部


export default [
	{
      path: 'dataBanner/hotData/detection',
      name: 'hotData',
      meta:{
        title: '检测部 | 作战大屏',
      },
      component: detection,
      menuShow: true
  	},
  	// {
   //    path: 'dataBanner/hotData/recovery',
   //    name: 'recovery',
   //    title: '回收部分',
   //    component: recovery,
   //    menuShow: true
  	// }
]
