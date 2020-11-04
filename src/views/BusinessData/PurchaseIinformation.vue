<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.poNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.poNo" :placeholder="$t('permission.poNo')" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button v-if="showBtn" type="primary" icon="el-icon-download" @click="download">下载数据</el-button>
      <el-button v-else type="primary" :loading="true">下载中...</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#008284',color:'#ffffff' }"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" :label="$t('permission.poNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poItemNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poItemId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.conCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.conName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.buyerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.buyerCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialDesc')" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amountOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerConCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.sellerConCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.serialNumber')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.serialNumber }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerSignTime')" width="120">
        <template slot-scope="scope">
          {{ scope.row.sellerSignTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conType')" :show-overflow-tooltip="true" width="120">
        <template slot-scope="scope">
          {{ scope.row.conType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.prjCode')" width="100">
        <template slot-scope="scope">
          {{ scope.row.prjCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.prjName')" :show-overflow-tooltip="true" width="150">
        <template slot-scope="scope">
          {{ scope.row.prjName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.fixedTechId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.fixedTechId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pkgNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pkgNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.bidBatCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.bidBatCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.extDes')" width="120">
        <template slot-scope="scope">
          {{ scope.row.extDes }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMaxCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMedCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMinCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMaxName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMedName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMinName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modifyTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.modifyTime }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { poList, poDown } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 270
export default {
  name: 'PurchaseIinformation',
  components: { Pagination },
  data() {
    return {
      tableData: [],
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        poNo: undefined,
        importDate: []
      },
      listLoading: true,
      total: 10,
      showBtn: true, // 默认显示下载数据按钮
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      content1: this.$t('permission.poNo'),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }
        ]
      }
    }
  },
  computed: {},
  watch: {
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    'listQuery.importDate': {
      handler(val) {
        this.pagination.startTime = val[0] + ' 00:00:00'
        this.pagination.endTime = val[1] + ' 23:59:59'
      },
      deep: true
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.poNo')
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    this.listQuery.importDate[0] = this.$moment(new Date())
      .subtract(5, 'months')
      .format('YYYY-MM-DD 00:00:00')
    this.listQuery.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
    this.pagination.startTime = this.listQuery.importDate[0]
    this.pagination.endTime = this.listQuery.importDate[1]
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }
    this.getList()
  },
  methods: {
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.listQuery.importDate[0] = val[0]
      this.listQuery.importDate[1] = val[1]
    },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.poNo === '') {
        this.listQuery.poNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        poNo: undefined,
        importDate: [
          this.$moment(new Date())
            .subtract(5, 'months')
            .format('YYYY-MM-DD'),
          this.$moment(new Date()).format('YYYY-MM-DD')
        ]
      }
      this.pagination = {
        current: 1,
        size: 50
      }
      this.getList()
    },
    // 获取列表
    getList() {
      this.listLoading = true
      poList(this.pagination, this.listQuery).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // 下载数据
    download() {
      this.listLoading = true
      this.showBtn = false
      poDown().then(res => {
        if (res.code === 200) {
          this.getList()
          this.$message({
            type: 'success',
            message: '下载成功!'
          })
          this.listLoading = false
          this.showBtn = true
        } else {
          this.$message({
            type: 'error',
            message: '下载失败!'
          })
        }
      })
      this.listLoading = false
      this.showBtn = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
