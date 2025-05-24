/// <reference types="@repo/dts/common" />

declare namespace NodeJS {
  interface ProcessEnv {
    LINT_STAGED_TYPE?: "format";
  }
}
