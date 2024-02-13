import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";                     //import BrowserRouter dari react router
import "bootstrap/dist/css/bootstrap.min.css";                        //import CSS Bootstrap
import "mapbox-gl/dist/mapbox-gl.css";                                //mapbox gl CSS
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";      //mapbox gl geocoder CSS
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";      //mapbox gl geocoder CSS
import './assets/css/styles.css';                                     //import CSS custom    

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
