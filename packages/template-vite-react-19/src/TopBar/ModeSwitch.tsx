import { Typography, useColorScheme } from "@mui/joy";
import Switch from "@mui/joy/Switch";
import useEventCallback from "@mui/utils/useEventCallback";
import { useMemo } from "react";

const systemScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const isDark = useMemo(
    () => mode === "dark" || (mode !== "light" && systemScheme === "dark"),
    [mode],
  );
  const onChange = useEventCallback(() => {
    setMode(isDark ? "light" : "dark");
  });

  return (
    <Switch
      checked={isDark}
      onChange={onChange}
      slotProps={{
        track: {
          children: (
            <>
              <Typography component="span" level="inherit" sx={{ ml: "8px" }}>
                ☀️
              </Typography>
              <Typography component="span" level="inherit" sx={{ mr: "8px" }}>
                🌙
              </Typography>
            </>
          ),
        },
      }}
      sx={{
        "--Switch-thumbSize": "27px",
        "--Switch-trackWidth": "64px",
        "--Switch-trackHeight": "31px",
      }}
    />
  );
}

export { ModeToggle };
