<template>
  <el-config-provider :locale="zhCn">
    <routerView></routerView>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn'
import { ElConfigProvider } from 'element-plus'

</script>

<style lang="less">
@import url('~@/assets/css/base.css');
::v-deep.el-table__header {
    width: 100% !important;
}

::v-deep.el-table__body {
    width: 100% !important;
}
</style>