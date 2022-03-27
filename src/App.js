import "./App.css";
import Routes from "./routes";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import Store from "./redux/store";

function App() {
  return (
    <Provider store={Store()}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
