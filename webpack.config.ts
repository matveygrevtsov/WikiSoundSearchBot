import path from "node:path";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  target: "node", // Чтобы webpack генерировал код для node.js-среды.
  mode: "none",
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

module.exports = config;
