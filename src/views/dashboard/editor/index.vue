<template>
  <div class="dashboard-editor-container">
    <div class="display_name">
      欢迎
      <span>{{ realname }}</span>
      登陆上海灵娃MES系统
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardEditor',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name', 'realname', 'avatar', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  display: flex;
  width: 100%;
  height: 90vh;
  .display_name {
    margin: 20% auto;
    font-size: 50px;
    font-weight: bold;
    background: linear-gradient(to right, green, #007a59, #006569);
    -webkit-background-clip: text;
    color: transparent;
   letter-spacing: 3px;
    span {
      margin: 0 10px;
      color: orange;
    }
  }
}
</style>
