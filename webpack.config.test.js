const nodeExternals = require("webpack-node-externals");
const path = require("path");
const glob = require("glob");
const _ = require("lodash");

module.exports = {
  devtool: "source-map",
  entry: _.keyBy(glob.sync("./test/**/*.ts*"), (key) => key),
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
    devtool: "cheap-module-source-map",
    loaders: [
      { test: /\.tsx?$/, loaders: ["ts-loader"] },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf)/, loader: "file" },
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  output: {
    // sourcemap support for IntelliJ/Webstorm
    devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].js",
    path: __dirname + "/.build",
  },
  resolve: {
    alias: {
      src: path.join(__dirname, "/src")
    },
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  target: "node", // in order to ignore built-in modules like path, fs, etc.
};
