module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
      project: './tsconfig.json',
  },
  plugins: ["import", "prettier"],
  rules: {
    'prettier/prettier': ['error']
  }
};