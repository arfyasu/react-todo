var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  entry:['./javascripts/app.jsx', './stylesheets/app.scss'],

  output: {
    path: __dirname + '/dist/javascripts',
    filename: 'app.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jx|jsx$/,
        exclude: /node_modules/,
        loader: "eslint"
      }
    ],
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css|scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
      },
      //bootstrapのフォントまわりのため
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  node: {
    console: true
  },
  plugins: [
    new ExtractTextPlugin("../stylesheets/app.css")
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  devServer: {
    contentBase: './dist'
  }
};
