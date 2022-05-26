import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">ПерТехПроф</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/"><Nav.Link>Материнское гнездо</Nav.Link></LinkContainer>
            <LinkContainer to="/about"><Nav.Link>О</Nav.Link></LinkContainer>
            <LinkContainer to="/results"><Nav.Link>Результаты</Nav.Link></LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}