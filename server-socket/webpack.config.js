module.exports = {
  entry: "./static/src/app.js",
  output: {
    filename: "static/js/bundle.js"
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "d3": "d3"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
