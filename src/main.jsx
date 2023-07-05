import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './Context/index';
import { UserProvider } from './ContextUser/index';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';


ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
  <CartProvider>
  <BrowserRouter>
  <ThemeProvider theme={theme}>

      <CssBaseline />
      <App />
      </ThemeProvider>

  </BrowserRouter>
  </CartProvider>
    </UserProvider>

);
