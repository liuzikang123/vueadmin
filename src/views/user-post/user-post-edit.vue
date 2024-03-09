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
          <el-form-item label="岗位编码" prop="code">
            <el-input v-model="form.code" :disabled="!!code"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="岗位名称" prop="post_name">
            <el-input v-model="form.post_name" />
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
  post_name: string,
  [propName: string]: unknown
}
const form = reactive<FormType>({
  post_name: '',
  code: '',
})

const rules = reactive<FormRules>({
  code: [requiredRule('岗位编码')],
  post_name: [requiredRule('岗位名称')],
})

interface UserPostRespone {
  data: FormType,
  code: number | null,
  [propName: string]: unknown
}

const getDetail = async () => {
  const res: UserPostRespone = await apis.userPost.detail({
    code: props.code
  }) as UserPostRespone
  Object.assign(form, res.data)
}

type CallBackFn = (val: boolean) => void
const onSave = async (callback: CallBackFn) => {
  try {
    if (!props.code) {
      await apis.userPost.add(form)
      router.push({
        name: 'userPost'
      })
    } else {
      await apis.userPost.edit(form)
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