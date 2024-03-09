<template>
  <wrap-page>
    <router-page @getCurrentPage="getCurrentPage">
      <el-form :model="form" class="form" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <com-select v-model="form.status" :options="dict.status"></com-select>
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
        <template #status="{row = {}}">
          <el-switch 
            v-model="row.status"
            active-value="Y"
            inactive-value="N"
            active-text="有效"
            inactive-text="禁用"
            @click="onChangeStatus(row)"
          />
        </template>
      </com-table>
    </router-page>
  </wrap-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import apis from '@/apis'
import type {
  ConfigType, DictType, UserListItem, UserListRespone,
} from './type'
import message from '@/utils/message';
import type { FormInstance } from 'element-plus'

const router = useRouter()
const form = reactive({
  username: '',
  status: '',
})
// const tableData: Array<UserListItem> = reactive([])
const tableHeaders = reactive([
  {
    required: true,
    prop: 'username',
    label: '账号',
  },
  {
    prop: 'nick_name',
    label: '账号别名',
  },
  {
    prop: 'status',
    label: '状态',
    isSlot: true
  },
  {
    prop: 'phone',
    label: '手机号',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
])

const getPage = async (pagination = {}, callback?: (val: unknown) => void) => {
  try {
    const res: UserListRespone = await apis.user.list({
      ...pagination,
      ...form
    }) as UserListRespone
    callback?.(res)
  } catch {
    //
  }
}

const dict = reactive<DictType>({
  status: []
})
const config = async () => {
  try {
    const res: ConfigType = await apis.user.config() as ConfigType
    if (res.data) {
      dict.status = res.data.find(item => item.name === 'status')?.options || []
    }
  } catch (err) {
    //
  }
}

onMounted(async () => {
  await config()
  // await getPage()
})

const onAddUser = () => {
  router.push({
    name: 'userEdit'
  })
}

type rowType = {
  id: string | number,
  [propName: string]: unknown
}

const onChangeRoute = (row: rowType) => {
  router.push({
    name: 'userEdit',
    params: {
      id: row.id
    }
  })
}

const onChangeStatus = async (row: UserListItem) => {
  try {
    await apis.user.edit(row)
    message('修改成功')
    await getPage()
  } catch {
    row.status = row.status === 'N' ? 'Y' : 'N'
  }
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