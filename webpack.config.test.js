const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
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