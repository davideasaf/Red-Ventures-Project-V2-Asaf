const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const configParts = require('./libs/configParts');




const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src', 'styles'),
  components: path.join(__dirname, 'src', 'components')
};


const common = {
  entry: [PATHS.app + '/main.jsx', PATHS.style + '/app.css'],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
	  loaders: [
  	  {
  	  	test: /\.jsx?/,
        exclude: /node_modules/,
  	  	loader: 'babel'
  	  },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(
      common,
      configParts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);