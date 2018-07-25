 export default {
    "isSuper": false,
    "module": [
        {
            "name": "chartCenter",
            "isTop": true,
            "title": "图表管理",
            "children": [
            {
                "name": "company",
                "title": "公司经营",
                "children": [
                {
                    "name": "company-day",
                    "title": "日报表",
                    "type": "day",
                    "id": "company-day",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "company-week",
                    "title": "周报表",
                    "type": "week",
                    "id": "company-week",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "company-month",
                    "title": "月报表",
                    "type": "month",
                    "id": "company-month",
                    "comId": "chartShowFirst"
                }]
            },
            {
                "name": "xianyu",
                "title": "闲鱼",
                "children": [
                {
                    "name": "xianyu-ss",
                    "title": "实时报表",
                    "type": "ss",
                    "comId": "xyss"
                },
                {
                    "name": "xianyu-day",
                    "title": "日报表",
                    "type": "day",
                    "id": "xy-day",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "xianyu-week",
                    "title": "周报表",
                    "type": "week",
                    "id": "xy-week",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "xianyu-month",
                    "title": "月报表",
                    "type": "month",
                    "id": "xy-month",
                    "comId": "chartShowFirst"
                }]
            },
            {
                "name": "hjx",
                "title": "换机侠",
                "children": [
                {
                    "name": "huanjixia-day",
                    "title": "日报表",
                    "type": "day",
                    "id": "hjx-day",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "huanjixia-week",
                    "title": "周报表",
                    "type": "week",
                    "id": "hjx-week",
                    "comId": "chartShowFirst"
                },
                {
                    "name": "huanjixia-month",
                    "title": "月报表",
                    "type": "month",
                    "id": "hjx-month",
                    "comId": "chartShowFirst"
                }]
            },
            {
                "name": "oppo",
                "title": "oppo",
                "children": [
                {
                    "name": "oppo-ss",
                    "title": "实时报表",
                    "type": "ss",
                    "comId": "opposs"
                }]
            },
            {
                "name": "vivo",
                "title": "vivo",
                "children": [
                {
                    "name": "vivo-ss",
                    "title": "实时报表",
                    "type": "ss",
                    "comId": "vivoss"
                }]
            }]
        },
        {
            "name": "reportCenter",
            "title": "报表中心",
            "isTop": true,
            "children": [
            {
                "name": "reportList",
                "title": "报表管理",
                "type": "reportList",
                "comId": "reportList",
                "hideChildren": [
                {
                    "name": "addReport",
                    "title": "添加报表",
                    "type": "addReport",
                    "id": "add",
                    "comId": "addReport"
                },
                {
                    "name": "editReport",
                    "title": "修改报表",
                    "type": "editReport",
                    "id": "edit",
                    "comId": "addReport"
                },
                {
                    "name": "preview",
                    "title": "预览",
                    "type": "preview",
                    "comId": "preview"
                }]
            },
            {
                "name": "exportReport",
                "title": "报表导出",
                "hideInMobile": true,
                "type": "exportReport",
                "comId": "exportReport"
            }]
        },
        {
            "name": "dataBanner",
            "title": "作战大屏",
            // "hideInMobile": true,
            "isTop": true,
            "children": [
                {
                    "name": "hotData",
                    "title": "实时监测数据",
                    "children": [
                        {
                            "name": "detection",
                            "title": "检测部",
                            "type": "detection",
                            "comId": "hotData"
                        },
                        // {
                        //     "name": "recovery",
                        //     "title": "回收部分",
                        //     "hideInMobile": true,
                        //     "type": "recovery",
                        //     "comId": "recovery"
                        // }
                    ]
                }
            ]
        },
        {
            "name": "indexCenter",
            "title": "指标管理",
            "hideInMobile": true,
            "isTop": true,
            "children": [
                {
                    "name": "dataImport",
                    "title": "指标数据录入",
                    "type": "dataImport",
                    "comId": "dataImport"

                }
            ]
        },
        {
            "name": "analyse",
            "title": "运营分析",
            "hideInMobile": true,
            "isTop": true,
            "children": [
                {
                    "name": "report",
                    "title": "报表分析",
                    "children": [
                      {
                        'name': 'orderList',
                        'title': '下单时间分析',
                        'type': 'orderList',
                        'comId': 'orderList',
                      },
                      {
                        'name': 'deliveryList',
                        'title': '收获时间分析',
                        'type': 'deliveryList',
                        'comId': 'deliveryList',
                      }
                    ]
                }
            ]
        },
        {
            "name": "indicatorExplain",
            "title": "指标注释",
            "isTop": true,
            "children": [
                {
                    "name": "explain",
                    "title": "指标说明",
                    "type": "explain",
                    "comId": "explain"
                }
            ]
        },
        {
            "name": "set",
            "title": "设置",
            "isTop": true,
            "children": [
                // {
                //     "name": "dataMerge",
                //     "title": "数据指标合成",
                //     "children": [
                //         {
                //             "name": "dataMergeList",
                //             "title": "合成数据指标",
                //             "type": "dataMergeList",
                //             "comId": "dataMergeList"
                //         }
                //     ]
                // },
                {
                    "name": "dataWarn",
                    "title": "数据预警",
                    "children": [
                        {
                            "name": "dataWarnManage",
                            "title": "预警管理",
                            "type": "dataWarnManage",
                            "comId": "dataWarnManage",
                            "hideChildren": [
                            {
                                "name": "addDataWarn",
                                "title": "添加预警",
                                "type": "addDataWarn",
                                "id": "add",
                                "comId": "addDataWarn"
                            },
                            {
                                "name": "editDataWarn",
                                "title": "修改预警",
                                "type": "editDataWarn",
                                "id": "edit",
                                "comId": "addDataWarn"
                            }]
                        },
                        {
                            "name": "dataWarnRecord",
                            "title": "预警记录",
                            "type": "dataWarnRecord",
                            "comId": "dataWarnRecord",
                        }
                    ]
                },
                {
                    "name": "visit",
                    "title": "访问情况",
                    "children": [
                        {
                            "name": "visitList",
                            "title": "访问详情",
                            "type": "visitList",
                            "comId": "visitList",
                        }
                    ]
                }
            ]
        },
        
    ]

}