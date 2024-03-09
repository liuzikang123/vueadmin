<template>
  <router-page>
    <div>list</div>
    <el-button @click="onEdit">编辑</el-button>
  </router-page>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onEdit = () => {
  router.push({
    name: 'indexEdit',
    params: {
      id: '3'
    }
  })
}
</script>