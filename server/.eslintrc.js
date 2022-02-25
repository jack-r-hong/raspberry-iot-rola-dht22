module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    // 'use-decorator',
  ],
  'rules': {
    'linebreak-style': 0,
    'require-jsdoc': 0,
    'new-cap': ['error', {'capIsNew': false}],
    // 'use-decorator/use-decorator': [1, {
    //   'params': [
    //     {
    //       'name': 'assertParameter',
    //       'public': true,
    //     },
    //   ],
    //   'methods': [
    //     {
    //       'name': 'assert',
    //       'public': true,
    //     },
    //     {
    //       'name': 'errorcatch',
    //       'async': true,
    //       'private': true,
    //     },
    //   ],
    //   'class': [
    //     {
    //       'superClass': ['Vue', 'Mixins'],
    //       'name': 'Component',
    //     },
    //   ],
    // }],

  },
};
