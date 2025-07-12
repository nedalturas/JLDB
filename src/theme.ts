import { createTheme } from "@mantine/core";

export const theme = createTheme({
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
  primaryShade: 6,
  primaryColor: "primary",
  defaultRadius: "sm",
  other: {
    buttonActiveStyle: "default"
  },
  
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  
  components: {
    Paper: {
      defaultProps: {
        shadow: 'sm',
      },
    },
    Button: {
      defaultProps: {
        variant: 'filled',
      },
    },
    Table: {
      styles: {
        th: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
          borderBottom: 'light-dark(1px solid var(--mantine-color-gray-3), 1px solid var(--mantine-color-dark-4))',
        },
      },
    },
  },
});