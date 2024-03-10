<template>
  <router-page @getCurrentPage="getCurrentPage">
    <wrap-page>
      <com-form
        label-position="top"
        :model="form"
        :rules="rules"
        @save="onSave"
        ref="formRef"
      >
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="客户姓名" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户手机号" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客户地址" prop="address">
              <el-input v-model="form.address" />
            </el-form-item>
          </el-col>

        </el-row>
      </com-form>
    </wrap-page>

    <wrap-page v-if="id">
      <div class="table-title">回访记录</div>
      <customer-table ref="tableRef" :customerId="id"></customer-table>
    </wrap-page>
  </router-page>
</template>

<script lang="ts" setup>
import { 
  reactive, withDefaults, defineProps, onMounted, ref 
} from 'vue'
import type { FormRules } from 'element-plus'
import { 
  requiredRule,
} from '@/utils/index'
import apis from '@/apis'
import message from '@/utils/message'
import { useRouter } from 'vue-router'
import CustomerTable from './components/customer-table.vue'

interface PropsType {
  id?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
  id: ''
})

const formRef = ref()

const router = useRouter()
interface FormType {
  phone: string,
  name: string,
  [propName: string]: unknown
}
const form = reactive<FormType>({
  phone: '',
  name: '',
})

const rules = reactive<FormRules>({
  name: [requiredRule('客户姓名')],
  phone: [requiredRule('客户手机号')],
})

interface CustomertRespone {
  data: FormType,
  code: number | null,
  [propName: string]: unknown
}

const getDetail = async () => {
  const res: CustomertRespone = await apis.customer.detail({
    id: props.id
  }) as CustomertRespone
  Object.assign(form, res.data)
}

type CallBackFn = (val: boolean) => void
const onSave = async (callback: CallBackFn) => {
  try {
    if (!props.id) {
      await apis.customer.add(form)
      router.push({
        name: 'customer'
      })
    } else {
      await apis.customer.edit(form)
      await getDetail()
    }
    message('操作成功')
    callback(true)
  } catch {
    //
    callback(false)
  }
}

onMounted(async () => {
  if (props.id) {
    await getDetail()
  } else {
    formRef.value.onUpdateLock()
  }
})

const tableRef = ref()
const getCurrentPage = () => {
  // tableRef.value.getCurrentPage()
}
</script>

<style lang="less" scoped>
.table-title {
  font-size: 18px;
  font-weight: bold;
}
</style>