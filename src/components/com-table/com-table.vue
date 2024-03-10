<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    class="table"
    max-height="550"
  >
    <slot></slot>
    <template v-for="(item) in tableHeaders" :key="item.prop">
      <el-table-column :property="item.prop" :label="item.label" v-if="item.required">
        <template #default="{row}">
          <el-link @click="onChangeRoute(row)" type="primary">{{row[item.prop]}}</el-link>
        </template>
      </el-table-column>
      <el-table-column :property="item.prop" :label="item.label" v-else-if="!item.isSlot"></el-table-column>
      <el-table-column :property="item.prop" :label="item.label" v-else>
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <el-pagination
    class="pagination"
    v-model:current-page="pagination.current"
    v-model:page-size="pagination.size"
    :page-sizes="[10, 20, 30, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    prev-text="上一页"
    next-text="下一页"
  />
</template>

<script lang="ts" setup>
import {
  withDefaults, defineProps, defineEmits, onMounted, reactive, defineExpose, ref
} from 'vue'

const emit = defineEmits(['onChangeRoute', 'load', 'selection-change'])
interface TableType {
  tableHeaders: unknown[],
  selectTable: unknown[],
}
withDefaults(defineProps<TableType>(), {
  tableHeaders: () => [],
  selectTable: () => [],
})

const pagination = reactive({
  size: 10,
  current: 1,
  total: 0
})

type rowType = {
  [propName: string]: unknown
}
const onChangeRoute = (row: rowType) => {
  emit('onChangeRoute', row)
}

type TableDataType = unknown[]
const tableData: TableDataType = reactive([])

type ResType = {
  data: unknown,
  total: number | undefined,
}
const loadProxy = () => {
  emit('load', pagination, (res: ResType) => {
    const { data, total } = res
    pagination.total = total || 0;
    tableData.length = 0;
    Object.assign(tableData, data)
  });
}
onMounted(() => {
  loadProxy()
})

const handleSizeChange = (val: number) => {
  pagination.size = val;
  pagination.current = 1;
  loadProxy()
}
const handleCurrentChange = (val: number) => {
  pagination.current = val;
  loadProxy()
}

const reset = () => {
  pagination.current = 1
  loadProxy()
}
const search = () => {
  loadProxy()
}

const selectTable = ref([])

const handleSelectionChange = (val: unknown) => {
  emit('selection-change', val)
}

defineExpose({
  reset,
  search,
  selectTable,
})
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 40px;
  margin-bottom: 20px;
}
  
</style>