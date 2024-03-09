<template>
  <div class="common-layout">
    <el-container class="container-box">
      <el-aside width="200px" class="aside">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container class="container">
        <el-header class="header">
          <layout-header></layout-header>
        </el-header>
        <!-- <layout-breadcrumb></layout-breadcrumb> -->
        <el-main class="main">
          <routerView></routerView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LayoutAside from './layout-aside.vue';
// import LayoutBreadcrumb from './layout-breadcrumb.vue';
import LayoutHeader from './layout-header.vue';

</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.common-layout,
.container-box {
  height: 100%;
  background-color: rgb(235, 235, 235);
  .aside {
    height: 100%;
    background-color: red;
  }

  .header {
    margin-bottom: 4px;
  }

}
</style>