<template>
  <div>edit</div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  withDefaults
} from 'vue'
interface PropsRules {
  id: string,
}
withDefaults(defineProps<PropsRules>(), {
  id: ''
})

</script>