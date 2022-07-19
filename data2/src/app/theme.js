import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#A59C82",
      main: "#D7CDB2",
      light: "#FFFFE4",
    },
    secondary: {
      dark: "#E0913E",
      main: "#FFA750",
      light: "#FFD97F",
    },
    status: {
      green: "#75F94C",
      yellow: "#DFDE6C",
      red: "#EB3223",
    },
    radiant: {
      darker: "#225213",
      dark: "#3B8524",
      text: "#1cb823",
      main: "#75F94C",
    },
    dire: {
      darker: "#4A0905",
      dark: "#7C160D",
      main: "#EB3223",
    },
  },
  typography: {
    fontFamily: ["Roboto Slab"],
    h1: {
      fontSize: 52,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 32,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 500,
    },
    match_time: {
      fontFamily: ["Roboto Slab"],
      fontSize: 28,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "main" },
          style: {
            minWidth: 150,
            height: "max-content",
            marginRight: 8,
            marginLeft: 8,
            border: "solid",
            borderColor: "#FFA750",
            transition: "background 0.4s, color 0.3s, border-color 0.3s",
            transitionTimingFunction: "ease-in-out",
            background: "#FFA750",
            color: "white",
            ":hover": {
              background: alpha("#FFA750", 0.7),
              color: "#FFFFE4",
              border: "solid",
              borderColor: alpha("#FFA750", 0.7),
            },
          },
        },
        {
          props: { variant: "main", color: "secondary" },
          style: {
            background: "#FFFFE4",
            color: "#FFA750",
            borderColor: alpha("#FFFFFF", 0.6),
            ":hover": {
              backgroundColor: "#FFA750",
              color: "white",
              border: "solid",
              borderColor: "#FFA750",
            },
          },
        },
      ],
    },
  },
});

export default theme;
