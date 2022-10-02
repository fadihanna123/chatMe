module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  root: true,
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-jsdoc',
    'eslint-plugin-prefer-arrow',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/naming-convention': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          Function: {
            message:
              'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
          },
        },
      },
    ],
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always',
      },
    ],
    '@typescript-eslint/unified-signatures': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'comma-dangle': 'off',
    complexity: 'off',
    'constructor-super': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'eol-last': 'off',
    eqeqeq: ['warn'],
    'guard-for-in': 'error',
    'id-denylist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined',
    ],
    'id-match': 'error',
    'import/order': 'off',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'space-in-parens': 'error',
    'no-mixed-spaces-and-tabs': 'warn',
    'jsdoc/newline-after-description': 'error',
    'max-classes-per-file': ['error', 10],
    'max-len': ['error', { code: 200 }],
    'max-lines': ['error', { max: 500 }],
    'keyword-spacing': 'error',
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: true },
    ],
    'no-duplicate-imports': 'error',
    'no-confusing-arrow': 'error',
    'arrow-spacing': 'error',
    'new-parens': 'error',
    'no-bitwise': 'off',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    'no-eval': 'error',
    'no-fallthrough': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-member-access': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-unused-labels': 'error',
    'no-useless-return': 'error',
    'no-constant-condition': 'warn',
    'no-useless-concat': 'error',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'object-curly-newline': 'error',
    'object-shorthand': 'off',
    'one-var': ['error', 'never'],
    'prefer-arrow/prefer-arrow-functions': 'error',
    'prefer-const': 'error',
    'prefer-template': 'warn',
    quotes: ['error', 'single'],
    radix: 'error',
    semi: 'error',
    'semi-spacing': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'use-isnan': 'error',
    'valid-typeof': 'off',
  },
};
