<template>
  <el-table ref="multipleTable" :data="tableData" size="medium" border fit @sort-change="handleSort" @filter-change="filterHandler" @selection-change="handleSelectionChange">
    <!-- 多选框 -->
    <el-table-column type="selection" width="55" />
    <el-table-column
      v-for="(th, key) in tableHeader"
      :key="key"
      min-height="46"
      :prop="th.prop"
      :label="th.label"
      :fixed="th.fixed"
      :sortable="th.custom ? 'custom' : false"
      :filters="th.filter"
      :column-key="th.columnKey"
      :filtered-value="th.filteredValue"
      :filter-multiple="th.filterMultiple"
      :min-width="th.minWidth"
      align="center"
    >
      <template slot-scope="scope">
        <!-- 操作按钮 -->
        <div v-if="th.operation">
          <el-button v-for="(o, key) in th.operation" :key="key" style="width:100%" type="text" size="mini" @click="o.clickFun(scope.row)">{{ o.name }}</el-button>
        </div>
        <!-- 点击跳转页面 -->
        <div v-else-if="th.router">
          <router-link :to="{ path: th.router.path, query: { expertFields: scope.row['fieldName'] } }">{{ scope.row[th.prop] }}</router-link>
        </div>
        <div v-else>
          <!-- 鼠标滑过显示气泡框 -->
          <el-popover v-if="th.describe" popper-class="popover-el-class" placement="bottom" width="200" trigger="hover" :content="scope.row[th.prop]">
            <span slot="reference" class="describe-wrap" style="-webkit-box-orient:vertical">{{ scope.row[th.prop] }}</span>
          </el-popover>
          <!-- 下拉选择框 -->
          <el-select v-else-if="th.selected" v-model="scope.row[th.prop]" :disabled="!th.disabled" clearable @change="th.changeFunc">
            <el-option v-for="(item, index) in th.selected" :key="index" :value="item.value" :label="item.text" />
          </el-select>
          <!-- 纯展示数据 -->
          <span v-else-if="!th.formatData">{{ scope.row[th.prop] }}</span>
          <!-- 需要格式化的数据结构 -->
          <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CompTable',
  filters: {
    formatters(val, format) {
      if (typeof format === 'function') {
        return format(val)
      } else return val
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    tableHeader: {
      type: Array,
      default: function() {
        return []
      }
    },
    multipleSelection: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },
    handleSort(sort) {
      this.$emit('sort-events', sort)
    },
    filterHandler(filters) {
      this.$emit('filter-events', filters)
    }
  }
}
</script>
