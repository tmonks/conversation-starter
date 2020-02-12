import React, { useState } from "react";
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All Categories");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const clickMenuItem = item => {
    console.log(item + " was selected");
    setCurrentCategory(item);
  };

  return (
    <div>
      <Navbar color="dark" dark className="mb-5">
        <Container>
          <NavbarBrand href="/">Talky Talky</NavbarBrand>

          <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle style={{ width: 200 }} caret>
              {currentCategory}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                key="1"
                active={currentCategory === "All Categories" ? true : false}
                onClick={() => clickMenuItem("All Categories")}
              >
                All Categories
              </DropdownItem>
              {props.categories.map(cat => {
                return (
                  <DropdownItem
                    key={cat.id}
                    active={currentCategory === cat.title ? true : false}
                    onClick={() => clickMenuItem(cat.title)}
                  >
                    {cat.title}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
          {/* <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="justify-content-end" navbar>
              {props.categories.map(cat => {
                return (
                  <NavItem key={cat.id}>
                    <NavLink href="#">{cat.title}</NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
