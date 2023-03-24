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
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "transparent",
          color: "rgb(75 85 99)"
        }
      }
    }
  },
});
