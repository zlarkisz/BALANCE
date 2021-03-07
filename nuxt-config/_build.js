const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      gsap: ['gsap', 'gsap']
    })
  ],

  extend (config, { isDev, isClient }) {
    // eslint
    if (isDev && isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }

    // stylelint
    const StyleLintPlugin = require('stylelint-webpack-plugin')
      config.plugins.push(new StyleLintPlugin({
        files: '**/*.{scss,vue}',
        configFile: 'stylelint.config.js'
      }))
  }
}
