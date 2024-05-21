
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";


// export default [
  
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

import pluginJs from "@eslint/js";
import { Linter } from "eslint";
import tsEslint from "@typescript-eslint/eslint-plugin";
import angularEslint from "@angular-eslint/eslint-plugin";

const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    '@angular-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended',
  ],
  rules: {
    // Ajoutez vos règles spécifiques ici
  },
  overrides: [
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        // Ajoutez vos règles spécifiques pour les templates ici
      }
    }
  ]
};

export default config;
