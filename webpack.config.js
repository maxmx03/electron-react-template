const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const path = require('path');

const distFolder = path.resolve(__dirname, 'dist');
const sourceFolder = path.resolve(__dirname, 'src');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: distFolder,
    clean: true,
  },
  devServer: {
    static: distFolder,
    port: process.env.PORT ?? 8080,
    hot: true,
  },
};

const prodConfig = {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: distFolder,
    clean: true,
    pathinfo: false,
  },
  optimization: {
    runtimeChunk: true,
  },
};

const commonConfig = {
  entry: `${sourceFolder}/index.jsx`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: sourceFolder,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/i,
        include: sourceFolder,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module.css$/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: sourceFolder,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = (env) => {
  if (env.development) {
    return merge(commonConfig, devConfig);
  }

  return merge(commonConfig, prodConfig);
};
