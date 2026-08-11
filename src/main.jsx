import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider, Global } from "@emotion/react";

import App from "./App.jsx";
import { theme } from "./styles/theme";
import { globalStyles } from "./styles/global";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  </StrictMode>,
);
