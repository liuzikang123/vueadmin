<template>
  <div class="bread-box">
    <el-icon v-if="isShowBack" size="18" class="icon-box curr" @click="onBack"><Back /></el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in routerForm.matched" :key="index">
        <span class="title" :class="{'active': isActive(item?.name)}">{{item?.meta?.title || ''}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Back } from '@element-plus/icons-vue'
import { computed, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
type anyObj = {
  [propName: string]: unknown
}
interface ItemRule {
  name: unknown,
  meta: anyObj,
  path: unknown,
}
interface RouterFormRule {
  matched: ItemRule[]
}
const router = useRouter()
const route = useRoute()
const routerForm = reactive<RouterFormRule>({
  matched: []
})
watchEffect(() => {
  routerForm.matched = route.matched.map(item => {
    return {
      name: item.name,
      meta: item.meta,
      path: item.path,
    }
  }).slice(1)
})

const isActive = (name: string) => {
  const find = routerForm.matched[routerForm.matched.length - 1];
  return find.name === name
};

const onBack = () => {
  const find = routerForm.matched[routerForm.matched.length - 1];
  router.push({
    name: find?.meta?.back as string
  })
};

const isShowBack = computed(() => {
  if (!routerForm.matched.length) return false;
  const [item] = routerForm.matched;
  if (item.meta.isMenu && routerForm.matched.length <= 2) return false;
  if (item.meta.isMenu && routerForm.matched.length > 2) return true;
  if (!item.meta.isMenu && routerForm.matched.length > 1) return true;
  return false;
})
</script>

<style lang="less" scoped>
.bread-box {
  height: 40px;
  display: flex;
  align-items: center;

  .icon-box {
    margin-right: 20px;
    &:hover {
      color: rgb(14, 63, 225);
    }
  }

  .active.title {
    font-weight: bold;
  }
}
</style>