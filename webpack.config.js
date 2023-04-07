const path = require("path");
const Dotenv = require("dotenv-webpack"); // Плагин для использования .env-переменных.

module.exports = {
  entry: "./src/index.ts",
  target: "node", // Чтобы вебпак генерировал код для node.js-среды.
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
  plugins: [
    new Dotenv({
      path: "./src/.env",
    }),
  ],
};
