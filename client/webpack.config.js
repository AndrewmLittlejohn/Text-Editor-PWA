const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// DONE -  TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
      hot: 'only',
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin'
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),    
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'jate',
      short_name: 'jate',
      background_color: '#5D6D7E',
      theme_color: '#5D6D7E',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [100, 200, 300],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    
  ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }}
        },
      ],
     },
  };
};
