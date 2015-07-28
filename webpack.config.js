"use strict";

var webpack = require("webpack");
var fs = require("fs");
//var path = require("path");

var production = 0;

module.exports = {
  context: __dirname + "/src",

  entry: {
    vendor:
    [
      "bootstrap/dist/css/bootstrap.min.css",
      "react-ladda/node_modules/ladda/dist/ladda-themeless.min.css",
      "select2/dist/css/select2.css",
      "metisMenu/dist/metisMenu.css",
      "x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css",

      "bootstrap",
      "clone",
      "enum",
      "filist",
      "i18next-client",
      "jquery",
      // "ladda/dist/spin.min.js",
      // "ladda/dist/ladda.min.js",
      //"ladda",
      "lodash",
      "metisMenu",
      //"newforms-bootstrap",
      "ofx4js",
			"radium",
      "react",
      "react/addons",
      "react-bootstrap",
      "react-fa",
      "react-ladda",
			"react-router",
      "safe-access",
      "select2",
      "string-hash",
      "sortablejs",
      "updraft",
      "x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js",
    ],
    app: "./index.ts",
  },

  output: {
    path: __dirname + "/app",
    filename: "ezm.js",
    library: "ezm"
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    //root: [path.join(__dirname, "bower_components")]
  },

  jshint: JSON.parse(fs.readFileSync("./.jshintrc")),

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      //{ test: /\.ts$/, loader: 'ts-loader!ts-jsx-loader' },
      //{ test: /\.ts$/, loader: 'typescript-simple-loader' },
      //{ test: /\.tsx?$/, loader: 'awesome-typescript-loader?compiler=ntypescript' },
      { test: /\.tsx?$/, loader: 'ts-loader?compiler=ntypescript' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(svg|woff|woff2|ttf|eot)($|\?)/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.(png|gif|jpg)($|\?)/, loader: "file?name=images/[name].[ext]" },
    ]
  },

  plugins: [
//    // bower
//    new webpack.ResolverPlugin(
//      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
//    ),

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
      _: "lodash",
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "React": "react/addons",
      "ReactBootstrap": "react-bootstrap",
      "Updraft": "updraft",
      "ofx4js": "ofx4js",
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
