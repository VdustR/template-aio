function add(...args: [number, ...Array<number>]): number {
  return args.reduce((a, b) => a + b, 0);
}

export { add };
