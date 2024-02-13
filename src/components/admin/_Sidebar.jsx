import React from "react";
import { Link, useLocation } from "react-router-dom"; //import Link and useLocation

function Sidebar() {
  const location = useLocation(); //get the current location
  const { pathname } = location; //get the current path
  const splitedPath = pathname.split("/"); //split the path

  return (
    <React.Fragment>
      <div className="list-group list-group-flush">
        <Link className={splitLocation[2] === "dashboard" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"} to="/admin/dashboard"><i className="fa fa-tachometer-alt me-2"></i> Dashboard</Link>
        <Link className={splitLocation[2] === "categories" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"} to="/admin/categories"><i className="fa fa-folder me-2"></i> Categories</Link>
        <Link className={splitLocation[2] === "places" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"} to="/admin/places"><i className="fa fa-map-marked-alt me-2"></i> PLACES</Link>
        <Link className={splitLocation[2] === "sliders" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"} to="/admin/sliders"><i className="fa fa-images me-2"></i> Sliders</Link>
        <Link className={splitLocation[2] === "users" ? "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase active" : "list-group-item list-group-item-action list-group-item-light p-3 text-uppercase"} to="/admin/users"><i className="fa fa-users me-2"></i> Users</Link>
      </div>
    </React.Fragment>
  )
}

export default Sidebar;