<template>
  <!-- 上传文件弹窗 -->
  <el-dialog
    style="margin-top: 35vh;"
    title="导入文件"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :before-close="fileClose"
    width="30%"
  >
    <!-- :action="this.GLOBAL.BASE_URL + '/api/eip/mi/import/file'" -->
    <el-upload
      ref="upload"
      v-loading="improtLoading"
      element-loading-text="请稍等,文件上传并解析中...."
      element-loading-spinner="el-icon-loading"
      class="upload-demo"
      :action="productionUrl"
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
</template>

<script>
import { getToken } from '@/utils/auth' // get token from cookie
const hasToken = getToken()
export default {
  name: 'ImprotFlie',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    improtLoading: {
      type: Boolean,
      default: false
    },
    productionUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myHeaders: { Authorization: hasToken } // 获取token // 获取token
    }
  },
  methods: {
    fileClose() {
      this.$emit('fileClose')
    },
    // 成功
    handleAvatarSuccess(res, file) {
      this.$emit('handleavatarsuccess', res)
      this.$refs.upload.clearFiles()
    },
    // 失败
    handleAvatarError(res, file) {
      if (res.code === 500 && res.type === 'error') {
        this.$message.error(this.$t('table.upError'))
      }
    },
    // 上传前文件校验
    beforeAvatarUpload(file) {
      this.$emit('beforeavatarupload', file)
    }
  }
}
</script>

<style></style>
