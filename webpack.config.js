"use strict";

var webpack = require("webpack");
var fs = require("fs");

var production = 0;

module.exports = {
  context: __dirname + "/src",

  entry: {
    vendor:
    [
      "bootstrap/dist/css/bootstrap.min.css",
      "select2/dist/css/select2.css",
      "i18next-client",
      "jquery",
      "lodash",
      "newforms-bootstrap",
      "react",
      "react/addons",
      "react-bootstrap",
      "react-fa",
      "reflux",
      "safe-access",
      "select2",
      "sortablejs",
      "updraft"
    ],
    app: "./main.jsx",
  },

  output: {
    path: __dirname + "/app",
    filename: "ezm.js",
    library: "ezm"
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
  jshint: JSON.parse(fs.readFileSync("./.jshintrc")),
  
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'jsxhint-loader?harmony' }
    ],

    loaders: [
      { test: /\.json?$/, loader: 'json-loader' },
      { test: /\.jsx?$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(svg|woff|woff2|ttf|eot)($|\?)/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.(png|gif|jpg)($|\?)/, loader: "file?name=images/[name].[ext]" },
    ]
  },

  plugins: [
    // production defines
    new webpack.DefinePlugin({
      DEBUG: production ? 0 : 1,
      PRODUCTION: production ? 1 : 0,
    }),
    
    // separate vendor chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    }),

    // globals
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  
  resolveLoader: { root: __dirname + "/node_modules" },
  
  devtool: "source-map"
};


if(production) {
  module.exports.jshint.failOnHint = true;
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    test: /\.jsx?($|\?)/i
  }));
}
