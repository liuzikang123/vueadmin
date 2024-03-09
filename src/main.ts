import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { componentList } from '@/utils/component-page'
import LayJsonSchemaForm from "@layui/json-schema-form";
import "@layui/json-schema-form/lib/index.css";

const app = createApp(App)

// element-plus的全局icon注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册全局组件
componentList.forEach(({ key, value }) => {
  app.component(key, value)
})

app.use(router)
app.use(LayJsonSchemaForm)
app.use(ElementPlus)

app.mount('#app')
