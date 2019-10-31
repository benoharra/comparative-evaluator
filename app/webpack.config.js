const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = () => ({
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[id].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    overlay: true,
    historyApiFallback: true
  },
  optimization: {
    minimizer: [ new TerserPlugin() ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [ 'ts-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new WebpackBar()
  ],
  externals: {
    'Config': JSON.stringify(process.env.NODE_ENV === 'prod' ? {
      serverUrl: "http://localhost:8080/comp-eval/" 
    } : {
      serverUrl: "http://localhost:8080/comp-eval/"
    })
  }
});
