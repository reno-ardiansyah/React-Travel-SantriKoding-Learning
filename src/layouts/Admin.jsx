import React, { useState, useEffect } from "react"; //import react 
import { NavDropdown } from "react-bootstrap"; //import NavDropdown Bootstrap component
import Sidebar from "../components/admin/_sidebar"; //import Sidebar component
import Api from "../api"; //import Api
import Cookies from "js-cookie"; //import js cookie
import { useNavigate, Link, redirect } from "react-router-dom"; //import useNavigate and Link
import toast from "react-hot-toast"; //import toast

const LayoutAdmin = ({ children }) => {
  const [user, setUser] = useState({}); //set user state
  const [sidebarToggle, setSidebarToggle] = useState(false); //set sidebarToggle state
  const navigate = useNavigate(); //get navigate
  const token = Cookies.get("token"); //get token

  //fn toggle sidebar
  const SidebarToggleHandler = (e) => {
    e.preventDefault(); //prevent default

    if (!sidebarToggle) {
      document.body.classList.add("sb-sidenav-toggled"); //add sidebar-toggled class

      setSidebarToggle(true); //set sidebarToggle to true
    } else {
      document.body.classList.remove("sb-sidenav-toggled"); //remove sidebar-toggled class

      setSidebarToggle(false); //set sidebarToggle to false
    }
  }

  //fetc Data
  const fetchData = async () => {
    await Api.get('/api/admin/user', {
      headers: {
        Authorization: `Bearer ${token}`, //set token to header
      }
    })
      .then((response) => {
        setUser(response.data); //set user state
      })
  };

  //ussEffect
  useEffect(() => {
    fetchData(); //fetch data 

  }, []);

  //fn Logout
  const logoutHandler = async (e) => {
    e.preventDefault(); //prevent default

    await Api.post('api/admin/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`, //set token to header
      }
    }).then(() => {
      Cookies.remove("token"); //remove token

      //show toast
      toast.success('Logout Successfully.', {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      // redirect
      navigate("/admin/login");
    })
  }

  return (
    <React.Fragment>
      <div className="d-flex sb-sidenav-toggled" id="wrapper">
        <div className="bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading bg-light text-center"><i className="fa fa-map-marked-alt"></i> <strong>TRAVEL GIS</strong> <small>ADMIN</small></div>
          <Sidebar />
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button className="btn btn-success-dark" onClick={sidebarToggleHandler}><i className="fa fa-list-ul"></i></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  <NavDropdown title={user.name} className="fw-bold" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/" target="_blank"><i className="fa fa-external-link-alt me-2"></i> Visit Web</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/admin/categories"><i className="fa fa-folder me-2"></i> Categories</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/places"><i className="fa fa-map-marked-alt me-2"></i> Places</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/sliders"><i className="fa fa-images me-2"></i> Sliders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users"><i className="fa fa-users me-2"></i> Users</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}><i className="fa fa-sign-out-alt me-2"></i> Logout</NavDropdown.Item>
                  </NavDropdown>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LayoutAdmin;