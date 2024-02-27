import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import LayoutWeb from "../../../layouts/Web";
import mapboxgl from "mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX;

  function WebPlacesDirection() {

    return (
      <React.Fragment>
        <LayoutWeb>
          <div className="container mt-80">
            Halaman Places Direction
          </div>
        </LayoutWeb>
      </React.Fragment>
    )

  }

export default WebPlacesDirection;