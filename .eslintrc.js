module.exports = {
  'extends': 'airbnb',
  'parserOptions': {
    'ecmaFeatures': {
      'classes': true,
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
  'globals': {
    fetch: true,
    FormData: true,
  },
  'rules': {
    'browser': true,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'consistent-return': 0,
    'no-console': 0,
    'no-alert': 0,
    'global-require': 0,
    'no-nested-ternary': 0,
    'operator-linebreak': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-curly-brace-presence': 0,
    'import/no-unresolved': [ 'always', {ignorePackages: true} ],
    'import/extensions': [1, { 'js': 'never' }],
    'react/forbid-prop-types': [1, { "forbid": ['any', 'array'], checkContextTypes: false, checkChildContextTypes: false }],
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'max-len': [1, {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    }],
    'object-curly-newline': [1, {
      consistent: true,
    }],
    'no-plusplus': 0,
    'import/no-extraneous-dependencies': [1, { devDependencies: true }],
  },
  'plugins': [
    'react',
    'react-native',
  ],
  'env': {
    'node': true,
  },
};
