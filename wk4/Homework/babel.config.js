module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",  // Keep this for Reanimated
      ["module:react-native-dotenv", {
        "moduleName": "@env",            // This will allow you to import variables from your .env file using @env
        "path": ".env",                  // Path to your .env file
        "safe": false,
        "allowUndefined": true,
      }],
    ],
  };
};
