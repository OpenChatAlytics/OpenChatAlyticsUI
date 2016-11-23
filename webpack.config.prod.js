const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/index.tsx",
  ],

  module: {
      loaders: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loaders: ["babel-loader?presets[]=es2015&presets[]=stage-0", "ts-loader"] },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass") },
        { test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf)/, loader: "file" },
      ],

      preLoaders: [
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" },
      ],
  },

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/assets/index.html",
    }),
  ],

  resolve: {
      alias: {
        src: path.join(__dirname, "/src"),
      },
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};
