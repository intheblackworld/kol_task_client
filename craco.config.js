const antdCustomStyle = require('./src/theme/antd')
const CracoLessPlugin = require('craco-less')
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')


module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss')("./tailwind.config.js"),
        require('autoprefixer'),
      ]
    }
  },
  plugins: [
    {
      plugin: reactHotReloadPlugin
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