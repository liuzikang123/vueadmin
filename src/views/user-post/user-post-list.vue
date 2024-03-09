<template>
  <wrap-page>
    <router-page @getCurrentPage="getCurrentPage">
      <el-form :model="form" class="form" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="岗位编号" prop="code">
              <el-input v-model="form.code" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="岗位名称" prop="post_name">
              <el-input v-model="form.post_name" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <div class="search">
              <el-button @click="onReset">重置</el-button>
              <el-button type="primary" @click="onSerach">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <row-page>
        <template #right>
          <el-button type="primary" @click="onAddUser">新建</el-button>
        </template>
      </row-page>     
      
      <com-table
        :tableHeaders="tableHeaders"
        @onChangeRoute="onChangeRoute"
        @load="getPage"
        ref="tableRef"
      >
      </com-table>
    </router-page>
  </wrap-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import apis from '@/apis'
import type {
  UserPostRespone,
} from './type'
import type { FormInstance } from 'element-plus'

const router = useRouter()
const form = reactive({
  post_name: '',
  code: '',
})
// const tableData: Array<UserListItem> = reactive([])
const tableHeaders = reactive([
  {
    required: true,
    prop: 'code',
    label: '岗位编号',
  },
  {
    prop: 'post_name',
    label: '岗位名称',
  },
])

const getPage = async (pagination = {}, callback?: (val: unknown) => void) => {
  try {
    const res: UserPostRespone = await apis.userPost.list({
      ...pagination,
      ...form
    }) as UserPostRespone
    callback?.(res)
  } catch {
    //
  }
}

const onAddUser = () => {
  router.push({
    name: 'userPostEdit'
  })
}

type rowType = {
  code: string | number,
  [propName: string]: unknown
}

const onChangeRoute = (row: rowType) => {
  router.push({
    name: 'userPostEdit',
    params: {
      code: row.code
    }
  })
}
const formRef = ref<FormInstance>()
const tableRef = ref()
const onReset = () => {
  formRef?.value?.resetFields()
  tableRef.value.reset()
}
const onSerach = () => {
  tableRef.value.reset()
}
const getCurrentPage = () => {
  tableRef.value.search()
}

</script>

<style lang="less" scoped>
.form {
  margin-bottom: 50px;
}
  
</style>