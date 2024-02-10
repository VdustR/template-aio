import { guessEol } from "./guessEol";

function nestIgnore(ignore: string, packageDir: string) {
  const eol = guessEol(ignore);
  const lines = ignore.split(eol);
  const fixedLines = lines.flatMap((line) => {
    // Keep the comment
    if (line.startsWith("#")) return [line];
    // Keep if empty line or spaces line
    if (line.trim() === "") return [line];
    // Keep if the path is not in the package
    const absolutePath = line.replace(/^!/, "");
    // Keep if the path is not for specific dir
    if (!absolutePath.startsWith("/")) return [line];
    const currentPackagePrefix = `/${packageDir}/`;
    const isCurrentPackage = absolutePath.startsWith(currentPackagePrefix);
    if (isCurrentPackage) return [line.substring(`/${packageDir}`.length)];
    return [];
  });
  return fixedLines.join(eol);
}

export { nestIgnore };
