const nodeExternals = require('webpack-node-externals');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: _.keyBy(glob.sync("./test/**/*.ts*"), (key) => key),
  output: {
    path: __dirname + "/.build",
    filename: "[name].js",
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      src: path.join(__dirname, '/src')
    }
  },
  module: {
    devtool: 'cheap-module-source-map',
    loaders: [
      { test: /\.tsx?$/, loaders: ['ts-loader'] },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf)/, loader: 'file' },
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
};