<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-button type="primary" size="mini" style="padding: 3px 7px;margin: 8px 5px 0 0;"><i class="el-icon-folder-checked" @click="dialogVisible = true" /></el-button>
        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom"><screenfull id="screenfull" class="right-menu-item hover-effect" /></el-tooltip>
        <el-tooltip :content="$t('navbar.words')" effect="dark" placement="bottom"><size-select id="size-select" class="right-menu-item hover-effect" /></el-tooltip>
        <el-tooltip :content="$t('navbar.Chinese')" effect="dark" placement="bottom"><lang-select class="right-menu-item hover-effect" /></el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div v-rest-styleColor="theme" class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          {{ this.$store.getters.name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item><span style="display:block;" @click="revisePas">修改密码</span></el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- //导入文件 -->
    <el-dialog style="margin-top: 25vh;" :title="newTitle" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false" width="30%">
      <el-upload
        ref="upload"
        v-loading="loading"
        element-loading-text="请稍等,文件上传并解析中...."
        element-loading-spinner="el-icon-loading"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/excel/upload'"
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
    </el-dialog>

    <!-- 修改密 -->
    <el-dialog title="修改密码" :visible.sync="dialogPassWord" :modal-append-to-body="false" :close-on-click-modal="false" width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:">{{ name }}</el-form-item>
        <el-form-item label="密码:" prop="password"><el-input v-model="ruleForm.password" type="password" autocomplete="off" /></el-form-item>
        <el-form-item label="确认密码:" prop="checkPass"><el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" /></el-form-item>
        <el-form-item style="text-align: center;"><el-button type="primary" @click="submitForm('ruleForm')">提交</el-button></el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import { userEdit } from '@/api/business'
// import Search from '@/components/HeaderSearch'
import { getToken } from '@/utils/auth' // get token from cookie
const hasToken = getToken()
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect
    // Search
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      myHeaders: { Authorization: hasToken }, // 获取token
      dialogVisible: false,
      loading: false,
      dialogPassWord: false,
      ruleForm: {
        id: this.$store.state.user.id,
        password: '',
        checkPass: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },

      newTitle: this.$t('table.upData')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'realname', 'name', 'id']),
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.newTitle = this.$t('table.upData')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push({ path: '/login' })
    },

    // 修改密码
    revisePas() {
      this.dialogPassWord = true
    },
    // 密码提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userEdit(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改密码成功,请从新登录!'
              })
              this.dialogPassWord = false
              setTimeout(() => {
                this.logout()
              }, 2000)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 解析文件
    // closeOk() {
    //   this.loading = true
    //   analysis().then(res => {
    //     if (res.code === 200) {
    //       this.$message.success('恭喜你，解析成功！')
    //       this.loading = false
    //     } else {
    //       this.$message.error(res.message)
    //       this.loading = false
    //     }
    //   })
    //   this.dialogVisible = false
    // },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.loading = false
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
        this.loading = false
        this.$refs.upload.clearFiles()
      }
    },
    // 失败
    handleAvatarError(res, file) {
      if (res.code === 500 && res.type === 'error') {
        this.$message.error(this.$t('table.upError'))
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt50M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      this.loading = true
      return isXLS && isLt50M
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 42px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.el-popup-parent--hidden {
  v-deep .v-modal {
    z-index: 5 !important;
  }
}
</style>
