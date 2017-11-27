/* eslint-env node */
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'projection-grid-core',
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  externals: {
    underscore: {
      commonjs: 'underscore',
      commonjs2: 'underscore',
      amd: 'underscore',
      root: '_',
    },
  },
};
