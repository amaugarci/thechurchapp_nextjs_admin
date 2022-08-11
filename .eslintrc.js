module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  overrides: [{}],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};
