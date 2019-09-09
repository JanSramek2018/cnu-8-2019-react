import React from 'react';
import './Header.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';



  class Header extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
  
          <Navbar color="light" light expand="md" className="mainNavBar mb-3">
            <div className="container-fluid">
            <NavbarBrand href="/">CookBook App by Jan Šrámek</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" tabs>
                <NavItem>
                  <NavLink className="mainNavBarNavItem" href="/">Recipes Listing</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            </div>
          </Navbar>
      
      );
    }
  }

export default Header;
