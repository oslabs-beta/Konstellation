const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv').config({path: path.resolve(__dirname, '.env')});
const TerserPlugin = require('terser-webpack-plugin')



module.exports = (env: any, argv:any) => {

  const mode = argv.mode || 'development';
  console.log('ARGV MODE IS: ', argv.mode)

  const dotEnv = new webpack.DefinePlugin({
    "process.env": {
      'BASE_URL_DEV': JSON.stringify(process.env.BASE_URL_DEV),
      'PORT_DEV': JSON.stringify(process.env.PORT_DEV),
      'BASE_URL_PROD': JSON.stringify(process.env.BASE_URL_PROD),
      'PORT_PROD': JSON.stringify(process.env.PORT_PROD),
   }
});

  return {
    mode,
    stats: {
      errorDetails: true
    },
    entry: {
      bundle: './client/src/index.tsx' 
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true, // this will run dev from RAM rather than storing to HDD, and for npm run build it deletes old build files
      assetModuleFilename: '[name][ext]', // this makes sure that the name remains the same during compilation
    },
    module: {
      
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Konstellation',
        template: './client/index.html',
        filename: './index.html',
        // favicon: './client/favicon.ico',
      }),
      new CopyPlugin({
        patterns: [{ from: './client/style.css' }],
      }),
      dotEnv
    ],
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
        publicPath: '/',
      },
      proxy: {
        '/api': 'http://localhost:3000',
        secure: false,
      },
      compress: false,
      host: 'localhost',
      port: 8080,
      hot: true,
      historyApiFallback: true,
    },
  };
  }
