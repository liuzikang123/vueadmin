<template>
  <div class="header-box">
    <layout-breadcrumb></layout-breadcrumb>

    <div class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="username">{{userInfo.getUserName}}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="menuType.outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutBreadcrumb from './layout-breadcrumb.vue';
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useUserInfo } from '@/store/useUserInfo'

enum menuType {
  'userInfo' = 1,
  'outLogin' = 2,
}

const userInfo = useUserInfo()

const router = useRouter()

const handleCommand = (command: string | number) => {
  if (command === menuType.outLogin) {
    router.push({
      name: 'login'
    })
  }
}

</script>
<style lang="less" scoped>
.header-box {
  background-color: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px 0 20px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.username {
  font-weight: bold;

}
</style>