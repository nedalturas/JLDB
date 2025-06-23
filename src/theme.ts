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
  },
  
  // Enhanced theme configuration for better dark mode support
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  
  // Custom component styles for consistent theming
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
      styles: (theme) => ({
        th: {
          backgroundColor: theme.colorScheme === 'dark' 
            ? theme.colors.dark[6] 
            : theme.colors.gray[0],
          borderBottom: `1px solid ${
            theme.colorScheme === 'dark' 
              ? theme.colors.dark[4] 
              : theme.colors.gray[3]
          }`,
        },
      }),
    },
  },
});