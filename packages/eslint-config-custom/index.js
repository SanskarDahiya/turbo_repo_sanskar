// module.exports = {
//   plugins: ["@typescript-eslint"],
//   extends: [
//     "next",
//     "turbo",
//     "next/core-web-vitals",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:jsx-a11y/recommended",
//     "prettier",
//   ],
//   ignorePatterns: ["public/static/js"],
//   rules: {
//     "@next/next/no-html-link-for-pages": "off",
//     "jsx-a11y/anchor-is-valid": "off",
//     "@typescript-eslint/ban-ts-comment": "off",
//     "@typescript-eslint/camelcase": "off",
//     "no-console": "warn",
//     "@typescript-eslint/no-unused-vars": "warn",
//     "@typescript-eslint/no-var-requires": "off",
//     "@typescript-eslint/no-explicit-any": "warn",
//     "@typescript-eslint/explicit-module-boundary-types": "off",
//     "prefer-const": "warn",
//     "@next/next/no-img-element": "off",
//   },
// };

module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
