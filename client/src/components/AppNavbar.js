import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./AppNavbar.scss";

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const categoriesDropdown = (
    <UncontrolledDropdown nav active>
      <DropdownToggle nav caret>
        {props.currentCategoryId === null
          ? "All Categories"
          : props.categories.find(cat => cat._id === props.currentCategoryId).title}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          key="1"
          active={props.currentCategoryId === null ? true : false}
          onClick={() => {
            props.updateCategory(null);
            closeMenu();
          }}
        >
          All
        </DropdownItem>
        {props.categories.map(cat => {
          return (
            <DropdownItem
              className="ml-auto"
              key={cat._id}
              active={props.currentCategoryId === cat._id ? true : false}
              onClick={() => {
                props.updateCategory(cat._id);
                closeMenu();
              }}
            >
              {cat.title}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  return (
    <div>
      <Navbar dark expand="sm" fixed="top">
        <Container className="justify-content-between">
          <NavbarBrand href="/">ChatterMonkey</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className="flex-grow-0" isOpen={isOpen} navbar>
            <Nav navbar>
              {/* Show the Categories Dropdown if on the Home route */
              useLocation().pathname === "/" ? (
                categoriesDropdown
              ) : (
                <NavItem>
                  <NavLink onClick={closeMenu} tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  tag={Link}
                  to="/about"
                  onClick={closeMenu}
                  active={useLocation().pathname === "/about"}
                >
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/add"
                  onClick={closeMenu}
                  active={useLocation().pathname === "/add"}
                >
                  Add
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
