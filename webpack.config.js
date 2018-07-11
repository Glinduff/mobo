const HtmlWebPackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
const path = require('path');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd =  ExtractTextPlugin.extract(
  {
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
  }
);


const htmlPlugin = 
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  },
  new ExtractTextPlugin({
    filename: 'app.css',
    disable: !isProd,
    allChunks: false
  }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: cssProd
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: false,
    inline: true,
    port: 8081,
    historyApiFallback: true
  },
  plugins: [htmlPlugin],
};