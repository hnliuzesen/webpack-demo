const path = require('path')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ title: 'Webpack App' })],
  entry: {
    index: { import: './src/index.js' }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
    // filename: '[name].[contenthash].js',
    filename: '[name].js',
    library: { name: 'webpack-demo', type: 'umd' },
    clean: true
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
  },
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
})