<template>
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
          <el-form-item label="部门编码" prop="code">
            <el-input v-model="form.code" :disabled="!!code"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="部门名称" prop="department_name">
            <el-input v-model="form.department_name" />
          </el-form-item>
        </el-col>

      </el-row>
    </com-form>
  </wrap-page>
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
interface PropsType {
  code?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
  code: ''
})

const formRef = ref()

const router = useRouter()
interface FormType {
  code: string,
  department_name: string,
  [propName: string]: unknown
}
const form = reactive<FormType>({
  department_name: '',
  code: '',
})

const rules = reactive<FormRules>({
  code: [requiredRule('部门编码')],
  department_name: [requiredRule('部门名称')],
})

interface DepartmentRespone {
  data: FormType,
  code: number | null,
  [propName: string]: unknown
}

const getDetail = async () => {
  const res: DepartmentRespone = await apis.department.detail({
    code: props.code
  }) as DepartmentRespone
  Object.assign(form, res.data)
}

type CallBackFn = (val: boolean) => void
const onSave = async (callback: CallBackFn) => {
  try {
    if (!props.code) {
      await apis.department.add(form)
      router.push({
        name: 'department'
      })
    } else {
      await apis.department.edit(form)
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
  if (props.code) {
    await getDetail()
  } else {
    formRef.value.onUpdateLock()
  }
})
</script>

<style lang="less">
</style>