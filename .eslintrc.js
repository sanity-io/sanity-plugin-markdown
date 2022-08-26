module.exports = {
  env: {
    browser: true,
    node: false,
  },
  extends: [
    'sanity/react', // must come before sanity/typescript
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['prettier'],
}
