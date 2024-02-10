function guessEol(content: string) {
  const crCount = (content.match(/\r/g) || []).length;
  const lfCount = (content.match(/\n/g) || []).length;
  const crlfCount = (content.match(/\r\n/g) || []).length;
  if (crlfCount > crCount && crlfCount > lfCount) return "\r\n";

  if (crCount > lfCount && crCount > crlfCount) return "\r";

  return "\n";
}

export { guessEol };
