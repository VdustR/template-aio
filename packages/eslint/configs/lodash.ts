import type { ESLint } from "eslint";

import type { Config } from "../types";

const lodash: Config = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  plugins: {
    lodash: {
      rules: {
        import: {
          meta: {
            fixable: "code",
          },
          create: (context) => {
            return {
              ImportDeclaration: (node) => {
                if (node.source.value === "lodash") {
                  const imports = node.specifiers.flatMap((specifier) => {
                    if (specifier.type === "ImportSpecifier") {
                      return specifier.imported.name;
                    }
                    return [];
                  });
                  context.report({
                    node: node.source,
                    message:
                      "Use named imports instead of a default import from lodash.",
                    fix: (fixer) => {
                      return fixer.replaceText(
                        node,
                        imports
                          .map(
                            (name) => `import ${name} from "lodash/${name}";`,
                          )
                          .join("\n"),
                      );
                    },
                  });
                  return;
                }
                if (node.source.value === "lodash/fp") {
                  const imports = node.specifiers.flatMap((specifier) => {
                    if (specifier.type === "ImportSpecifier") {
                      return specifier.imported.name;
                    }
                    return [];
                  });
                  context.report({
                    node: node.source,
                    message:
                      "Use named imports instead of a default import from lodash/fp.",
                    fix: (fixer) => {
                      return fixer.replaceText(
                        node,
                        imports
                          .map(
                            (name) =>
                              `import ${name} from "lodash/fp/${name}";`,
                          )
                          .join("\n"),
                      );
                    },
                  });
                }
              },
            };
          },
        },
      },
    } satisfies ESLint.Plugin,
  },
  rules: {
    "lodash/import": "error",
  },
};

export { lodash };
