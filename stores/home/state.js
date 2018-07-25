import globalParam from '@/common/globalParam';
import { getDate } from '@/common/utils';
export default {
    isMobile: globalParam.system === 'mobile' ? true : false,
    userConfig: null,
    menu: (globalParam.config.menu === 'false' || globalParam.config.menu === false) ? false : true,
    curRoute: '', //当前路由
    lastRoute: '',//前路由
    // 汇总周期
    timeMap: [
    	{
    		lable: '1',
    		value: '自然分钟',
    		other: {
    			formName: 'curRuleForm',
                DomName: 'search_cur',
                indicatorName: '',
                indicatorTip: ''
    		}
    	},
    	{
    		lable: '2',
    		value: '自然天',
    		other: {
    			formName: 'dayRuleForm',
                DomName: 'search_dy',
                indicatorName: '',
                indicatorTip: '较昨日'
    		}
    	},
    	{
    		lable: '3',
    		value: '自然周',
    		other: {
    			formName: 'weekRuleForm',
                DomName: 'search_wk',
                indicatorName: '',
                indicatorTip: '较上周',
                getDay () {
                    return 7
                }
    		}
    	},
    	{
    		lable: '4',
    		value: '自然月',
    		other: {
    			formName: 'monthRuleForm',
                DomName: 'search_mh',
                indicatorName: '',
                // compareName: '本月',
                indicatorTip: '较上月',
                getDay (date) {
                    return getDate(date)
                }
    		}
    	}
    ],
}