import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import validate from 'webpack-validator';
import configParts from './libs/configParts';

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src', 'styles'),
  components: path.join(__dirname, 'src', 'components'),
};


const common = {
  entry: [`${PATHS.app}/main.jsx`, `${PATHS.style}/app.css`],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

let config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(
      common,
      configParts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      })
    );
}

module.exports = validate(config);
