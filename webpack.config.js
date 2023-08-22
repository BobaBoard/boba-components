import * as url from "url";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import tsconfig from "./tsconfig.export.json" assert { type: "json" };
import * as createRequire from "create-require";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: Object.keys(tsconfig.compilerOptions.paths).reduce(
      (aliases, aliasName) => {
        aliases[aliasName.replace("/*", "")] = path.resolve(
          __dirname,
          `src/${tsconfig.compilerOptions.paths[aliasName][0].replace("*", "")}`
        );
        return aliases;
      },
      {}
    ),
    fallback: {
      os: false,
      tty: createRequire.default().resolve("tty-browserify"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      experimentalUseImportModule: false,
    }),
  ],
  target: "web",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "boba-ui-components",
    libraryTarget: "umd",
    chunkLoading: "jsonp",
    globalObject: "this",
  },
  entry: path.join(__dirname, "src/", "index.ts"),
  optimization: {
    minimize: false,
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
  // Source maps support ('inline-source-map' also works)
  devtool: "source-map",
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/typescript",
              ],
              plugins: [
                ["styled-jsx/babel", { optimizeForSpeed: true }],
                "@babel/plugin-proposal-class-properties",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: true,
            },
          },
        ],
      },
    ],
  },
};
