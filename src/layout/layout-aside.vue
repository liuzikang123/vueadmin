<template>
  <el-menu
    active-text-color="#4C7FB0"
    background-color="#2F4056"
    class="menu el-menu-vertical-demo"
    text-color="#fff"
    router
    :defaultActive="defaultActive"
  >
    <template v-for="(item, index) in layoutList" :key="index">
      <el-sub-menu :index="`/${item.path}`" v-if="item.meta.isMenu && item.children && item.children.length">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon || 'House'"></component>
          </el-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item :index="`/${item.path}/${child.path}`"  v-for="(child, childIndex) in item.children" :key="childIndex">
          <el-icon>
            <component :is="child.meta.icon || 'House'"></component>
          </el-icon>
          <span>{{child.meta.title}}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item :index="`/${item.path}`" v-else>
        <el-icon>
          <component :is="item.meta.icon || 'House'"></component>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { layoutList } from '@/router/router';
import { computed } from 'vue';
const route = useRoute()


const defaultActive = computed(() => {
  return route.fullPath
})

</script>

<style lang="less">
.menu {
  height: 100%;
}
</style>