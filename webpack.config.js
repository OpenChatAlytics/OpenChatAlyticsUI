const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
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
    "react": "React",
    "react-bootstrap": "ReactBootstrap",
    "react-dom": "ReactDOM",
    "react-redux": "ReactRedux",
    "react-router": "ReactRouter",
    "redux": "Redux",
    "redux-saga": "ReduxSaga",
  },

  module: {
      loaders: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "ts-loader"] },
        { test: /\.scss$/, loader: "style!css!sass" },
        { test: /\.css$/, loader: "style!css" },
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
  ],

  resolve: {
      alias: {
        src: path.join(__dirname, "/src"),
      },
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};
