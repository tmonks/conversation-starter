import React, { useState } from "react";
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark className="mb-5">
        <Container>
          <NavbarBrand href="/">Conversation Starter</NavbarBrand>

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
          {/* 
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="justify-content-end" navbar>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Add New</NavLink>
              </NavItem>
              {/* {props.categories.map(cat => {
                return (
                  <NavItem key={cat.id}>
                    <NavLink href="#">{cat.title}</NavLink>
                  </NavItem>
                );
              })} */}
          {/*
            </Nav>
          </Collapse>
          */}
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;
