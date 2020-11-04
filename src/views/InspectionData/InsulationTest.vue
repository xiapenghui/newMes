<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierWorkNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierWorkNo" :placeholder="$t('permission.supplierWorkNo')" clearable /></el-col>
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
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />

      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUpload === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUpload === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="100">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="120">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierWorkNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="120">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.factoryCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.factoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierSupportId')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierSupportId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModelOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.equipmentName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentUniqueCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.equipmentUniqueCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="150">
        <template slot-scope="scope">
          {{ scope.row.isAlarmData }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')" width="120">
        <template slot-scope="scope">
          {{ scope.row.alarmItem }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processTypeThree')" width="120">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.checkTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.putCenterTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.putCenterTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ContactNums')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ContactNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.MaterialSNs')" width="150">
        <template slot-scope="scope">
          {{ scope.row.materialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValueUnOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pressureValueUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValueTwo')" width="180">
        <template slot-scope="scope">
          {{ scope.row.pressureValue }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.pressureTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog
      title="编辑信息"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂名称" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="供应商工单编号" prop="supplierWorkNo"><el-input v-model="ruleForm.supplierWorkNo" /></el-form-item>
            <el-form-item label="规格型号编码" prop="modelCode"><el-input v-model="ruleForm.modelCode" /></el-form-item>
            <el-form-item label="厂区编号"><el-input v-model="ruleForm.factoryCode" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="供应商产品厂内编号" placement="top-start">
              <el-form-item label="供应商产品厂内编号" prop="productModel"><el-input v-model="ruleForm.productModel" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="生产设备唯一识别号" placement="top-start">
              <el-form-item label="生产设备唯一识别号" prop="equipmentUniqueCode"><el-input v-model="ruleForm.equipmentUniqueCode" /></el-form-item>
            </el-tooltip>
            <el-form-item label="是告警问题数据"><el-input v-model="ruleForm.isAlarmData" /></el-form-item>
            <el-form-item label="感知过程" prop="processType"><el-input v-model="ruleForm.processType" /></el-form-item>
            <el-form-item label="采集时间" prop="checkTime">
              <el-date-picker v-model="ruleForm.checkTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-tooltip class="item" effect="dark" content="合同出厂编号(常州)" placement="top-start">
              <el-form-item label="合同出厂编号(常州)" prop="contactNum"><el-input v-model="ruleForm.contactNum" /></el-form-item>
            </el-tooltip>
            <el-form-item label="额定耐压值(kV)" prop="pressureValueUn"><el-input v-model="ruleForm.pressureValueUn" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="采集规范版本号" prop="standardVersion"><el-input v-model="ruleForm.standardVersion" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="国网侧供应商编码" placement="top-start">
              <el-form-item label="国网侧供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            </el-tooltip>
            <el-form-item label="物资品类类型" prop="categoryType"><el-input v-model="ruleForm.categoryType" /></el-form-item>
            <el-form-item label="供应商产品编号"><el-input v-model="ruleForm.supplierSupportId" /></el-form-item>
            <el-form-item label="生产设备名称" prop="equipmentName"><el-input v-model="ruleForm.equipmentName" /></el-form-item>
            <el-form-item label="告警项"><el-input v-model="ruleForm.alarmItem" /></el-form-item>
            <el-form-item label="工序" prop="pdCode"><el-input v-model="ruleForm.pdCode" /></el-form-item>
            <el-form-item label="入数采中心时间" prop="putCenterTime">
              <el-date-picker v-model="ruleForm.putCenterTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="成品序列号" prop="materialSN"><el-input v-model="ruleForm.materialSN" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="耐压值（二次耐压值" placement="top-start">
              <el-form-item label="耐压值（二次耐压值）" prop="pressureValue"><el-input v-model="ruleForm.pressureValue" /></el-form-item>
            </el-tooltip>
            <el-form-item label="耐压持续时间(s)" prop="pressureTime"><el-input v-model="ruleForm.pressureTime" /></el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 上传文件弹窗 -->
    <!-- <el-dialog
      title="导入文件"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/kvsc/acit/import/file'"
        :headers="this.myHeaders"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">{{ $t('table.clickUp') }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('table.onlyUpload') }}
          <b>{{ $t('table.xls') }}</b>
          {{ $t('table.or') }}
          <b>{{ $t('table.xlsx') }}</b>
          {{ $t('table.fileSize') }}
        </div>
      </el-upload>
    </el-dialog> -->
    <ImprotFile
      :dialog-visible="dialogVisible"
      :improt-loading="improtLoading"
      :production-url="productionUrl"
      @handleavatarsuccess="handleAvatarSuccess"
      @beforeavatarupload="beforeAvatarUpload"
      @fileClose="fileClose"
    />

    <!-- 日志弹出框 -->
    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="gridData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="工厂:">
                <span>{{ props.row.requestBody.saleOrg }}</span>
              </el-form-item>
              <el-form-item label="采集规范版本号:">
                <span>{{ props.row.requestBody.standardVersion }}</span>
              </el-form-item>
              <el-form-item label="供应商工单编号:">
                <span>{{ props.row.requestBody.supplierWorkNo }}</span>
              </el-form-item>
              <el-form-item label="国网侧供应商编码:">
                <span>{{ props.row.requestBody.supplierCode }}</span>
              </el-form-item>
              <el-form-item label="规格型号编码:">
                <span>{{ props.row.requestBody.modelCode }}</span>
              </el-form-item>
              <el-form-item label="物资品类类型:">
                <span>{{ props.row.requestBody.categoryType }}</span>
              </el-form-item>
              <el-form-item label="厂区编号:">
                <span>{{ props.row.requestBody.factoryCode }}</span>
              </el-form-item>
              <el-form-item label="供应商产品编号:">
                <span>{{ props.row.requestBody.supplierSupportId }}</span>
              </el-form-item>
              <el-form-item label="供应商产品厂内编号:">
                <span>{{ props.row.requestBody.productModel }}</span>
              </el-form-item>
              <el-form-item label="生产设备名称:">
                <span>{{ props.row.requestBody.equipmentName }}</span>
              </el-form-item>
              <el-form-item label="生产设备唯一识别号:">
                <span>{{ props.row.requestBody.equipmentUniqueCode }}</span>
              </el-form-item>
              <el-form-item label="是否是告警问题数据:">
                <span>{{ props.row.requestBody.isAlarmData }}</span>
              </el-form-item>
              <el-form-item label="告警项:">
                <span>{{ props.row.requestBody.alarmItem }}</span>
              </el-form-item>
              <el-form-item label="感知过程:">
                <span>{{ props.row.requestBody.processType }}</span>
              </el-form-item>
              <el-form-item label="工序:">
                <span>{{ props.row.requestBody.pdCode }}</span>
              </el-form-item>
              <el-form-item label="采集时间:">
                <span>{{ props.row.requestBody.checkTime }}</span>
              </el-form-item>
              <el-form-item label="入数采中心时间:">
                <span>{{ props.row.requestBody.putCenterTime }}</span>
              </el-form-item>
              <el-form-item label="断路器出厂编号(常州/nature):">
                <span>{{ props.row.requestBody.contactNum }}</span>
              </el-form-item>
              <el-form-item label="成品序列号(PDSE):">
                <span>{{ props.row.requestBody.materialSN }}</span>
              </el-form-item>
              <el-form-item label="额定值:">
                <span>{{ props.row.requestBody.pressureValueUn }}</span>
              </el-form-item>
              <el-form-item label="耐压值（二次耐压值）(kV):">
                <span>{{ props.row.requestBody.pressureValue }}</span>
              </el-form-item>
              <el-form-item label="耐压持续时间(s):">
                <span>{{ props.row.requestBody.pressureTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="150px" />
        <el-table-column label="状态" align="center" prop="levelString" width="100px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.levelString" :class="[scope.row.levelString === 'ERROR' ? 'classRed' : 'classGreen']">
              {{ scope.row.levelString === 'ERROR' ? '错误' : '成功' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="modelName" label="模块名称" align="center" width="150px" />
        <el-table-column label="消息日志" align="center" prop="message" />
      </el-table>
      <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationLog.current" :size.sync="paginationLog.size" @pagination="getLogList" />
    </el-dialog>

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { routerList, routerDellte, routerEdit, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
const fixHeight = 270
export default {
  name: 'InsulationTest',
  components: { Pagination, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/kvsc/acit/import/file',
      // 日志分页
      paginationLog: {
        current: 1,
        size: 20
      },
      logTotal: 0,
      logId: {}, // 日志行数据
      tableData: [],
      gridData: [], // 日志信息
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        supplierWorkNo: undefined,
        importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      improtLoading: false, // 导入文件进度loading
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.supplierWorkNo'),
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
      },
      rules: {
        saleOrg: [{ required: true, message: '请输入工厂', trigger: 'blur' }],
        standardVersion: [{ required: true, message: '请输入采集规范版本号', trigger: 'blur' }],
        supplierWorkNo: [{ required: true, message: '请输入供应商工单编号', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入国网侧供应商编码', trigger: 'blur' }],
        modelCode: [{ required: true, message: '请输入规格型号编码', trigger: 'blur' }],
        categoryType: [{ required: true, message: '请输入物资品类类型', trigger: 'blur' }],
        productModel: [{ required: true, message: '请输入供应商产品厂内编号', trigger: 'blur' }],
        equipmentName: [{ required: true, message: '请输入生产设备名称', trigger: 'blur' }],
        equipmentUniqueCode: [{ required: true, message: '请输入生产设备唯一识别号', trigger: 'blur' }],
        processType: [{ required: true, message: '请输入感知过程', trigger: 'blur' }],
        pdCode: [{ required: true, message: '请输入工序', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请输入采集时间', trigger: 'blur' }],
        putCenterTime: [{ required: true, message: '请输入入数采中心时间', trigger: 'blur' }],
        contactNum: [{ required: true, message: '请输入断路器出厂编号', trigger: 'blur' }],
        materialSN: [{ required: true, message: '请输入成品序列号', trigger: 'blur' }],
        pressureValueUn: [{ required: true, message: '请输入额定值', trigger: 'blur' }],
        pressureValue: [{ required: true, message: '请输入耐压值（二次耐压值）', trigger: 'blur' }],
        pressureTime: [{ required: true, message: '请输入耐压持续时间', trigger: 'blur' }]
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
      this.content1 = this.$t('permission.supplierWorkNo')
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    this.listQuery.importDate[0] = this.$moment(new Date())
      .subtract(1, 'months')
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
      if (this.listQuery.supplierWorkNo === '') {
        this.listQuery.supplierWorkNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplierWorkNo: undefined,
        importDate: [
          this.$moment(new Date())
            .subtract(1, 'months')
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

    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 点击日志
    clickLogs(row) {
      this.logId = row
      allLogs(this.paginationLog, { dataId: row.id }).then(res => {
        if (res.data.records.length > 0) {
          this.dialogTableVisible = true
          res.data.records.map(item => {
            item.requestBody = JSON.parse(item.requestBody)
          })
          this.gridData = res.data.records
          this.logTotal = res.data.total
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无操作日志！')
        }
      })
    },

    // 日志分页
    getLogList(val) {
      this.paginationLog = val
      this.clickLogs(this.logId)
    },

    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.id
              idList.push(newFeatid)
            })
            routerDellte(idList).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: this.$t('table.deleteError')
            })
          })
      }
    },
    // 获取列表
    getList() {
      this.listLoading = true
      routerList(this.pagination, this.listQuery).then(res => {
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
    // 编辑
    handleEdit(index, row) {
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          routerEdit(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('table.editSuc')
              })
              this.editLoading = false
              this.dialogFormVisible = false
              this.getList()
            }
          })
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 关闭导入文件弹窗
    fileClose() {
      this.dialogVisible = false
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.improtLoading = false
        this.getList()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
        this.improtLoading = false
      }
    },
    // 失败
    // handleAvatarError(res, file) {
    //   if (res.code === 500 && res.type === 'error') {
    //     this.$message.error(this.$t('table.upError'))
    //   }
    // },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt50M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      this.improtLoading = true
      return isXLS && isLt50M
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
