// const { defineConfig } = require('@vue/cli-service')
// const { defineConfig } = 
import { defineConfig } from '@vue/cli-service'

module.exports = defineConfig({
  // 选项
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      }
    }
  }

})