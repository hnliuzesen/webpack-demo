const path = require('path')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  entry: {
    index: { import: './src/index.js' }
  },
  plugins: [new HtmlWebpackPlugin({ title: 'Webpack App' })],
  output: {
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
    filename: '[name].[contenthash].js',
    library: { name: 'webpackNumbers', type: 'umd' },
    clean: true
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
      { test: /\.(csv|tsv)$/i, use: ['csv-loader'] },
      { test: /\.xml$/i, use: ['xml-loader'] },
      { test: /\.toml$/i, type: 'json', parser: { parse: toml.parse } },
      { test: /\.(yaml|yml)$/i, type: 'json', parser: { parse: yaml.parse } },
      { test: /\.json5$/i, type: 'json', parser: { parse: json5.parse } }
    ]
  }
})