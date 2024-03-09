<template>
  <div>
    <div class="child-router" ref="childRouterRef">
      <router-view></router-view>
    </div>
    <div class="parent-router">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { 
  onBeforeUnmount, onMounted, ref, defineEmits,
} from 'vue'

const emit = defineEmits(['getCurrentPage'])
const childRouterRef = ref<HTMLDivElement>()

const isShow = ref(true)
const observerFn = (flag: boolean | undefined = false) => {
  const count = childRouterRef.value?.childElementCount;
  isShow.value = count === 0
  if (count === 0 && flag) {
    emit('getCurrentPage')
  }
}
let timerId: number | undefined
const init = () => {
  if (!childRouterRef.value) {
    timerId = setTimeout(() => {
      init()
    }, 1000);
  } else {
    const observer= new MutationObserver(() => observerFn(true))
    observer.observe(childRouterRef.value as Node, {
      childList: true,
    })
  }
}
onMounted(() => {
  init()
  observerFn(false)
})
onBeforeUnmount(() => {
  clearTimeout(timerId)
})
</script>

<style lang="less" scoped>
.child-router:empty {
  display: none;
  & + .parent-router {
    display: block;
  }
}

.child-router:not(:empty) {
  display: block;
  & + .parent-router {
    // display: none;
    height: 0;
    opacity: 0;
  }
}
</style>