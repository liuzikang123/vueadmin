<template>
  <el-select
    v-model="value"
    placeholder="请选择"
    v-bind="$attrs"
    :clearable="clearable"
  >
    <el-option
      v-for="item in options"
      :key="item.label"
      :label="item.name"
      :value="item.label"
    />
  </el-select>
</template>

<script lang="ts" setup>
import {
  withDefaults, defineProps, computed, defineEmits
} from 'vue'

type PropsTypeItem = {
  name: string,
  label: string | number,
}
interface PropsType {
  options: PropsTypeItem[],
  modelValue: string | number,
  clearable?: boolean,
}

const props = withDefaults(defineProps<PropsType>(), {
  options: () => [],
  modelValue: '',
  clearable: true,
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

</script>