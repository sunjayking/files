<template>
<div>
  <slot></slot>
  <div class='mg-tips el-icon-warning'> 温馨提示：此报表基于下单时间进行数据呈现，不同时间查看数据将会出现数据变动的情况。</div>
  <el-card class="box-card visit-list-container">
    <!-- 搜索区 -->
    <div class="list-header">
      <el-form :inline="true" :model="orderList.seachInfo" class="" :size="isMobile?'mini':''">
        <el-form-item label="时间">
          <el-date-picker
          v-model="orderList.seachInfo.times"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-form-item>
        
        
      <el-form-item label="渠道类型" prop="qid" :error="errorList.source.isError?errorList.source.errMsg:''">
        <el-select v-model="ruleForm.qid" placeholder="请选择渠道类型" value-key="name" filterable @change="qidChange">
          <el-option :label="i.name" :value="i" v-for="i in qidList" :key="i.qid"></el-option>
        </el-select>
      </el-form-item>
        
      <el-form-item label="渠道" prop="cid" :error="errorList.source.isError?errorList.source.errMsg:''" v-if="!!ruleForm.qid.qid">
        <el-select v-model="ruleForm.cid" placeholder="请选择渠道" value-key="name" filterable @change="cidChange">
          <el-option :label="i.name" :value="i" v-for="i in cidList" :key="i.cid"></el-option>
        </el-select>
      </el-form-item>
        
      <el-form-item label="Pid" prop="pid" :error="errorList.source.isError?errorList.source.errMsg:''" v-if="!!ruleForm.cid.cid && !!ruleForm.qid.qid">
        <el-select v-model="ruleForm.pid" placeholder="请选择Pid" value-key="name" filterable @change="pidChange">
          <el-option :label="i.name" :value="i" v-for="i in pidList" :key="i.pid"></el-option>
        </el-select>
      </el-form-item>
      
        <el-form-item>
          <el-button type="primary" @click="handleSearch({tableName:'orderList'})">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- </div> -->
    
    <!-- 内容区 -->
    <div class="list-container" v-loading="orderList.loading">
      <div class="list-container-wrapper">
        <!-- table -->
        <div class="list-table hidden-xs-only">
          <el-table  :data="orderList.curList" border height="100%" stripe>
            <el-table-column prop="time" label="下单时间"></el-table-column>
            <el-table-column prop="order_quantity" label="下单量"></el-table-column>
            <el-table-column prop="order_received" label="累计收货订单数"></el-table-column>
            <el-table-column prop="order_test" label="累计专业检测订单数"></el-table-column>
            <el-table-column prop="order_negotiated" label="累计正议价订单数"></el-table-column>
            <el-table-column prop="order_waivers" label="累计豁免的正议价订单数"></el-table-column>
            <el-table-column prop="order_exempted" :formatter="formatterPrice" label="累计豁免的正议价金额"></el-table-column>
            <el-table-column prop="order_return" label="累计退货订单数"></el-table-column>
            <el-table-column prop="recycle_amount" label="累计回收量"></el-table-column>
            <el-table-column prop="recycle_money" :formatter="formatterPrice" label="累计回收金额"></el-table-column>
            <el-table-column prop="recycle_valuation" :formatter="formatterPrice" label="累计回收的估价金额"></el-table-column>
          </el-table>
        </div>
        <div class="list-table hidden-sm-and-up">
          <el-table  :data="orderList.curList" stripe size="mini" :row-style="{fontSize:'12px'}" :header-row-style="{fontSize:'13px'}" height="100%" cell-class-name="" ref="table">
            
            <el-table-column prop="time" label="下单时间"></el-table-column>
            <el-table-column prop="order_quantity" label="下单量"></el-table-column>
            <el-table-column prop="order_received" label="累计收货订单数"></el-table-column>
            <el-table-column prop="order_test" label="累计专业检测订单数"></el-table-column>
            <el-table-column prop="order_negotiated" label="累计正议价订单数"></el-table-column>
            <el-table-column prop="order_waivers" label="累计豁免的正议价订单数"></el-table-column>
            <el-table-column prop="order_exempted" :formatter="formatterPrice" label="累计豁免的正议价金额"></el-table-column>
            <el-table-column prop="order_return" label="累计退货订单数"></el-table-column>
            <el-table-column prop="recycle_amount" label="累计回收量"></el-table-column>
            <el-table-column prop="recycle_money" :formatter="formatterPrice" label="累计回收金额"></el-table-column>
            <el-table-column prop="recycle_valuation" :formatter="formatterPrice" label="累计回收的估价金额"></el-table-column>
          </el-table>
        </div>
        
        <!-- 分页 -->
        <div class="list-pagination">
          <el-button  icon="el-icon-download" class="" @click="download" type="primary" style="margin-bottom:20px;margin-left:10px;">下载</el-button>      
          <el-pagination
            class="hidden-xs-only"
            background
            @size-change="handleSizeChange"
            :current-page.sync="orderList.currentPage"
            :page-size="orderList.pageSize"
            :page-sizes="[8, 15, 25, 30, 40]"
            layout="sizes, prev, pager, next, jumper, ->, total"
            :total="orderList.total">
          </el-pagination>
          <el-pagination
            class="hidden-sm-and-up"
            small
            background
            @current-change="handleCurrentChange({tableName: 'orderList'})"
            :current-page.sync="orderList.currentPage"
            :page-size="orderList.pageSize"
            layout="prev, pager, next"
            :total="orderList.total">
          </el-pagination>
        </div>
      </div>
    </div>
    
  </el-card>
</div>
</template>



