<template>
  <div class="dashboard-container">
    <el-container>
      <el-main>
        <img src="@/assets/doing/doing.png">
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Guard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-main {
    background-color: #ffff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
