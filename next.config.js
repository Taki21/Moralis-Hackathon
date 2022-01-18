const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/fiber",
  "@react-three/drei",
]);

module.exports = withTM({

  webpack(config, options) {
    config.module.rules.push({
      test: /\.(gltf|gtl|obj|png|fbx)$/,
      use: {
        loader: "file-loader"
      },
    });

  return config; 
  },

  reactStrictMode: true,
});