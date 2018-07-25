/*
* @Author: qzj
* @Date:   2018-3-7 16:53:55
* @Last Modified by:   qzj
* @Last Modified time: 2018-3-7 18:12:10
*/

// import dataMerge from './dataMerge'; //指标合成
import warn from './warn'; //数据预警
import visit from './visit'; //访问情况
import indexs from './indexs'; //访问情况
import indicatorExplain from './indicatorExplain'; //访问情况

export default [
  // ...dataMerge,
  ...warn,
  ...indexs,
  ...indicatorExplain,
  ...visit
]
