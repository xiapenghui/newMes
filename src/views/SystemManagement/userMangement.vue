<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.username') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.username" :placeholder="$t('permission.userNameInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start">
              <label class="radio-label">创建时间:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAddUser">{{ $t('permission.addUser') }}</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
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
      <el-table-column type="selection" align="center" width="55" fixed :selectable="selectable" />

      <el-table-column align="center" label="用户名" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色" prop="isAdmin" sortable width="150">
        <template slot-scope="scope">
          <el-tag :class="[scope.row.isAdmin === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isAdmin === 0 ? '管理员' : '普通用户' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工厂" width="150">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" width="150">
        <template slot-scope="scope">
          {{ scope.row.realname }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓别" prop="sex" sortable width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 0" class="classRed"> 男</el-tag>
          <el-tag v-else-if="scope.row.sex === 1" class="classGreen"> 女</el-tag>
          <el-tag v-else-if="scope.row.sex === null" class="classNone" /></el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="createTime" sortable>
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogType === 'edit' ? $t('permission.editUser') : $t('permission.addUser')"
    >
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="用户名" prop="username"><el-input v-model="ruleForm.username" /></el-form-item>
        <el-form-item v-if="isPassword" label="密码" prop="password"><el-input v-model="ruleForm.password" /></el-form-item>

        <el-form-item label="角色" prop="isAdmin">
          <el-select v-model="ruleForm.isAdmin" placeholder="请选择"><el-option v-for="item in isAdminList" :key="item.value" :label="item.label" :value="item.value" /></el-select>
        </el-form-item>
        <el-form-item label="工厂" prop="supplierId">
          <el-select v-model="ruleForm.supplierId" placeholder="请选择">
            <el-option v-for="item in supplierIdList" :key="item.id" :label="item.saleOrg" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名"><el-input v-model="ruleForm.realname" /></el-form-item>
        <el-form-item label="性别">
          <el-select v-model="ruleForm.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话"><el-input v-model="ruleForm.phone" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="ruleForm.email" /></el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { userList, userDellte, userEdit, saleOrg, userAdd } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
const fixHeight = 280
export default {
  components: { Pagination },
  data() {
    // 手机号验证
    // var checkPhone = (rule, value, callback) => {
    //   const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
    //   if (!value) {
    //     return callback(new Error('电话号码不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(+value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (phoneReg.test(value)) {
    //         callback()
    //       } else {
    //         callback(new Error('电话号码格式不正确'))
    //       }
    //     }
    //   }, 100)
    // }
    return {
      tableData: [],
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        username: undefined,
        importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.username'),
      dialogType: 'new',
      supplierIdList: [],
      changeName: [],
      pushName: '',
      isAdminList: [
        {
          value: 0,
          label: '管理员'
        },
        {
          value: 1,
          label: '普通用户'
        }
      ],
      sexList: [
        {
          value: 0,
          label: '男'
        },
        {
          value: 1,
          label: '女'
        }
      ],
      isPassword: false,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用密码', trigger: 'blur' }],
        supplierId: [{ required: true, message: '请选择工厂', trigger: 'change' }],
        isAdmin: [{ required: true, message: '请选择角色', trigger: 'change' }]
        // realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        // phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        // phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        // email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
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
    this.getSaleOrg() // 获取所有工厂
  },
  methods: {
    selectable(row, index) {
      return row.username !== 'admin'
    },
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.listQuery.importDate[0] = val[0]
      this.listQuery.importDate[1] = val[1]
    },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.username === '') {
        this.listQuery.username = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        username: undefined,
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
            userDellte(idList).then(res => {
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
              type: 'info',
              message: this.$t('table.deleteError')
            })
          })
      }
    },
    // 增加角色
    handleAddUser() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
      this.isPassword = true
      this.ruleForm = {}
    },

    // 获取列表
    getList() {
      this.listLoading = true
      userList(this.pagination, this.listQuery).then(res => {
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
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.isPassword = false
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },

    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogType === 'edit') {
            userEdit(this.ruleForm).then(res => {
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
            userAdd(this.ruleForm).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.addSuc')
                })
                this.editLoading = false
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.editLoading = false
                this.dialogFormVisible = false
              }
            })
          }
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
    // 获取所有工厂
    getSaleOrg() {
      saleOrg().then(res => {
        this.supplierIdList = res.data
      })
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
