import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {},
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 50,
          minHeight: 32,
        },
      },
    },
  },
});
