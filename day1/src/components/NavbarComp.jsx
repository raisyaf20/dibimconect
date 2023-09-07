import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { DataContext } from "../App";

const NavbarComp = () => {
  const location = useLocation();
  const { auth } = useContext(DataContext);
  window.onscroll = function () {
    const head = document.querySelector("header");
    const fix = head.offsetTop;
    if (window.pageYOffset > fix) {
      head.classList.add("navbar-sc");
    } else {
      head.classList.remove("navbar-sc");
    }
  };
  return (
    <>
      <header>
        <Navbar sticky="top" expand="lg" variant="transparent">
          <Container>
            <Navbar.Brand href="#home">Notes.smile</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="flex-grow-0 w-100 justify-content-between"
              id="basic-navbar-nav"
            >
              <Nav>
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to={"/"}
                >
                  Home
                </NavLink>
                {auth.token && (
                  <NavLink className="nav-link" to={"/dashboard"}>
                    Dashboard
                  </NavLink>
                )}
              </Nav>
              <Nav>
                <NavLink
                  className={`nav-link $${
                    location.pathname === "/login" ? "active" : ""
                  } `}
                  to={"login"}
                >
                  Login
                </NavLink>

                <NavLink
                  className={`nav-link $${
                    location.pathname === "/register" ? "active" : ""
                  } `}
                  to={"register"}
                >
                  Register
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </>
  );
};

export default NavbarComp;
