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
          <el-form-item label="账号名" prop="username">
            <el-input v-model="form.username" :disabled="!!form.id"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="账号别名" prop="nick_name">
            <el-input v-model="form.nick_name" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <com-select v-model="form.status" :options="dict.status"></com-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
      </el-row>
    </com-form>
  </wrap-page>
</template>

<script lang="ts" setup>
import { 
  reactive, withDefaults, defineProps, onMounted, watchEffect, ref 
} from 'vue'
import type { FormRules } from 'element-plus'
import { 
  requiredRule, maxStr6, requiredPhone, requiredStr,
} from '@/utils/index'
import apis from '@/apis'
import message from '@/utils/message'
import { useRouter } from 'vue-router'
import type {
  ConfigType, DictType,
} from './type'

const dict = reactive<DictType>({
  status: []
})
const config = async () => {
  try {
    const res: ConfigType = await apis.user.config() as ConfigType
    if (res.data) {
      dict.status = res.data.find(item => item.name === 'status')?.options || []
    } 
  } catch {
    //
  }
}
interface PropsType {
  id?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
  id: ''
})

const formRef = ref()

const router = useRouter()
interface FormType {
  username: string,
  password: string,
  status: string,
  [propName: string]: unknown
}
const form = reactive<FormType>({
  username: '',
  password: '',
  status: 'Y',
})

const rules = reactive<FormRules>({
  username: [requiredRule('账号名'), requiredStr('账号名')],
  password: [requiredRule('密码'), maxStr6('密码')],
  status: [requiredRule('状态')],
  phone: []
})

watchEffect(() => {
  rules.phone = form.phone ? [requiredRule('手机号'), requiredPhone()] : [];
})

interface UserDetailRespone {
  data: FormType,
  code: number | null,
  [propName: string]: unknown
}

const getDetail = async () => {
  const res: UserDetailRespone = await apis.user.detail({
    id: props.id
  }) as UserDetailRespone
  Object.assign(form, res.data)
}

type CallBackFn = (val: boolean) => void
const onSave = async (callback: CallBackFn) => {
  try {
    if (!props.id) {
      await apis.user.add(form)
      router.push({
        name: 'user'
      })
    } else {
      await apis.user.edit(form)
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
  await config()
  if (props.id) {
    await getDetail()
  } else {
    formRef.value.onUpdateLock()
  }
})
</script>

<style lang="less">
</style>