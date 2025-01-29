module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies) {
        /**
         * Outdated package.
         *
         * This causes `@vp-tw/eslint-config` to apply `Linter.RulesRecord` to `@types/eslint`
         * instead of `eslint`, which already includes its own type definitions.
         */
        delete pkg.dependencies["@types/eslint"];
      }
      return pkg;
    },
  },
};
