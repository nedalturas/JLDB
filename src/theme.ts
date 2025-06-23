import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */

  colors: {
    primary: [
      "#e0fbff",
      "#cdf1ff",
      "#a0dff9",
      "#6fcdf3",
      "#46bdee",
      "#30b5ec",
      "#12afec",
      "#0099d2",
      "#0088bd",
      "#0076a8"
    ]
  },
  primaryShade: 4,
  primaryColor: "primary",
  defaultRadius: "sm",
  other: {
    buttonActiveStyle: "default"
  }
});
