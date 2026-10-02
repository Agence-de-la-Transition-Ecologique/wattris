import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
export default defineConfig([
    ...nextCoreWebVitals,
    eslintConfigPrettier,
  {
    ignores: ["coverage/**", ".next/**", "out/**", "node_modules/**"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);
