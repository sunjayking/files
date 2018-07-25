import axios from '@/common/axios_bs';
import globalParam from '@/common/globalParam';
import qs from 'qs';
import NP from 'number-precision';
import apiConfig from "@/api/config";
import toast from '@/common/toast';
// import getUserConfigs from '@/components/Home/module.js';// 获取框架模块 一期写死
import { formatData,deepClone,downloadFile} from '@/common/utils';
import getParams from '@/api/megerParam';

const getUserConfigs = () => import('@/components/Home/module.js');// 获取框架模块 一期写死
// import { getReportInfos } from '@/api/data';

// 获取图表信息 一期写死
function getReportInfos(reportId) {
  const companyDayFrist = () => import('@/components/Home/childrens/chart/show/report-config/company-day.js');
  const companyWeekFrist = () => import('@/components/Home/childrens/chart/show/report-config/company-week.js');
  const companyMonthFrist = () => import('@/components/Home/childrens/chart/show/report-config/company-month.js');
  
  const xyDayFrist = () => import('@/components/Home/childrens/chart/show/report-config/xy-day.js');
  const xyWeekFrist = () => import('@/components/Home/childrens/chart/show/report-config/xy-week.js');
  const xyMonthFrist = () => import('@/components/Home/childrens/chart/show/report-config/xy-month.js');
  const xySs = () => import('@/components/Home/childrens/chart/show/report-config/xy-ss.js');

  const hjxDayFrist = () => import('@/components/Home/childrens/chart/show/report-config/hjx-day.js');
  const hjxWeekFrist = () => import('@/components/Home/childrens/chart/show/report-config/hjx-week.js');
  const hjxMonthFrist = () => import('@/components/Home/childrens/chart/show/report-config/hjx-month.js'); 

  const vivoSs = () => import('@/components/Home/childrens/chart/show/report-config/vivo-ss.js');
  const oppoSs = () => import('@/components/Home/childrens/chart/show/report-config/oppo-ss.js');
	switch (reportId) {
    case 'company-day':
      return companyDayFrist()
      break;
    case 'company-week':
      return companyWeekFrist()
      break;
    case 'company-month':
      return companyMonthFrist()
      break;
    case 'xy-day':
      return xyDayFrist()
      break;
    case 'xy-week':
      return xyWeekFrist()
      break;
    case 'xy-month':
      return xyMonthFrist()
      break;
    case 'xy-ss':
      return xySs()
      break; 
    case 'hjx-day':
      return hjxDayFrist()
      break;
    case 'hjx-week':
      return hjxWeekFrist()
      break;
    case 'hjx-month':
      return hjxMonthFrist()
      break; 
    case 'oppo-ss':
      return oppoSs()
      break;
    case 'vivo-ss':
      return vivoSs()
      break; 
	}
}


// function getParams (type, data={}) {
//   let loginInfo = globalParam.login.isLogin() || {};
// 	return {
// 	 	"_head": {
//       "_version": "0.01",
//       "_msgType": "request",
//       "_timestamps": parseInt(Date.now() / 1000),
//       "_interface": type,
//       "_remark": ""
//     },
//     "_param": Object.assign({
//       "userid": loginInfo.userid || '',
//       "token": loginInfo.token || '',
//     	// "userid": "506",
//      //  "token": "830d10738bd7c3d60ac677b264f36c35",
//     },data)
// 	}
// }

function getDay (dataType, date, state) {
  let timeMap = state.timeMap;
  let rs = '';
  timeMap.forEach(i => {
    if (Number(i.lable) === Number(dataType)) {
      rs = i.other.getDay(date) || ''
    }
  })
  // console.log(date,rs)
  return rs || 1
}

