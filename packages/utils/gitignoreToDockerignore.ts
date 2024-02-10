import { guessEol } from "./guessEol";

function gitignoreToDockerignore(gitignore: string): string {
  const eol = guessEol(gitignore);
  return gitignore
    .split(eol)
    .map((line) => {
      if (!line || line.startsWith("#")) return line;
      const isNegative = line.startsWith("!");
      const gitPath = isNegative ? line.slice(1) : line;
      const dockerPath = !gitPath
        ? ""
        : gitPath.startsWith("/")
          ? gitPath.slice(1)
          : `**/${gitPath}`;
      return isNegative ? `!${dockerPath}` : dockerPath;
    })
    .join(eol);
}

export { gitignoreToDockerignore };
