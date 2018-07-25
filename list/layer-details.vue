<template>
  <div class="layer-details-wrapper">
    <el-dialog :title="title" visible center top="12vh" @close="close" width="700"  ref="dialog" append-to-body custom-class="dataWarn-add-layer"> 
      
      <div class="container">
        <el-table  :data="dataWarnList.curList" height="400" v-loading="dataWarnList.loading">
          <el-table-column prop="url" label="URL" show-overflow-tooltip label-class-name='showAll'></el-table-column>
          <el-table-column prop="value" label="访问总次数" show-overflow-tooltip width="200"></el-table-column>
        </el-table>
      <!-- 分页 -->
        <div class="list-pagination">
          <el-pagination
            small
            background
            @current-change="handleCurrentChange({tableName: 'dataWarnList'})"
            :current-page.sync="dataWarnList.currentPage"
            :page-size="dataWarnList.pageSize"
            layout="prev, pager, next, ->, total"
            :total="dataWarnList.total">
          </el-pagination>
        </div>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>



<script type="text/javascript">
import { deepClone } from '@/common/utils';
import megerParam from '@/api/megerParam';
import axios from '@/common/axios_bs';

  export default {
    data () {
      return {
        loading: false,
        dataWarnList: {
          interface: 'userAccessUrlRecord',
          getDataHandle: 'getDataWarnList',
          loading: false,
          searchName: '',
          pageSize: 10,
          currentPage: 1,
          total: 0,
          allList:[],
          curList:[],
        },
      };
    },
    props: ['params'],
    computed: {
      title () {
        return this.params.title || '详情'
      },
      warn_id () {
        return this.params.id;
      }
    },
    created () {
      // console.log(this.params,1)
      this.init()
    },
    mounted () {
    },
    components: {
    },
    methods: {
      close () {
        this.$refs.dialog.$el.parentElement.removeChild(this.$refs.dialog.$el)
        this.$emit('closeLayer')
      },
      init () {
        this.getDataWarnList()
      },
      getDataWarnList () {
        let tableName = 'dataWarnList';
        let boxInfo = this[tableName];
        this.getTableData({tableName})
        .then(data => {
          boxInfo.curList = data.list;
          // console.log(data.num)
          boxInfo.total = data.num*1;
        }).catch(error => {
          // console.warn(error)
        })
      },
      getTableData ({tableName}) {
        let tableInfo = this[tableName];
        // let pageIndex = tableInfo['currentPage'] - 1;
        // let pageSize = tableInfo['pageSize'];
        let _interface = tableInfo['interface'];
        
        let page = tableInfo['currentPage'] - 1;
        // console.log(this.params);
        let params = {
          interface: 'userAccessUrlRecord',
          startTime: this.params.startTime,
          // startTime: '2018-04-01',
          endTime: this.params.endTime,
          username: this.params.username,
          length:10,
          page
        };
        tableInfo['loading'] = true;

        return axios.post('/info', megerParam(_interface, params)).then(d => {
          tableInfo['loading'] = false;
          // return d.retData
          return d
        }).catch(() => {
          tableInfo['loading'] = false;
          return Promise.reject(`${tableName} 数据获取失败`)
        })
      },
      handleCurrentChange ({tableName}) {
        let tableInfo = this[tableName];
        tableInfo.getDataHandle && this[tableInfo.getDataHandle]()
      },
      formatterStatus (row, column, cellValue) {
        let v = String(cellValue);
        return v === '0'
             ? '发送成功'
             : v === '1'
             ? '发送失败'
             : v === '-1'
             ? '未发送'
             : '状态不明'
      },
    }
  };
</script>

<style type="text/css" scope>
.el-table .cell.el-tooltip {
  white-space: normal;
}
</style>