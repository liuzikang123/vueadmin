<template>
  <div class="row-page">
    <div class="left">
      <slot name="left"/>
    </div>
    <div class="right">
      <slot name="right"/>
    </div>
  </div>
</template>


<style lang="less" scoped>
.row-page {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    align-items: center;
  }
}
</style>