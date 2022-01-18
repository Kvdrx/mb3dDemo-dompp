const { join } = require("path");

module.exports = {
  entry: "./index.mjs",
  output: {
    path: join(__dirname, "dist"),
    libraryTarget: "umd",
    library: "dompp"
  },
  devtool: "source-map",
  module: {
    rules: [{ 
      test: /\.m?js$/, 
      exclude: /(node_modules)/,
      loader: "babel-loader",
      options: {
        presets: [
          { 'plugins': ['@babel/plugin-proposal-class-properties'] }
        ]
      }
    }]
  }
};