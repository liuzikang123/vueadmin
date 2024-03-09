import { Component } from 'vue';
import RouterPage from '@/components/router-page'
import WrapPage from '@/components/wrap-page'
import RowPage from '@/components/row-page'
import ComForm from '@/components/com-form'
import ComSelect from '@/components/com-select'
import ComTable from '@/components/com-table'

interface ComponentType {
  key: string
  value: Component
}

export const componentList: Array<ComponentType> = [
  { key: 'router-page', value: RouterPage },
  { key: 'wrap-page', value: WrapPage },
  { key: 'row-page', value: RowPage },
  { key: 'com-form', value: ComForm },
  { key: 'com-select', value: ComSelect },
  { key: 'com-table', value: ComTable },
]