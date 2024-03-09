<template>
  <wrap-page>
    <div class="edit-form">
      <div class="edit curr" v-if="lock" @click="onUpdateLock(false)">编辑</div>
      <div class="save-box" v-else>
        <div class="save curr" @click="onSave">保存</div>
        <div class="cancel curr" @click="onUpdateLock(true)">取消</div>
      </div>
    </div>
    <el-form
      ref="ruleFormRef"
      v-bind="$attrs"
      :disabled="lock"
    >
      <slot></slot>
    </el-form>
  </wrap-page>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineExpose } from 'vue'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['save'])
const ruleFormRef = ref<FormInstance>()
const lock = ref(true);
const onUpdateLock = (val: boolean) => {
  lock.value = val
}

const onSave = async () => {
  try { await ruleFormRef?.value?.validate() } catch (err){ return }
  emit('save', (val: boolean) => {
    onUpdateLock(val)
  })
}

defineExpose({
  onUpdateLock
})
</script>

<style lang="less">
.edit-form {
  display: flex;
  overflow: hidden;
  justify-content: flex-end;
  .save-box {
    display: flex;
    .cancel {
      margin-left: 20px;
    }
  }
  .edit,
  .save {
    color: var(--baseColor);
  }
}
  
</style>