const postcssNesting = require('postcss-nesting');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    app: './src/index.js',
  },
  devtool: 'nosources-source-map',
  devServer: {
    historyApiFallback: true
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[folder]__[local]--[hash:base64:5]' } },
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssNesting(/* pluginOptions */)
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}