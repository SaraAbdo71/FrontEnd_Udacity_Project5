const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  verbose: true,
  
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
          
        ],
        
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new WorkboxPlugin.GenerateSW()

  ],
  

};
