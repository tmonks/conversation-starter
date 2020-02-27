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
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const categoriesDropdown = (
    <UncontrolledDropdown nav>
      <DropdownToggle nav caret>
        {props.currentCategoryId === null
          ? "All Categories"
          : props.categories.find(cat => cat._id === props.currentCategoryId).title}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          key="1"
          active={props.currentCategoryId === null ? true : false}
          onClick={() => props.updateCategory(null)}
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
      <Navbar color="dark" dark className="mb-5" expand="sm" fixed="top">
        <Container className="justify-content-between">
          <NavbarBrand href="/">Conversation Starter</NavbarBrand>
          {/* 
          <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle style={{ width: 150 }} caret>
              {props.currentCategoryId
                ? props.categories.find(x => x._id === props.currentCategoryId).title
                : "All Categories"}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                key="1"
                active={props.currentCategoryId === null ? true : false}
                onClick={() => props.updateCategory(null)}
                tag={Link}
                to="/"
              >
                All Categories
              </DropdownItem>
              {!props.isLoading &&
                props.categories.map(cat => {
                  return (
                    <DropdownItem
                      key={cat._id}
                      active={props.currentCategoryId === cat._id ? true : false}
                      onClick={() => props.updateCategory(cat._id)}
                      tag={Link}
                      to="/"
                    >
                      {cat.title}
                    </DropdownItem>
                  );
                })}
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/add">
                Add a Prompt
              </DropdownItem>
              <DropdownItem tag={Link} to="/about">
                About
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> 
          */}

          <NavbarToggler onClick={toggle} />
          <Collapse className="flex-grow-0" isOpen={isOpen} navbar>
            <Nav navbar>
              {useLocation().pathname === "/" ? (
                categoriesDropdown
              ) : (
                <NavItem>
                  <NavLink onClick={closeMenu} tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink tag={Link} to="/about" onClick={closeMenu}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/add" onClick={closeMenu}>
                  Add New
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
