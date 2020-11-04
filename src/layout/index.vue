<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings"><settings /></right-panel>
    </div>

    <!-- //导入文件 -->
    <!-- <el-button type="primary" size="mini" style="position: absolute;top: 10px; right: 260px;z-index: 9;" @click="dialogVisible = true">
      <i class="el-icon-folder-checked" />
    </el-button> -->
    <!--   <el-dialog
      :title="newTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-upload
        v-loading="loading"
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/excel/upload'"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">{{ $t('table.clickUp') }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('table.onlyUpload') }}<b> {{ $t('table.xls') }}</b>{{ $t('table.or') }}<b> {{ $t('table.xlsx') }}</b>{{ $t('table.fileSize') }}
        </div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeOk">{{ $t('table.closeOk') }}</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
// import { analysis } from '@/api/tenGrid'
import ResizeMixin from './mixin/ResizeHandler'
import i18n from '@/lang'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  // data() {
  //   return {
  //     dialogVisible: false,
  //     loading: false,
  //     newTitle: this.$t('table.upData')
  //   }
  // },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.newTitle = this.$t('table.upData')
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // // 解析文件
    // closeOk() {
    //   this.loading = true
    //   analysis().then(res => {
    //     if (res.code === 200) {
    //       this.$message.success('恭喜你，解析成功！')
    //       this.loading = false
    //       this.dialogVisible = false
    //     } else {
    //       this.$message.error('抱歉，解析失败！')
    //     }
    //   })
    // },
    // // 成功
    // handleAvatarSuccess(res, file) {
    //   if (res.code === 200) {
    //     this.$message.success(this.$t('table.upSuccess'))
    //   }
    // },
    // // 失败
    // handleAvatarError(res, file) {
    //   if (res.code === 500 && res.type === 'error') {
    //     this.$message.error(this.$t('table.upError'))
    //   }
    // },
    // beforeAvatarUpload(file) {
    //   const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isXLS) {
    //     this.$message.error(this.$t('table.errorOne'))
    //   }
    //   if (!isLt2M) {
    //     this.$message.error(this.$t('table.errorTwo'))
    //   }
    //   return isXLS && isLt2M
    // },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    }

  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 100ms;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
