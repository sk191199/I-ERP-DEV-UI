// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";

// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";

// import { store } from "@/redux/store";
// import { SessionProvider } from "@/features/auth/SessionProvider";
// import { theme } from "@/theme/theme";
// import { ReactRouterDomProvider } from "@/react-router-dom";

// import "./styles.css";

// const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error("Root element #root was not found");
// }

// createRoot(rootElement).render(
//   <Provider store={store}>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       <SessionProvider>
//         <ReactRouterDomProvider />
//       </SessionProvider>

//     </ThemeProvider>
//   </Provider>
// );

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { SessionProvider } from "@/features/auth/SessionProvider";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import { AppRouter } from "@/routes";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(
  <Provider store={store}>
    <AppThemeProvider>
      <SessionProvider>
        <AppRouter />
      </SessionProvider>
    </AppThemeProvider>
  </Provider>,
);