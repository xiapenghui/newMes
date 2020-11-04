<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ipoNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ipoNo" :placeholder="$t('permission.ipoNoInfo')" clearable /></el-col>
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
      <el-button type="primary" icon="el-icon-upload2" @click="okUpload">上传国网</el-button>
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

      <el-table-column align="center" :label="$t('permission.isUploadProd')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUploadProd === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUploadProd === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadWo')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUploadWo === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUploadWo === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadSd')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUploadSd === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUploadSd === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadPw')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUploadPw === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUploadPw === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.soNo')" width="100">
        <template slot-scope="scope">
          {{ scope.row.soNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.soItemNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.soItemNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.ipoNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.materialsCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.materialsName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amount')" width="100">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.unit')" width="100">
        <template slot-scope="scope">
          {{ scope.row.unit }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planStartDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.planStartDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planFinishDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.planFinishDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualStartDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.actualStartDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualFinishDate')" width="150">
        <template slot-scope="scope">
          {{ scope.row.actualFinishDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.woStatus')" width="100">
        <template slot-scope="scope">
          {{ scope.row.woStatus }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="100">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.purchaserHqCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoType')" width="100">
        <template slot-scope="scope">
          {{ scope.row.ipoType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="130">
        <template slot-scope="scope">
          {{ scope.row.categoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.subclassCode')" width="100">
        <template slot-scope="scope">
          {{ scope.row.subclassCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.scheduleCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.scheduleCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poItemId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataType')" width="120">
        <template slot-scope="scope">
          {{ scope.row.dataType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsUnit')" width="100">
        <template slot-scope="scope">
          {{ scope.row.materialsUnit }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsDesc')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.materialsDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdGrpNo')" width="100">
        <template slot-scope="scope">
          {{ scope.row.productIdGrpNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdType')" width="100">
        <template slot-scope="scope">
          {{ scope.row.productIdType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModel')" width="100">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.plantName')" width="100">
        <template slot-scope="scope">
          {{ scope.row.plantName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.workshopName')" width="100">
        <template slot-scope="scope">
          {{ scope.row.workshopName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoStatus')" width="100">
        <template slot-scope="scope">
          {{ scope.row.ipoStatus }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.center')" width="100">
        <template slot-scope="scope">
          {{ scope.row.center }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="100">
        <template slot-scope="scope">
          {{ scope.row.dataSource }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.dataSourceCreateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="100">
        <template slot-scope="scope">
          {{ scope.row.ownerId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="100">
        <template slot-scope="scope">
          {{ scope.row.openId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dueDate')" width="180">
        <template slot-scope="scope">
          {{ scope.row.dueDate }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processCode')" width="100">
        <template slot-scope="scope">
          {{ scope.row.processCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processName')" width="100">
        <template slot-scope="scope">
          {{ scope.row.processName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerProvince')" width="100">
        <template slot-scope="scope">
          {{ scope.row.buyerProvince }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planPeriod')" width="120">
        <template slot-scope="scope">
          {{ scope.row.planPeriod }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">{{ $t('table.delete') }}</el-button> -->
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="销售订单号码" prop="soNo"><el-input v-model="ruleForm.soNo" /></el-form-item>
            <el-form-item label="生产订单号" prop="ipoNo"><el-input v-model="ruleForm.ipoNo" /></el-form-item>
            <el-form-item label="厂家物料名称" prop="materialsName"><el-input v-model="ruleForm.materialsName" /></el-form-item>
            <el-form-item label="计量单位" prop="unit"><el-input v-model="ruleForm.unit" /></el-form-item>
            <el-form-item label="计划完成日期" prop="planFinishDate">
              <el-date-picker v-model="ruleForm.planFinishDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="实际完成日期"><el-date-picker v-model="ruleForm.actualFinishDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" /></el-form-item>
            <el-form-item label="工厂" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="订单类型" prop="ipoType"><el-input v-model="ruleForm.ipoType" /></el-form-item>
            <el-form-item label="供应商名称" prop="supplierName"><el-input v-model="ruleForm.supplierName" /></el-form-item>
            <el-form-item label="种类编码" prop="subclassCode"><el-input v-model="ruleForm.subclassCode" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="采购订单行项目id" placement="top-start">
              <el-form-item label="采购订单行项目id" prop="poItemId"><el-input v-model="ruleForm.poItemId" /></el-form-item>
            </el-tooltip>
            <el-form-item label="厂家物资单位" prop="materialsUnit"><el-input v-model="ruleForm.materialsUnit" /></el-form-item>
            <el-form-item label="物资id分组"><el-input v-model="ruleForm.productIdGrpNo" /></el-form-item>
            <el-form-item label="产品型号"><el-input v-model="ruleForm.productModel" /></el-form-item>
            <el-form-item label="生产车间名称"><el-input v-model="ruleForm.workshopName" /></el-form-item>
            <el-form-item label="生产中心"><el-input v-model="ruleForm.center" /></el-form-item>
            <el-form-item label="来源数据创建时间">
              <el-date-picker v-model="ruleForm.dataSourceCreateTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="数据可见方"><el-input v-model="ruleForm.openId" /></el-form-item>
            <el-form-item label="工序号" prop="processCode"><el-input v-model="ruleForm.processCode" /></el-form-item>
            <el-form-item label="客户所属省份" prop="processCode"><el-input v-model="ruleForm.buyerProvince" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-tooltip class="item" effect="dark" content="销售订单行项目号" placement="top-start">
              <el-form-item label="销售订单行项目号" prop="soItemNo"><el-input v-model="ruleForm.soItemNo" /></el-form-item>
            </el-tooltip>
            <el-form-item label="厂家物料编码" prop="materialsCode"><el-input v-model="ruleForm.materialsCode" /></el-form-item>
            <el-form-item label="生产数量" prop="amount"><el-input v-model="ruleForm.amount" /></el-form-item>
            <el-form-item label="计划开始日期" prop="planStartDate">
              <el-date-picker v-model="ruleForm.planStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="实际开始日期"><el-date-picker v-model="ruleForm.actualStartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" /></el-form-item>
            <el-form-item label="工单状态" prop="woStatus"><el-input v-model="ruleForm.woStatus" /></el-form-item>
            <el-form-item label="采购方总部编码" prop="purchaserHqCode"><el-input v-model="ruleForm.purchaserHqCode" /></el-form-item>
            <el-form-item label="供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            <el-form-item label="品类编码" prop="categoryCode"><el-input v-model="ruleForm.categoryCode" /></el-form-item>
            <el-form-item label="排产计划编码" prop="scheduleCode"><el-input v-model="ruleForm.scheduleCode" /></el-form-item>
            <el-form-item label="数据关联类型"><el-input v-model="ruleForm.dataType" /></el-form-item>
            <el-form-item label="厂家物料描述" prop="materialsDesc"><el-input v-model="ruleForm.materialsDesc" /></el-form-item>
            <el-form-item label="物资id类型"><el-input v-model="ruleForm.productIdType" /></el-form-item>
            <el-form-item label="生产工厂名称"><el-input v-model="ruleForm.plantName" /></el-form-item>
            <el-form-item label="生产订单状态"><el-input v-model="ruleForm.ipoStatus" /></el-form-item>
            <el-form-item label="数据来源" prop="dataSource"><el-input v-model="ruleForm.dataSource" /></el-form-item>
            <el-form-item label="数据拥有方"><el-input v-model="ruleForm.ownerId" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="交付日期（最后日期，底线）" placement="top-start">
              <el-form-item label="交付日期（最后日期，底线）" prop="dueDate">
                <el-date-picker v-model="ruleForm.dueDate" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
              </el-form-item>
            </el-tooltip>
            <el-form-item label="工序名称" prop="processName"><el-input v-model="ruleForm.processName" /></el-form-item>
            <el-tooltip class="item" effect="dark" content="计划工期（天数" placement="top-start">
              <el-form-item label="计划工期（天数）" prop="planPeriod"><el-input v-model="ruleForm.planPeriod" /></el-form-item>
            </el-tooltip>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 日志弹出框 -->
    <log-dialog :is-show="dialogTableVisible" :log-total="logTotal" :pagination-log="paginationLog" :data="gridData" @pageChange="getLogList" @closeLog="closeLog" />

    <!-- 上传文件弹窗 -->
    <!-- <el-dialog
      title="导入文件"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-upload
        ref="upload"
        v-loading="improtLoading"
        element-loading-text="请稍等,文件上传并解析中...."
        element-loading-spinner="el-icon-loading"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/eip/prod/import/file'"
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
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { productionList, productionDellte, productionEdit, productionUpload, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import logDialog from '@/components/logDialog' // 日志封装
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
const fixHeight = 270
export default {
  name: 'ProductionList',
  components: { Pagination, logDialog, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/eip/prod/import/file',
      // 日志分页
      paginationLog: {
        current: 1,
        size: 10
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
        ipoNo: undefined,
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
      // content1: this.$t('permission.supplierName'),
      content2: this.$t('permission.ipoNo'),
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
        soNo: [{ required: true, message: '请输入销售订单号码', trigger: 'blur' }],
        soItemNo: [{ required: true, message: '请输入销售订单行项目号', trigger: 'blur' }],
        ipoNo: [{ required: true, message: '请输入生产订单号', trigger: 'blur' }],
        materialsCode: [{ required: true, message: '请输入厂家物料编码', trigger: 'blur' }],
        materialsName: [{ required: true, message: '请输入厂家物料名称', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入生产数量', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        planStartDate: [{ required: true, message: '请输入计划开始日期', trigger: 'blur' }],
        planFinishDate: [{ required: true, message: '请输入计划完成日期', trigger: 'blur' }],
        woStatus: [{ required: true, message: '请输入工单状态 ', trigger: 'blur' }],
        saleOrg: [{ required: true, message: '请输入工厂 ', trigger: 'blur' }],
        purchaserHqCode: [{ required: true, message: '请输入采购方总部编码 ', trigger: 'blur' }],
        ipoType: [{ required: true, message: '请输入订单类型 ', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入供应商编码 ', trigger: 'blur' }],
        supplierName: [{ required: true, message: '请输入供应商名称 ', trigger: 'blur' }],
        categoryCode: [{ required: true, message: '请输入品类编码 ', trigger: 'blur' }],
        subclassCode: [{ required: true, message: '请输入种类编码 ', trigger: 'blur' }],
        scheduleCode: [{ required: true, message: '请输入排产计划编码 ', trigger: 'blur' }],
        poItemId: [{ required: true, message: '请输入采购订单行项目id ', trigger: 'blur' }],
        materialsUnit: [{ required: true, message: '请输入厂家物资单位 ', trigger: 'blur' }],
        materialsDesc: [{ required: true, message: '请输入厂家物料描述 ', trigger: 'blur' }],
        dataSource: [{ required: true, message: '请输入数据来源 ', trigger: 'blur' }],
        dueDate: [{ required: true, message: '请输入交付日期（排产最后交付日期） ', trigger: 'blur' }],
        processCode: [{ required: true, message: '请输入工序号', trigger: 'blur' }],
        processName: [{ required: true, message: '请输入工序名称', trigger: 'blur' }],
        buyerProvince: [{ required: true, message: '请输入客户所属省份', trigger: 'blur' }],
        planPeriod: [{ required: true, message: '请输入计划工期（天数）', trigger: 'blur' }]
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
      // this.content1 = this.$t('permission.supplierName')
      this.content2 = this.$t('permission.ipoNo')
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
      if (this.listQuery.ipoNo === '') {
        this.listQuery.ipoNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        ipoNo: undefined,
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
    //  关闭日志弹窗
    closeLog() {
      this.dialogTableVisible = false
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
            productionDellte(idList).then(res => {
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
      productionList(this.pagination, this.listQuery).then(res => {
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
          productionEdit(this.ruleForm).then(res => {
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
    // 上传
    okUpload() {
      this.listLoading = true
      productionUpload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
        this.getList()
        this.listLoading = false
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
