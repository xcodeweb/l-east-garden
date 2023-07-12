export const configWebpack = () => {
  return {
    mode: app.isBuild ? "production" : "development",
    devtool: !app.isBuild ? 'source-map' : false,

    output: {
      filename: "app.min.js"
    },
    resolve: {
      extensions: [".ts", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader"
          }
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3.6.5"
                  }
                ]
              ]
            }
          },
          resolve: {
            // Edit for import without extension (false = without ext)
            fullySpecified: true
          }
        },
        {
          test: /\.(css|scss|sass)$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    }
  };
};
