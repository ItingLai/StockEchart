const { fa } = require('element-plus/es/locale')

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "prettier/prettier":[
      "error",
      {
        semi: false,//分号
        singleQuote: false,//单引号
        printWidth: 100,//一行的字符数，如果超过会进行换行，默认为80
        endofline: 'auto',//换行符
        
      }
    ]
  }
}
