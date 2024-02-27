import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import LayoutWeb from "../../../layouts/Web";
import mapboxgl from "mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { us } from "@mapbox/mapbox-gl-geocoder/lib/exceptions";
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX;

function WebPlacesDirection() {
  document.title = "Map Direction - TRAVEL GIS - Website wisata Berbasis GIS (Geographic Information System)"

  const mapContainer = useRef(null);

  const [longitude, setLongitude] = useState(110.7241664);
  const [latitude, setLatitude] = useState(-6.9515962);

  const { slug } = useParams();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [query.get('longitude'), query.get('latitude')],
      zoom: 15
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geolocate);

    const directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      controls: {
        inputs: false,
        instructions: true,
      },
    });

    map.on('load', function (position) {
      geolocate.trigger();
      geolocate.on('geolocate', function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        directions.setOrigin([position.coords.longitude, position.coords.latitude]);
      });
      directions.setDestination([query.get('longitude'), query.get('latitude')]);

      map.addControl(directions);
    });
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="container mt-80">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                  <Link to={`/places/${slug}`} className="float-end btn btn-success btn-sm mb-2"><i className="fa fa-long-arrow-alt-left"></i> BACK TO PLACE</Link>
                  <h5><i className="fa fa-location-arrow"></i> DIRECTION FROM USER LOCATION</h5>
                  <hr />
                  <div ref={mapContainer} className="map-container" style={{ height: "400px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  )

}

export default WebPlacesDirection;