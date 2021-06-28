const antdCustomStyle = require('./src/theme/antd')
const CracoLessPlugin = require('craco-less')
const FastRefreshCracoPlugin = require('craco-fast-refresh')


module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss')("./tailwind.config.js"),
        require('autoprefixer'),
      ]
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    {
      plugin: FastRefreshCracoPlugin
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdCustomStyle,
            javascriptEnabled: true,
          },
        },
      }
    },
  ],
}