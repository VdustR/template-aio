import { CssBaseline, CssVarsProvider } from "@mui/joy";
import type { ComponentProps, ReactNode } from "react";

const defaultMode: NonNullable<
  ComponentProps<typeof CssVarsProvider>["defaultMode"]
> = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

function Theme({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider defaultMode={defaultMode}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

export { Theme };
