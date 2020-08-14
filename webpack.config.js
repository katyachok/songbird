const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { config } = require("process");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const filename = ({ ext }) =>
  isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    "css-loader",
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];
  if (isDev) {
    loaders.push("eslint-loader");
  }
  return loaders;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: optimization(),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename({ ext: "css" }),
    }),
    // env && env.analyze ? new BundleAnalyzerPlugin() : new NothingPlugin(),
    // env && env.NODE_ENV === 'production'
    //   ? MiniCssExtractPlugin({ chunkFilename: '[id].css', filename: '[name].css' })
    //   : new NothingPlugin(),
  ];
  if (!isDev) {
    base.push(new BundleAnalyzerPlugin());
  }
  return base;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: ["@babel/polyfill", "./index.jsx"] },
  output: {
    filename: filename({ ext: "js" }),
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
    ],
  },
  devtool: isDev ? "source-map" : "",
  devServer: {
    port: 8080,
    //   contentBase: './dist',
    hot: isDev,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //     },
  //     {
  //       enforce: 'pre',
  //       test: /\.(js|jsx)$/,
  //       exclude: /node_modules/,
  //       loader: 'eslint-loader',
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif)$/,
  //       use: [
  //         {
  //           loader: 'url-loader',
  //           options: {
  //             limit: 8192,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/,
  //       use: 'file-loader',
  //     },
  //     {
  //       test: /\.(css|scss|sass)$/,
  //       exclude: /\.module\.(css|scss|sass)$/,
  //       use: [
  //         env && env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 1,
  //           },
  //         },
  //         'postcss-loader',
  //         'sass-loader',
  //       ],
  //     },
  //     {
  //       test: /\.module\.(css|scss|sass)$/,
  //       use: [
  //         env && env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 1,
  //             modules: true,
  //           },
  //         },
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: plugins(),
};

// module.exports = (env) => config(env);
