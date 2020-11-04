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
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- //导入文件 -->
    <el-dialog :title="newTitle" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false" width="30%">
      <!--  <el-upload
        ref="upload"
        v-loading="loading"
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

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeOk">{{ $t('table.closeOk') }}</el-button>
      </span>
    </el-dialog> -->
      <ImprotFile
        :dialog-visible="dialogVisible"
        :improt-loading="improtLoading"
        :production-url="productionUrl"
        @handleavatarsuccess="handleAvatarSuccess"
        @beforeavatarupload="beforeAvatarUpload"
        @fileClose="fileClose"
      />
    </el-dialog></div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import { analysis } from '@/api/tenGrid'
// import Search from '@/components/HeaderSearch'
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
// import { getToken } from '@/utils/auth' // get token from cookie
// const hasToken = getToken()
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect,
    ImprotFile
    // Search
  },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/excel/file',
      // myHeaders: { Authorization: hasToken }, // 获取token
      dialogVisible: false,
      loading: false,
      improtLoading: false, // 导入文件进度loading
      newTitle: this.$t('table.upData')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
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
    // 解析文件
    closeOk() {
      this.loading = true
      analysis().then(res => {
        if (res.code === 200) {
          this.$message.success('恭喜你，解析成功！')
          this.loading = false
        } else {
          this.$message.error(res.message)
          this.loading = false
        }
      })
      this.dialogVisible = false
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
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
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
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
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
      font-size: 18px;
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

.el-popup-parent--hidden{
  v-deep .v-modal {
    z-index: 5 !important;
  }
}

</style>
