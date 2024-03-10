<template>
  <wrap-page>
    <router-page @getCurrentPage="getCurrentPage">
      <el-form :model="form" class="form" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="回访时间" prop="time">
              <el-input v-model="form.time" clearable />
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
          <el-button type="danger" @click="onReomve" :disabled="!selectTable.length">删除</el-button>
          <el-button type="primary" @click="onAddUser">新建</el-button>
        </template>
      </row-page>     
      
      <com-table
        :tableHeaders="tableHeaders"
        @onChangeRoute="onChangeRoute"
        @load="getPage"
        ref="tableRef"
        :selectTable="selectTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
      </com-table>
    </router-page>
  </wrap-page>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import apis from '@/apis'
import type {
  CustomertRespone,
} from '../type'
import type { FormInstance } from 'element-plus'
import message, { confirm } from '@/utils/message';
console.log('create')
const props = defineProps(['customerId'])
const router = useRouter()
const form = reactive({
  time: '',
})
const tableHeaders = reactive([
  {
    required: true,
    prop: 'time',
    label: '回访时间',
  },
  {
    prop: 'content',
    label: '回访内容',
  },
])

const getPage = async (pagination = {}, callback?: (val: unknown) => void) => {
  try {
    const res: CustomertRespone = await apis.followUp.list({
      ...pagination,
      ...form,
      customer_id: props.customerId
    }) as CustomertRespone
    callback?.(res)
  } catch {
    //
  }
}

const onAddUser = () => {
  console.log(4324)
  router.push({
    name: 'customerEditDetail',
    params: {
      customerId: props.customerId
    }
  })
}

type rowType = {
  id: string | number,
  [propName: string]: unknown
}

const onChangeRoute = (row: rowType) => {
  router.push({
    name: 'customerEditDetail',
    params: {
      followId: row.id,
      customerId: props.customerId
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

defineExpose({
  getCurrentPage
})

interface TableItem {
  id: number
}

const selectTable = ref([])


const handleSelectionChange = (val: unknown[]) => {
  selectTable.value.length = 0
  Object.assign(selectTable.value, val)
}
const onReomve = async () => {
  const ids = selectTable.value.map((item: TableItem) => item.id).join(',')
  try {
    if (await confirm()) {
      await apis.followUp.delete({
        ids,
        customer_id: props.customerId
      });
      message('删除成功')
      onSerach()
    }
  } catch {
    //
  }
}

</script>

<style lang="less" scoped>
.form {
  margin-bottom: 50px;
}
  
</style>