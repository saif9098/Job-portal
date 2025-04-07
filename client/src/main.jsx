import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/auth";
import { NavProvider } from "./context/nav";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <NavProvider>
  <Provider store={store}>
  <BrowserRouter>
  <StrictMode>
  <App />
  </StrictMode>
  </BrowserRouter>
  </Provider>
    </NavProvider>
    </AuthProvider>,
)
