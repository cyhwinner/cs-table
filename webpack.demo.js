const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    path: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl'],
    alias: {
      'components': path.resolve(__dirname, './src/components')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }, 
      {
        test: /\.scss/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'production' ? '"production"' : '"development"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
			filename: './index.html',
			template: './index.html',
			inject: true
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    host: 'localhost',
    port: 9099,
    inline: true,
    hot: true
  }
}