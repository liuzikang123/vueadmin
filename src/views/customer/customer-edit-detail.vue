<template>
  <router-page>
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
            <el-form-item label="回访时间" prop="time">
              <!-- <el-input v-model="form.time"/> -->
              <el-date-picker
                v-model="form.time"
                type="datetime"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD hh:mm:ss"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="回访内容" prop="content">
              <el-input v-model="form.content" />
            </el-form-item>
          </el-col>

        </el-row>
      </com-form>
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

interface PropsType {
  followId?: string,
  customerId: string,
}
const props = withDefaults(defineProps<PropsType>(), {
  followId: '',
  customerId: ''
})

console.log(props)

const formRef = ref()

const router = useRouter()
interface FormType {
  content: string,
  time: string,
  [propName: string]: unknown
}
const form = reactive<FormType>({
  content: '',
  time: '',
})

const rules = reactive<FormRules>({
  time: [requiredRule('回访时间')],
  content: [requiredRule('回访内容')],
})

interface CustomertRespone {
  data: FormType,
  code: number | null,
  [propName: string]: unknown
}

const getDetail = async () => {
  const res: CustomertRespone = await apis.followUp.detail({
    customer_id: props.customerId,
    id: props.followId,
  }) as CustomertRespone
  Object.assign(form, res.data)
}

type CallBackFn = (val: boolean) => void
const onSave = async (callback: CallBackFn) => {
  try {
    if (!props.followId) {
      await apis.followUp.add({
        ...form,
        customer_id: props.customerId,
      })
      router.push({
        name: 'customerEdit',
        params: {
          id: props.customerId
        }
      })
    } else {
      await apis.followUp.edit({
        ...form,
        customer_id: props.customerId
      })
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
  if (props.followId) {
    await getDetail()
  } else {
    formRef.value.onUpdateLock()
  }
})


</script>

<style lang="less" scoped>
.table-title {
  font-size: 18px;
  font-weight: bold;
}
</style>