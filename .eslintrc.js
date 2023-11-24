module.exports = {
  // Specify the environments
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021, // Or the appropriate ECMAScript version
    sourceType: "module", // Add this line to specify module usage
  },
  // Extend configurations (e.g., recommended rules)
  extends: ["eslint:recommended", "plugin:react/recommended"],
  // Define rules specific to your project
  rules: {
    // Add or override rules here
    "no-console": "off", // Example: Turn off 'no-console' rule
    "react/prop-types": "off", // Example: Turn off prop-types rule for React
  },
  // Additional settings (optional)
  settings: {
    react: {
      version: "detect", // Detect React version for plugin
    },
  },
  // Other configurations...
};
