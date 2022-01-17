/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "three",
  "react-three-fiber",
  "drei",
]);

module.exports = withTM({

  webpack(config, options) {
    config.module.rules.push({
      test: /\.(obj|png|fbx)$/,
      use: {
        loader: "file-loader"
      },
    });

  return config; 
  },

  reactStrictMode: true,
});