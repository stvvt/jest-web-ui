module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: "off",
    "@typescript-eslint/semi": ["warn", "always"],
    "@typescript-eslint/space-before-function-paren": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/explicit-function-return-type": "off"  
  },
};
