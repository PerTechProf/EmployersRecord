import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>Tinfoil</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="employers"><Nav.Link>Сотрудники</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}