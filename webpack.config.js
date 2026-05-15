const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/scripts/main.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'assets/[name].[contenthash:8].js' : 'assets/[name].js',
      clean: true,
      publicPath: '',
    },

    devtool: isProd ? false : 'eval-source-map',

    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      port: 5173,
      hot: true,
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern-compiler',
                sassOptions: {
                  silenceDeprecations: ['legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.json$/,
          type: 'json',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: 'assets/[name].[contenthash:8].css',
            }),
          ]
        : []),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
            noErrorOnMissing: true,
          },
        ],
      }),
    ],

    resolve: {
      extensions: ['.js', '.json'],
    },
  };
};
