<template>
<div>
  <slot></slot>
  <el-card class="box-card visit-list-container">
    <!-- 搜索区 -->
    <div class="list-header">
      <el-form :inline="true" :model="visitList.seachInfo" class="" :size="isMobile?'mini':''">
        <el-form-item label="账户名称">
          <el-input
          prefix-icon="el-icon-search"
          v-model="visitList.seachInfo.username"
          placeholder="请填写账户名称"
          clearable>
          </el-input>
        </el-form-item>
        
        <el-form-item label="时间">
          <el-date-picker
          v-model="visitList.seachInfo.times"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch({tableName:'visitList'})">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- </div> -->
    
    <!-- 内容区 -->
    <div class="list-container" v-loading="visitList.loading">
      <div class="list-container-wrapper">
        <!-- table -->
        <div class="list-table hidden-xs-only">
          <el-table  :data="visitList.curList" border height="100%" stripe>
            <el-table-column prop="username" label="账户名称"></el-table-column>
            <el-table-column prop="value" label="访问总次数" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleDetails(scope.row)"  size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="list-table hidden-sm-and-up">
          <el-table  :data="visitList.curList" stripe size="mini" :row-style="{fontSize:'12px'}" :header-row-style="{fontSize:'13px'}" height="100%" cell-class-name="" ref="table">
            <el-table-column prop="username" label="账户名称" ></el-table-column>
            <el-table-column prop="value" label="访问总次数"></el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleDetails(scope.row)"  size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <!-- 分页 -->
        <div class="list-pagination">
          <el-pagination
            class="hidden-xs-only"
            background
            @size-change="handleSizeChange"
            :current-page.sync="visitList.currentPage"
            :page-size="visitList.pageSize"
            :page-sizes="[8, 15, 25, 30, 40]"
            layout="sizes, prev, pager, next, jumper, ->, total"
            :total="visitList.total">
          </el-pagination>
          <el-pagination
            class="hidden-sm-and-up"
            small
            background
            @current-change="handleCurrentChange({tableName: 'visitList'})"
            :current-page.sync="visitList.currentPage"
            :page-size="visitList.pageSize"
            layout="prev, pager, next"
            :total="visitList.total">
          </el-pagination>
        </div>
      </div>
    </div>
    
    <layer 
    v-if="layerShow"
    :params="layerData" 
    @closeLayer="closeLayer">
    </layer>
  </el-card>
</div>
</template>



<script type="text/javascript">
import globalParam from '@/common/globalParam';
import megerParam from '@/api/megerParam';
import axios from '@/common/axios_bs';
const layer = () => import('./layer-details.vue');

  export default {
    data () {
      return {
        visitList: {
          interface: 'userAccessRecord',
          getDataHandle: 'getVisitList',
          loading: false,
          seachInfo: {
            username: '',
            startTime: this.startTime,
            // startTime: '2018-04-01',
            endTime: this.endTime,
            times: ''
          },
          pageSize: 8,
          currentPage: 1,
          total: 0,
          allList:[],
          curList:[],
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now();
          }
        },
        isMobile: globalParam.system === 'mobile' ? true : false,
        layerShow: false,
        // layerShow: true,
        layerData: ''
      };
    },
    computed: {
    },
    beforeCreate () {
    },
    created () {
      this.init()
      this.startTime = this.getTime('yesterday');
      this.endTime = this.getTime('today');
    },
    mounted () {
      
    },
    watch: {
      'visitList.seachInfo.times': {
        handler (n, old) {
          if (n && n.length === 2) {
            this.visitList.seachInfo.startTime = n[0];
            this.visitList.seachInfo.endTime = n[1];
          } else {
            this.visitList.seachInfo.startTime = '';
            this.visitList.seachInfo.endTime = '';
          }
        },
        deep: true
      }
    },
    components: {
      layer
    },
    methods: {
      init () {
        this.getVisitList()
      },
      getTime (day) {
        let date = day === 'today'
          ? date = new Date()
          : new Date( new Date() - 3600 * 24 * 1000 )
        return date.format("yyyy-MM-dd");
      },
      getVisitList () {
        let tableName = 'visitList';
        let boxInfo = this[tableName];
        this.getTableData({tableName})
        .then(data => {
          boxInfo.total = data.num ? Number(data.num) : '';
          boxInfo.curList = data.list || [];
        }).catch(d => {
          // console.warn(d)
        })
      },
      getTableData ({tableName}) {
        let tableInfo = this[tableName];
        let pageIndex = tableInfo['currentPage'] - 1;
        let page = tableInfo['currentPage'] - 1;
        // let pageSize = tableInfo['pageSize'];
        let length = tableInfo['pageSize'];
        let searchInfo = tableInfo['seachInfo'] || '';
        let _interface = tableInfo['interface'];
        let params = {
          // interface: 'userAccessRecord user_access_record  get_alarm_record_list',
          // interface: 'userAccessRecord',
          page,
          length
        };
        Object.keys(searchInfo).forEach(i => {
          if (i !== 'times') {
            params[i] = searchInfo[i];
          }
        })
        tableInfo['loading'] = true;
        return axios.post('/info', megerParam(_interface, params)).then(d => {
          tableInfo['loading'] = false;
          return d
        }).catch(() => {
          tableInfo['loading'] = false;
          return Promise.reject(`${tableName} 数据获取失败`)
        }) 
      },
      resetTableParams (tableName) {
        let table = this[tableName];
        table['currentPage'] = 1;
        if (table['seachInfo']) {
          Object.keys(table['seachInfo']).forEach(i => {
            table['seachInfo'][i] = '';
          })
        }
      },
      handleCurrentChange ({tableName}) {
        let tableInfo = this[tableName];
        // console.log('nnnnum')
        tableInfo.getDataHandle && this[tableInfo.getDataHandle]()
      },
      handleSizeChange (pageSize) {
        let tableInfo = this['visitList'];
        tableInfo.pageSize = pageSize;
        tableInfo.getDataHandle && this[tableInfo.getDataHandle]()
      },
      
      handleDetails (item) {
        item['startTime'] = this.startTime;
        item['endTime'] = this.endTime;
        this.layerData = item;
        this.openLayer()
      },
      handleSearch ({tableName}) {
        let table = this[tableName];
        this.startTime = table.seachInfo.startTime || this.startTime;
        this.endTime = table.seachInfo.endTime || this.endTime;
        
        table['currentPage'] = 1;
        table.getDataHandle && this[table.getDataHandle]()
      },
      openLayer () {
        this.layerShow = true;
      },
      closeLayer () {
        this.layerShow = false;
      }
    }
  };
</script>

<style type="text/css">

@import '../../../../../../styles/theme.css';
.visit-list-container{
  /*min-height:100%;*/
  box-sizing: border-box;
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow:auto;
  .el-card__body{
    box-sizing: border-box;
    height:100%;
    display: flex;
    flex-direction: column;
  }
  .list-header{
  }
  .list-container{
    padding:0 10px;
    position: relative;
    flex: 1;
    .list-container-wrapper{
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      bottom:0;
      display: flex;
      flex-direction: column;
      .list-table{
        flex: 1;
        position: relative;
        &>.el-table{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
    .list-pagination{
      text-align: left;
      margin-top: 20px;
    }
  }
}


</style>