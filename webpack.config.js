const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const extractJson = new ExtractTextPlugin('json/[name].json');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  entry: [
    "./src/index.tsx",
    "webpack-dev-server/client?http://127.0.0.1:8080",
    "webpack/hot/only-dev-server",
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "antd": "antd",
    "d3": "d3",
    "lodash": "_",
    "moment": "moment",
    "react": "React",
    "react-dom": "ReactDOM",
    "react-redux": "ReactRedux",
    "react-router": "ReactRouter",
    "react-router-redux": "ReactRouterRedux",
    "redux": "Redux",
    "redux-saga": "ReduxSaga",
    "vega": "vg",
    "vega-embed": "vg.embed",
    "vega-lite": "vl",
  },

  module: {
      loaders: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "ts-loader"] },
        { test: /\.scss$/, loader: extractCSS.extract([ "css", "sass"]) },
        { test: /\.css$/, loader: extractCSS.extract(["css"]) },
        { test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf)/, loader: "file" },
        { test: /\.json$/, loader: "json-loader" },
      ],
  },

  output: {
    filename: "bundle.js",
    publicPath: "http://127.0.0.1:8080/",
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    extractCSS,
  ],

  resolve: {
      alias: {
        src: path.join(__dirname, "/src"),
      },
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};
