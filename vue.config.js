const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Whatup',
    themeColor: 'tomato',
    msTileColor: '#38c1ff',
    manifestOptions: {
      background_color: '#38c1ff'
    }
  },

  outputDir: 'docs'
})
