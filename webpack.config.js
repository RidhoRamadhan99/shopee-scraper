const path = require("path");

module.exports = {
  entry: {
    background: "./src/js/background.js",
    content: "./src/js/content.js",
    popup: "./src/js/popup.js",
    scraper: "./src/js/scraper.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
