const path                 =  require('path');
const webpack              =  require('webpack');
const MiniCssExtractPlugin =  require('mini-css-extract-plugin');
const HTMLplugin           =  require('webpack-html-plugin');
const HTMLloader           =  require('html-loader');

module.exports = {
  mode: 'production', // 'production'
  //watch: true,
  devServer: {
    port: 8000,
    hot: true,
    //static: path.join(__dirname, './dist'), // boolean | string | array | object, static file location
    static: { 
      //path.join(__dirname, './dist'), // boolean | string | array | object, static file location
      directory: path.join(__dirname, 'dist'), 
      watch: true,
     },
    watchFiles: {
      paths: ['src/**/*.html','src/**/*.js','src/**/*.scss', 'dist/**/*.js'],
    }
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist'
  },

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

	plugins: [
		new MiniCssExtractPlugin ({
			filename: 'style.css',
		}),
	],
///

};