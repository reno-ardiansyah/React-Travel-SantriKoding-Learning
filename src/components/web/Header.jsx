import React, { useState, useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Api from "../../api";

function WebHeader() {
  const [categories, setCategories] = useState([]);

  const fetchDataCategories = async () => {
    await Api.get('/api/web/categories')
      .then((response) => {
        setCategories(response.data.data);
      });
  }

  useEffect(() => {
    fetchDataCategories();
  }, []);
  return (
    <React.Fragment>
    <Navbar collapseOnSelect expand="lg" className="navbar-custom shadow-sm" fixed="top">
        <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold text-white"><i className="fa fa-map-marked-alt"></i> TRAVEL GIS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown title={<span><i className="fa fa-list-ul"></i> CATEGORIES</span> } id="collasible-nav-dropdown" className="fw-bold text-white">
                {
                    categories.map((category) => (
                        <NavDropdown.Item as={Link} to={`/category/${category.slug}`} key={category.id}><img src={category.image} style={{ width: "35px" }} alt=""/> {category.name.toUpperCase()}</NavDropdown.Item>
                    ))
                }
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/posts/direction">LIHAT LAINNYA <i className="fa fa-long-arrow-alt-right"></i></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/places" className="fw-bold text-white"><i className="fa fa-globe-asia"></i> PLACES</Nav.Link>
                <Nav.Link as={Link} to="/maps" className="fw-bold text-white"><i className="fa fa-map"></i> MAPS</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link className="fw-bold text-white me-4"><i className="fa fa-search"></i> SEARCH</Nav.Link>
                <Link to="/admin/login" className="btn btn-md btn-light"><i className="fa fa-lock"></i> LOGIN</Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
</React.Fragment>
  );
}

export default WebHeader;