export default {
    // getCallerRank({ commit, state }, data) { //获取指标信息排名
    //   return axios.post(apiConfig.getCallerRank.path, getParams("getCallerRank", data)).then(data =>{
    //     return data;
    //   })
    // },
    // 获取指标录入基本参数
    getImportIndicator ({ commit, state }, data) {

      let params = Object.assign({}, data || {});
      return getParams("importIndicator", params)
      
    },
    
	  // 获取框架模块
    getUserConfig ({ commit, state }, data) {
    	if (data.test) {
        return getUserConfigs().then(data => {
          commit('setUserConfig', data.default);
          return data.default
        });
    	}
      return axios.post(apiConfig.user.path).then(data =>{
        commit('setUserConfig', data._param);
        return data._param;
      })
      
    },

    // 获取报表列表
    getReportList ({ commit, state }, data) {
      let params = Object.assign({
        length: 1000
      }, data || {});
      return axios.post(apiConfig.getReportList.path, getParams("getReportList", params)).then(data =>{
        return data.list;
      })
      
    },

    // 获取图表信息
    getReportInfo ({ commit, state }, data) {
    	if (data.test) {
    		return getReportInfos(data.reportId).then(data => {
          // console.log(data.default.reportInfo[0].reportName,data.default)
          return data.default
        });
    	}
      return axios.post(apiConfig.reportInfo.path, getParams("getReportFrame", data)).then(data =>{
        return data._param;
      })
      
    },
    newGetReportInfo ({ commit, state }, data) {
      if (data.test) {
        return getReportInfos(data.reportId).then(data => {
          return data.default
        });
      }
      return axios.post(apiConfig.reportInfo.path, getParams("getReportFrame", data)).then(data =>{
        return data._param;
      })
      
    },

    // 获取报表信息
    getReportFrame ({ commit, state }, data, reportDimensionality) {
    	let params = Object.assign({}, data || {});
      let apiName = reportDimensionality === '1'
                  ? "getReportFrame"
                  : "reportInfo";
      return axios.post(apiConfig.getReportFrame.path, getParams(apiName, params)).then(data =>{
        return data;
      })
      
    },

    // 通过来源获取指标数据(同一来源&承接&类型)
    getAppointData ({ commit, state }, data) {
      let params = Object.assign({}, data || {});
      return axios.post(apiConfig.getAppointData.path, getParams("getAppointData", params)).then(data =>{
        return data;
      })
      
    },

    // 获取指标数据(只支持同一来源&承接&类型)
    getStatData ({ commit, state }, {_this, params}) {
    	let moduleList = _this.indicatorList[params.caller] || ''; // 本地数据js的来源列表
	    let time = _this.formatteTimes; //当前格式化的时间 
	    let list = '';
	    let rqParams = '';
	    if (moduleList && Object.keys(moduleList).length > 0 && params.dataType) {
	      Object.keys(moduleList).forEach(item => { //遍历来源的类型 
	        if (Number(item) === Number(params.dataType)) {
	          list = moduleList[item]; //拿日、周、月数据 日有日月数据 月只有月数据 周有周月数据
	        } 
	      }) 
	    }

	    if (list) {
	      let rqList = list.filter(item => !item.merger); //返回没有merger属性的数据列表
	      rqParams = {
	        'endTime': time,
	        'dataType': params.dataType,
	        'reportType': _this.reportInfo.reportType,
	        'caller': params.caller,
	        'callee': params.callee,
	        'indicatorList': rqList, //刷选出来的，需要传给后台的数据
	        'cycle': params.cycle
	      };
	    } 

    	rqParams = Object.assign({
    		'endTime': '',
    		'cycle': 8,
    		'dataType': '',
    		'callee': 'hsb',
    		'indicatorList': []
    	}, rqParams || {});
      return this.dispatch('getAppointData',rqParams).then(d =>{ //开始请求接口
        // return data.list;
        let data = d.list;
        if (data && list) { //list是请求的数据，包含merger  data是后台返回的数据
        	// 取值->处理
	        data.forEach(item => {
	          let rsList = item.indicatorList || [];
	          let baseList = deepClone(list);
	          // 取值
	          baseList.forEach(i => {
	            rsList.forEach(j => {
	              if (i.indicatorId === j.indicatorId) {
	                i.value = j.value || ''; 
	              }
	            })
	          })
	          
	          // 加工处理
	          baseList.forEach(i => { 
	            if (i.merger && i.rule) {
	              let c = i.merger.split('/');
	              let rule = i.rule;
	              let v = [];
	              c.forEach(j => {
	                baseList.forEach(k => {
	                  if (k.indicatorId === j) {
	                    v.push(Number(k.value))
	                  }
	                })
	              })
	              switch (rule) {
	                case '/':
	                  if (v.length >= 2) {
	                    i.value = NP.divide(v[0], v[1]) * 100;
	                    // i.value = (NP.divide(v[0], v[1]) * 100).toFixed(2) + '%';
	                    // i.value = (v[0] / v[1]) * 100 + '%';
	                  } else {
	                    i.value = '';
	                  }
	                  break;
	                case 'a/b':
	                  if (v.length >= 2) {
	                    // console.log(111,v,v[0] / v[1])
	                    i.value = NP.divide(v[0], v[1]);
	                    // i.value = v[0] / v[1];
	                  }else {
	                    i.value = '';
	                  }
	                  break;
	              }
	            }
              // 下一帧再做分转元
	            setTimeout(() => { 
	              if (i.value && i.type === "1") {
	                i.value = (Number(i.value) / 100).toFixed(2);
	              } 
	            }, 0) 
          	}) 
          	item.indicatorList = baseList;
        	})

	        // 计算换环比较值
	        let hasDiff = false;
	        list.forEach(i => {
	        	if (i.isdiff) {
	        		hasDiff = true;
	        	}
	        })
        	if (data.length > 1 && hasDiff) {
        		let nowList = data[0].indicatorList;
		        let lastList = data[1].indicatorList;
		        nowList.forEach((item, index) => {
		          if (item.isdiff && item.value && lastList[index].value) {

                if (item.rule && item.rule === '/') {

                  item.diff = (item.value - lastList[index].value).toFixed(2);

                } else {

                  item.diff = (NP.divide( (item.value - lastList[index].value), lastList[index].value ) * 100).toFixed(2);

                }

		            // console.log(item.indicatorName,item.value,lastList[index].value,item.diff)
		          }
		         
		        })
        	}

        	// 转换数据格式
        	data.forEach(item => {
        		item.indicatorList.forEach(i => {
        			if (i.rule && i.rule === '/') {
        				i.value = i.value.toFixed(2) + '%';
        			}
        		})
        	})
        	
      	} 
        console.log(data)
      	return data;
      })
      
    },

     // 获取指标数据(只区分类型,支持不同来源&承接)
    newGetStatData ({ commit, state }, {_this, item, api}) {
      let time = _this.formatteTimes;
      let list = item.indicatorList || '';
      let rqParams = '';
      let [apiPath, apiName] = [api ? api.path : apiConfig.getStatData.path, api ? api.name : "getStatData"];

      if (list) {
        let rqList = list.filter(i => !i.merger);
        rqParams = {
          'endTime': time,
          'dataType': item.dataType,
          'reportType': _this.reportType,
          'indicatorList': rqList,
          'cycle': item.cycle || ''
        };
      }


      rqParams = Object.assign({
      }, rqParams || {});

      return axios.post(apiPath, getParams(apiName, rqParams)).then(d =>{
        // return data.list;
        let data = d.list;
        if (data && list) {
          // 取值->处理
          data.forEach(items => {
            // let rsList = item.indicatorList || [];
            let baseList = deepClone(list);
            // 取值
            baseList.forEach(i => {
              Object.keys(items).forEach(j => {
                let keySplits = j.split('_');
                let callee = keySplits.splice(-1, 1)[0] || '';
                let caller = keySplits.splice(-1, 1)[0] || '';
                let indicatorId = keySplits.join('_') || '';
                if (i.indicatorId === indicatorId && i.caller === caller && i.callee === callee) {
                  i.value = items[j];
                }
              })
              if (!i.value && i.value !== 0) {
                i.value = '';
              }
            })
            
            // 加工处理
            baseList.forEach(i => {

              if (i.merger && i.rule) {
                let c = i.merger.split('/');
                let rule = i.rule;
                let dataType = i.dataType;
                let userDefined = i.userDefined;
                let v = [];
                c.forEach(j => {
                  if (j === 'userDefined') {
                    if (userDefined === 'day') {
                      v.push(getDay(dataType, items.time, state))
                    } else if (!userDefined || isNaN(userDefined)) {
                      v.push(0)
                    } else {
                      v.push(Number(userDefined))
                    }
                  } else {
                    baseList.forEach(k => {
                      if (k.indicatorId === j && i.caller === k.caller && i.callee === k.callee) {
                        v.push(Number(k.value))
                      }
                    })
                  }
                })
                // if (userDefined) {
                //   console.log(1231,v)
                // }
                switch (rule) {
                  case '/':
                    if (v.length >= 2) {
                      i.value = NP.divide(v[0], v[1]) * 100;
                      // i.value = (NP.divide(v[0], v[1]) * 100).toFixed(2) + '%';
                      // i.value = (v[0] / v[1]) * 100 + '%';
                    } else {
                      i.value = '';
                    }
                    break;
                  case 'a/b':
                    if (v.length >= 2) {
                      // console.log(111,v,v[0] / v[1])
                      i.value = NP.divide(v[0], v[1]);
                      // i.value = v[0] / v[1];
                    }else {
                      i.value = '';
                    }
                    break;
                }
              }
              // 下一帧执行前再做数值转换
              setTimeout(() => {

                if (i.value && i.type === "1") {
                  i.value = (Number(i.value) / 100).toFixed(2);
                }

                if (i.value && i.type === "2") {
                  i.value = Math.round(i.value);
                }
                
              }, 0)
              
            })
      
            items.indicatorList = baseList;
          })

          // 计算换环比较值
          let hasDiff = false;
          list.forEach(i => {
            if (i.isdiff) {
              hasDiff = true;
            }
          })
          if (data.length > 1 && hasDiff) {
            let nowList = data[0].indicatorList;
            let lastList = data[1].indicatorList;
            nowList.forEach((item, index) => {
              if (item.isdiff && item.value && lastList[index].value) {

                if (item.rule && item.rule === '/') {

                  item.diff = (item.value - lastList[index].value).toFixed(2);

                } else {

                  item.diff = (NP.divide( (item.value - lastList[index].value), lastList[index].value ) * 100).toFixed(2);

                }

                // console.log(item.indicatorName,item.value,lastList[index].value,item.diff)
              }
             
            })
          }

          // 转换数据格式
          data.forEach(item => {
            item.indicatorList.forEach(i => {
              if (i.rule && i.rule === '/') {
                i.value = i.value.toFixed(2) + '%';
              }
            })
          })
          
        }
       
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            item.indicatorLists = data;
            resolve(data)
          }, 0)
        });
      })
      
    },
    // 获取指标实时数据(只区分类型,支持不同来源&承接)
     getDataRealTime ({ commit, state }, {_this, item, api}) {
      let list = item.indicatorList || '';
      let rqParams = '';
      let [apiPath, apiName] = [api ? api.path : apiConfig.getDataRealTime.path, api ? api.name : "getDataRealTime"];

      if (list) {
        let rqList = list.filter(i => !i.merger);
        rqParams = {
          'dataType': item.dataType,
          'indicatorList': rqList,
        };
      }


      rqParams = Object.assign({
      }, rqParams || {});

      return axios.post(apiPath, getParams(apiName, rqParams)).then(d =>{
        let D = d.list[0] || {};

        list.forEach(i => {
          Object.keys(D).forEach(j => {
            let keySplits = j.split('_');
            let callee = keySplits.splice(-1, 1)[0] || '';
            let caller = keySplits.splice(-1, 1)[0] || '';
            let indicatorId = keySplits.join('_') || '';
            if (i.indicatorId === indicatorId && i.caller === caller && i.callee === callee) {
              i.value = D[j];
            }
          })
          if (!i.value && i.value !== 0) {
            i.value = '';
          }
        })

        return list
      })
      
    }, 

    // 获取指标实时数据(指定时间段)
     getDataDiffstatistics ({ commit, state }, {_this, item, api}) {
      let list = item.indicatorList || '';
      let rqParams = '';
      let [apiPath, apiName] = [api ? api.path : apiConfig.getDataDiffstatistics.path, api ? api.name : "statistics"];

      if (list) {
        let rqList = list.filter(i => i.diff);
        rqList = rqList.map(i => {
          return {
            indicatorId: i.indicatorId,
            caller: i.caller,
            callee: i.callee
          }
        })
        rqParams = {
          'startTime': item.startTime,
          'endTime': item.endTime,
          'indicatorList': rqList,
        };
      }


      rqParams = Object.assign({
      }, rqParams || {});

      return axios.post(apiPath, getParams(apiName, rqParams)).then(d =>{
        let D = d.data || {};
        return D
      })
      
    }, 

    // 删除报表
    deleteReport ({ commit, state }, data) {
      let rqParams = Object.assign({}, data || {});
      return axios.post(apiConfig.deleteReport.path, getParams("deleteReport", rqParams)).then(data =>{
        return data;
      })
      
    },

    // 获取来源去处列表
    getOriginList ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
    	if (params.test) {
    		return (() => import('@/components/Home/childrens/report/add/list.js'))().then(d => {
          return d.default;
        });
    	}
      return axios.post(apiConfig.getOriginList.path, getParams("getCallerCallee", params)).then(data =>{
        return data;
      })
    },

    // 获取获取多类型维度的来源
    getCallerCallee ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      if (params.test) {
        return (() => import('@/components/Home/childrens/report/add/list.js'))().then(d => {
          return d.default;
        });
      }
      return axios.post(apiConfig.getOriginList.path, getParams("getIndicatorWildcard", params)).then(data =>{
        return data;
      })
    },

    // 获取可选指标(一次性获取)
    getIndicatorByCaller ({ commit, state }, data) {
      let params = Object.assign({
        'callee': 'hsb'
      }, data || {});
      return axios.post(apiConfig.getIndicatorByCaller.path, getParams("getCaller", params)).then(data =>{
        return data.list;
      })
      
    },
    // 获取可选指标(分页)
    getCaller ({ commit, state }, data) {
      let params = Object.assign({
        'callee': 'hsb'
      }, data || {});
      return axios.post(apiConfig.getIndicatorByCaller.path, getParams("getCaller", params)).then(data =>{
        return data;
      })
      
    },
    // 获取排行信息
    getCallerRank ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.getCallerRank.path, getParams("getCallerRank", params)).then(data =>{
        return data;
      })
    },
    // 获取流水信息
    getOrderList ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.getOrderList.path, getParams("orderList", params)).then(data =>{
        return data.list;
      })
    },
    // 获取指标列表
    getIndicatorList ({ commit, state }, data) {
    	// 默认获取所有指标
    	let params = Object.assign({
    		"length": 100000
    	}, data || {});
      return axios.post(apiConfig.getIndicatorList.path, getParams("getIndicatorList", params)).then(data =>{
        return data.list;
      })
      
    },

    // 添加报表/修改报表
    addReport ({ commit, state }, {data, type='add', reportDimensionality='0'}) {
    	let params = data;
    	let apiName = type === 'add'
                  ? reportDimensionality === '0' ? 'addReport' : 'addSpecificDimension'
                  : reportDimensionality === '0' ? 'updateReport' : 'updateSpecificDimension';
      // console.log(apiName)
      return axios.post(apiConfig.addReport.path, getParams(apiName, params)).then(data =>{
        return data;
      })
      
    },
    // 获取指标类别
    getIndicatorCategoryList ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.getIndicatorCategoryList.path, getParams("getIndicatorCategoryList", params)).then(data =>{
        return data.list;
      })
      
    },
    // 获取指标信息
    getIndicatorLists ({ commit, state }, data) {
      let params = Object.assign({
        'length': 10000,
        'page': 0
      }, data || {});
      return axios.post(apiConfig.getIndicatorList.path, getParams("getIndicatorList", params)).then(data =>{
        return data;
      })
      
    },
    // 添加修改指标信息
    addIndicator ({ commit, state }, {params, info}) {
      params = Object.assign({
      }, params || {});
      return axios.post(apiConfig.addIndicator.path, getParams(info.interface, params)).then(data =>{
        return data;
      })
      
    },
    // 删除指标信息
    deleteIndicator ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.deleteIndicator.path, getParams("deleteIndicator", params)).then(data =>{
        return data;
      })
      
    },
    // 获取指标来源列表
    getOrigin ({ commit, state }, data) {
      let params = Object.assign({
        'length': 10000,
        'page': 0
      }, data || {});
      return axios.post(apiConfig.getOrigin.path, getParams("getOriginList", params)).then(data =>{
        return data;
      })
      
    },
    // 添加修改指标来源信息
    addOrigin ({ commit, state }, {params, info}) {
      params = Object.assign({
      }, params || {});
      return axios.post(apiConfig.addOrigin.path, getParams(info.interface, params)).then(data =>{
        return data;
      })
      
    },
    // 删除指标来源信息
    deleteOrigin ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.deleteOrigin.path, getParams("deleteOrigin", params)).then(data =>{
        return data;
      })
      
    },
    // 获取系统用户信息
    getSystemUsers ({ commit, state }, data) {
      let params = Object.assign({
      }, data || {});
      return axios.post(apiConfig.systemUsers.path, getParams("systemUsers", params)).then(data =>{
        return data;
      })
      
    },

    // 退出登录
    loginout ({ commit, state }, data={}) {
      let userInfo = {};
      if (globalParam.login.isLogin()) {
        userInfo = globalParam.login.isLogin();
      }

      let params = Object.assign({
        'userid': userInfo.userid || '',
        'token': userInfo.token || '',
        // 'system_id': 28
      }, data);

       return axios.post(apiConfig.loginout.path, getParams('logout', params)).then(data =>{
          globalParam.login.loginout()
          return data;
        })
    },

    // 导出报表
    exportReport ({ commit, state }, data) {
      let params = data;
      if (params.isExcel === '0') {
        return axios.post(apiConfig.exportReport.path, getParams("exportStatData", params)).then(data =>{
          return data;
        })
      }
      let path = globalParam.protocol + globalParam.host + apiConfig.exportReport.path;
      downloadFile(path, qs.stringify(getParams("exportStatData", params)))

      return Promise.resolve('导出成功!');
    },
    // 导出报表
    exportReports ({ commit, state }, data) {
      let params = data;
      let path = globalParam.protocol + globalParam.host + apiConfig.exportReport.path;
      downloadFile(path, qs.stringify(getParams("getOrderTimeAnalysisReport", params)))

      return Promise.resolve('导出成功!');
    },
    // 导出报表
    exportReports2 ({ commit, state }, data) {
      let params = data;
      let path = globalParam.protocol + globalParam.host + apiConfig.exportReport.path;
      downloadFile(path, qs.stringify(getParams("getReceiveTimeAnalysisReport", params)))

      return Promise.resolve('导出成功!');
    },

    // 下载模板
    dowloadCompany ({ commit, state }, data="") {
    	// let params = data;
       
      let path = globalParam.protocol + globalParam.host + apiConfig.dowloadCompany.path;
      downloadFile(path)

      return Promise.resolve('下载成功!');
    },

}