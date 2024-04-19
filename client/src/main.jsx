import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import { MainContextProvider } from "./context/MainContext";

const root = document.getElementById("root");
createRoot(root).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <MainContextProvider>
        {/* <React.StrictMode> */}
          <Router>
            <App />
          </Router>
        {/* </React.StrictMode> */}
      </MainContextProvider>
    </PersistGate>
  </Provider>
);
