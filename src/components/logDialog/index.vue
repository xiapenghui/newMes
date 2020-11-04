<template>
  <el-dialog title="日志信息" :visible.sync="isShow" :before-close="onClose">
    <el-table border style="width: 100%" height="50vh" :data="data">
      <el-table-column property="username" label="操作人" width="100px" align="center" />
      <el-table-column property="createTime" label="操作时间" width="150px" align="center" />
      <el-table-column property="createTime" label="状态" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.levelString" :class="[scope.row.levelString === 'ERROR' ? 'classRed' : 'classGreen']">
            {{ scope.row.levelString === 'ERROR' ? '错误' : '成功' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="modelName" label="模块名称" align="center" width="150px" />
      <el-table-column property="message" label="日志消息" align="center" />
    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationLog.current" :size.sync="paginationLog.size" @pagination="getLogList" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    logTotal: {
      type: Number,
      default: 0
    },
    paginationLog: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    getLogList(val) {
      this.$emit('pageChange', val)
    },
    onClose() {
      console.log('关闭')
      this.$emit('closeLog')
    }
  }
}
</script>

<style></style>
