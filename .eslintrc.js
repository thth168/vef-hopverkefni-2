module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'class-methods-use-this': 0,
    'linebreak-style': ["error", "windows"],
    'max-depth': 10,
  },
  plugins: ['import'],
};
