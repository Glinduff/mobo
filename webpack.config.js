var HtmlWebPackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");

const devMode = process.env.NODE_ENV === 'production'
var cssDev = ['style-loader', 'css-loader', 'less-loader'];
var cssProd =  ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }],
        publicPath: '/'
    });

var cssConfig = devMode ? cssProd : cssDev;

module.exports = {
  entry: [
    './src/index.js'
  ]
    ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/, 
        use: cssConfig,
        /* use:  [
          devMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist'
            }
          },
          'css-loader',
          {
            loader: 'less-loader?sourceMap',
            options: {
              javascriptEnabled: true,
            },
          },
        ] */
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          } 
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: false,
    inline: true,
    hot: true,
    port: 8081,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: 'css/app.css',
      disable: !devMode,
      allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
  ],
};