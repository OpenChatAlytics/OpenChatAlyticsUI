const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
      './src/index.tsx',
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/only-dev-server'
    ],
    output: {
      publicPath: 'http://127.0.0.1:8080/',
      filename: 'dist/bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loaders: ["react-hot-loader/webpack", "ts-loader"] },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf)/, loader: 'file' },
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-boostrap": "ReactBoostrap",
    },
};