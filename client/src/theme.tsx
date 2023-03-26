import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {},
  zIndex: {
    appBar: 1251,
    modal: 1250,
  },
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
          backgroundColor: "white",
          color: "rgb(75 85 99)",
        },
      },
    },
  },
});
