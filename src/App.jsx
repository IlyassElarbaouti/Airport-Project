import React from "react";
import { Provider } from "react-redux";
import AirportInput from "./components/AirportInput";
import AirportResults from "./components/AirportTable";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import './app.scss'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AirportInput />
      <AirportResults />
    </BrowserRouter>
  </Provider>
);

export default App;
