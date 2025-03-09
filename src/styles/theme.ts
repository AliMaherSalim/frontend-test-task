import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
    secondary: {
      main: "#333",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h6: {
      fontSize: "18px",
      fontWeight: 600,
    },
  },
});

export default theme;
