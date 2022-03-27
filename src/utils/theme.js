import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(
  adaptV4Theme({
    palette: {
      // mode: "dark",
      white: "#fff",
      black: "#000",
      background: {
        lighter: "rgba(0,0,0,0.6)",
        main: "#00ab55",
        light: "#EBF8F2",
        dark: "#212121",
        // paper: "#3B3B3B",
      },
      text: {
        primary: "#212b36",
        inverted: "#637381",
      },
      gray: {
        100: "#f9f9f9",
        200: "#F7F7F7",
        300: "#f4f4f4",
        400: "#F3F3F3",
        500: "#f1f1f1", // border alt color
        600: "#EdEdEd",
        700: "#E6E6E6", // border color
        800: "#C2C3CC",
        900: "#bdbdbd",
        1000: "#ababab",
        1200: "#919191",
      },
      // primary: {
      //   main: "#1f5f61",
      // },
      primary: {
        main: "#00ab55",
        light: "#EBF8F2",
      },
      secondary: {
        main: "#637381",
      },
      success: {
        main: "#229a16",
        light: "#54d62c30",
      },
      error: {
        main: "#b72136",
        light: "#ff484230",
      },
      warning: {
        main: "#b78103",
        light: "#fff7cd",
      },
      fontSizes: {
        xs: 11,
        sm: 13,
        base: 15,
        semibase: 17,
        md: 19,
        lg: 21,
        xl: 24,
        xxl: 30,
        "2xl": 30,
        "3xl": 36,
        "4xl": 42,
        "5xl": 48,
        "6xl": 54,
        "7xl": 60,
      },
      fontWeights: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        bolder: 900,
      },
      radius: {
        base: "4px",
        small: "3px",
        medium: "8px",
        big: "20px",
        bigger: "50px",
      },
    },
  })
);

export default theme;
