import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        dark: "#A59C82",
        main: "#D7CDB2",
        light: "#FFFFE4"
      },
      secondary: {
        dark: "#E0913E",
        main: "#FFA750",
        light: "#FFD97F"
      },
      status: {
        green: "#75F94C",
        yellow: "#DFDE6C",
        red: "#EB3223"
      },
      radiant: {
        darker: "#4A0905",
        dark: "#7C160D",
        main: "#75F94C"
      },
      dire: {
        darker: "#225213",
        dark: "#3B8524",
        main: "#EB3223"
      }
    },
    typography: {
        fontFamily: [
            "Roboto Slab"
        ],
        h1: {
            fontFamily: "Roboto Slab", 
            fontSize: 52, 
            fontWeight: "bold", 
        }
        
    }
  });

export default theme