<script type="text/javascript">
import globalParam from '@/common/globalParam';
import megerParam from '@/api/megerParam';
import axios from '@/common/axios_bs';

  export default {
    data () {
      return {
        lastUpdateTime: '2018-07-28 21:03',
        paramsBase:{},
        pidList: [{ name: '全部', pid: 0}],
        cidList: [{ name: '全部', cid: 0}],
        qidList: [{ name: '全部', qid: 0}],
        orderList: {
          interface: 'orderTimeAnalysis',
          getDataHandle: 'getorderList',
          loading: false,
          seachInfo: {
            times:[this.getTime('yesterday'),this.getTime('today')],
            startTime: '',
            endTime: '',
            qid: 0,
            pid: 0,
            cid: 0,
            qname:'全部',
            cname:'全部',
          },
          pageSize: 8,
          currentPage: 1,
          total: 0,
          allList:[],
          curList:[],
        },
        errorList: {
          'reportName': {
            isError: false,
            errMsg: ''
          },
          'reportId': {
            isError: false,
            errMsg: ''
          },
          'reportType': {
            isError: false,
            errMsg: ''
          },
          'source': {
            isError: false,
            errMsg: ''
          }
        },
        ruleForm: {
          qid:{
            qid: 0,
            name: '全部'
          },
          cid:{
            cid: 0,
            name: '全部'
          },
          pid:{
            name: '全部',
            pid: 0
          },
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
    },
    mounted () {
      
    },
    watch: {
      'orderList.seachInfo.times': {
        handler (n, old) {
          if (n && n.length === 2) {
            this.orderList.seachInfo.startTime = n[0];
            this.orderList.seachInfo.endTime = n[1];
          } else {
            this.orderList.seachInfo.startTime = '';
            this.orderList.seachInfo.endTime = '';
          }
        },
        deep: true
      }
    },
    components: {
    },
    methods: {
      init () {
        this.getorderList();
        this.getQidList();
      },
      formatterPrice (row, column) {
        return row[column.property]/100;
      },
      getTime (day) {
        let date = day === 'today'
          ? date = new Date()
          : new Date( new Date() - 3600 * 24 * 1000 )
        return date.format("yyyy-MM-dd");
      },
      getorderList () {
        let tableName = 'orderList';
        let boxInfo = this[tableName];
        this.getTableData({tableName})
        .then(data => {
          boxInfo.total = data.num ? Number(data.num) : 0;
          let list = data.list.length > 0 ? [...[data.count],...data.list] : [];
          boxInfo.curList = list;
        }).catch(d => {
          console.warn(d)
        })
      },
      getQidList(){
        let params = {};
        axios.post('/info', megerParam('getChanelFlagList', params)).then(d => {
        this.qidList = [...[ {name: '全部', qid: 0} ], ...d.list];
          return d
        }).catch(() => {
          return Promise.reject(`数据获取失败`)
        }) 
      },
      getCidList(){
        let params = { qid: this.ruleForm.qid.qid };
        axios.post('/info', megerParam('getChanelList', params)).then(d => {
          this.cidList =  [...[ {name: '全部', cid: 0} ], ...d.list];
          return d
        }).catch(() => {
          return Promise.reject(`数据获取失败`)
        }) 
      },
      getPidList(){
        let params = { cid: this.ruleForm.cid.cid };
        axios.post('/info', megerParam('getPidList', params)).then(d => {
          let tempPidList = [ {name: '全部', pid: 0} ];
          d.list.map( val => {
            tempPidList.push( {name: val.pid, pid: val.pid} )
          })
          this.pidList = tempPidList;
          return d
        }).catch(() => {
          return Promise.reject(`fs数据获取失败`)
        }) 
      },
      qidChange (){
        this.orderList.seachInfo.qid = this.ruleForm.qid.qid;
        this.orderList.seachInfo.qname = this.ruleForm.qid.name;
        this.ruleForm.cid = {name: '全部', cid: 0};
        this.orderList.seachInfo.cid = 0;
        this.orderList.seachInfo.pid = 0;
        this.getCidList();
      },
      pidChange (){
        this.orderList.seachInfo.pid = this.ruleForm.pid.pid;
      },
      cidChange (){
        this.orderList.seachInfo.cid = this.ruleForm.cid.cid;
        this.orderList.seachInfo.cname = this.ruleForm.cid.name;
        this.ruleForm.pid = {name: '全部', pid: 0};
        this.orderList.seachInfo.pid = 0;
        this.getPidList();
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
          page,
          length
        };
        Object.keys(searchInfo).forEach(i => {
          if (i !== 'times' && i!== 'qname' && i!='cname') {
            params[i] = searchInfo[i];
          }
        })
        
        params.startTime = params.startTime || this.getTime('yesterday');
        params.endTime = params.endTime || this.getTime('today');
        tableInfo['loading'] = true;
        this.paramsBase = params;
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
      download () {
        this.$confirm('确认导出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass: 'confirm-customClass',
            center: true
          }).then(() => {
            this.loading = true;
            let data = this.paramsBase;
            
            data['qname'] = this.orderList.seachInfo.qname;
            data['cname'] = this.orderList.seachInfo.cname;
            delete data['page'];
            delete data['length'];
            return this.$store.dispatch('exportReports',data)
          }).then(data => {
            this.$message({
              type: 'success',
              message: '导出成功'
            });
            this.close();
            this.loading = false;
          }).catch(data => {
            this.loading = false;
            if (!data.isCustomError) {
              this.$message({
                type: 'info',
                message: '已取消操作'
              }); 
            }
          });
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
        let tableInfo = this['orderList'];
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

@import '../../../../../styles/theme.css';
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

.box-card {
  top:50px;
}
.mg-tips {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  color: #ff7a4b;
}
</style>