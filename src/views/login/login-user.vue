<template>
  <div class="login-box">
    <div class="login-suspension">
      <div class="title">欢迎登录</div>
      <el-form
        label-position="top"
        :model="form"
        :rules="rules"
        class="login-form"
        ref="formRef"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="primary" class="login-btn" @click="onLogin">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { requiredRule, maxStr6 } from '@/utils/index'
import apis from '@/apis'
import message from '@/utils/message'

interface RuleForm {
  username: string,
  password: string,
}
const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  username: 'admin',
  password: 'admin123sss',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [requiredRule('用户名'), maxStr6('用户名')],
  password: [requiredRule('密码'), maxStr6('密码')],
})
interface LoginRespon {
  token: string
}
const onLogin = async () => {
  try { await formRef.value?.validate() } catch { return }
  try {
    const { token } = await apis.login.login(form) as LoginRespon
    window.localStorage.setItem('token', token)
    message('登录成功')
    router.push({
      name: 'index'
    })
  } catch (err) {
    //
  }
};
</script>

<style lang="less" scoped>
  .login-box {
    width: 100%;
    height: 100%;
    background-color: #3c3c43;
    position: relative;
    .login-suspension {
      width: 460px;
      height: 400px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      border-radius: 20px;
      padding: 15px 20px;

      .title {
        font-size: 32px;
        font-weight: bold;
      }
      .login-form {
        margin: 40px 0 20px 0;
      }
      .login-btn {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #fff;
      }
    }
  }
</style>