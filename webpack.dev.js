const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  output: {
    // filename: "my-first-webpack.bundle.js",
    //path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "localhost", // Defaults to `localhost`
    port: 8089, // Defaults to 8080
    proxy: {
      "^/api/*": {
        target: "http://localhost:8080/api/",
        secure: false,
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    // new WorkboxPlugin.GenerateSW(),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
