<template>
  <wrap-page>
    <lay-json-schema-form
      label-position="top"
      :model="form"
      :schema="schema"
    >

    </lay-json-schema-form>
  </wrap-page>
</template>

<script lang="ts" setup>
import { reactive, withDefaults, defineProps, onMounted, watchEffect  } from 'vue'
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
  const res: ConfigType = await apis.user.config() as ConfigType
  if (res.data) {
    dict.status = res.data.find(item => item.name === 'status')?.options || []
  }
}
interface PropsType {
  id?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
  id: ''
})

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

const schema = reactive({
  username: {
    label: '账号名',
    type: 'input',
    props: {
      type: 'text',
      disabled: !!form.id,
      rules: [requiredRule('账号名'), requiredStr('账号名')]
    },
    colProps: {
      md: 12
    }
  },
  nick_name: {
    label: '账号别名',
    type: 'input',
    props: {
      type: 'text',
    },
    colProps: {
      md: 12
    }
  },
  password: {
    label: '密码',
    type: 'input',
    props: {
      type: 'password',
      rules: [requiredRule('密码'), maxStr6('密码')],
    }
  },
  status: {
    label: '状态',
    type: 'select',
    props: {
      options: dict.status,
      rules: [requiredRule('状态')],
    }
  },
  phone: {
    label: '手机号码',
    type: 'input',
    props: {
      type: 'text',
    }
  },
  email: {
    label: '邮箱',
    type: 'input',
    props: {
      type: 'text',
    }
  }
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
  }
})
</script>

<style lang="less">
</style>