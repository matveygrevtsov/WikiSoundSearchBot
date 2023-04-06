const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  module: {
    rules: [{ use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
};
