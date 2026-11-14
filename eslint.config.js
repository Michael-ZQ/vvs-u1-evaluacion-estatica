// Configuración de ESLint (formato "flat config", ESLint >= 9).
// Equivale a `npx eslint --init` con: JavaScript, CommonJS, entorno Node.js.
// La justificación de cada regla está en docs/reglas-eslint.md.
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": "error",
      curly: ["error", "all"],
      "prefer-const": "error",
      "no-console": "warn",
      "no-magic-numbers": ["warn", { ignore: [0, 100], enforceConst: true }],
    },
  },
];
