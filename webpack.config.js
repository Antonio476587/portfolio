import dotenv from "dotenv";
import webpack from "webpack";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mode = process.env.MODE || "development";

const browserConfig = {
  mode: mode,
  entry: { app: ["./src/App.jsx"] },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/js"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: "11",
                    edge: "15",
                    safari: "10",
                    firefox: "50",
                    chrome: "49",
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
    },
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
    },
    open: true,
    historyApiFallback: { index: "/indexwebpack.html" },
  },
};

export default browserConfig;
