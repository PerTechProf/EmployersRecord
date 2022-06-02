import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Container, Nav } from 'react-bootstrap';
import { selectToken, selectIsEditor } from '../store/authReducer';
import { useSelector } from 'react-redux';

export const NavBar = () => {
  const token = useSelector(selectToken);
  const isEditor = useSelector(selectIsEditor);

  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>Tinfoil</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        { token ? <>
            <Nav className="mr-auto">
              <LinkContainer to="employers"><Nav.Link>Сотрудники</Nav.Link></LinkContainer>
              <LinkContainer to="applications"><Nav.Link>Заявки</Nav.Link></LinkContainer>
              {isEditor && <LinkContainer to="reports"><Nav.Link>Отчёты</Nav.Link></LinkContainer>}
            </Nav>
            <Nav>
                <LinkContainer to="account-info"><Nav.Link>Профиль</Nav.Link></LinkContainer>
                <LinkContainer to="logout"><Nav.Link>Выйти</Nav.Link></LinkContainer>
            </Nav>
          </>
          : <>
            <Nav className="ml-auto">
              <LinkContainer to="login"><Nav.Link>Войти</Nav.Link></LinkContainer>
            </Nav>
          </>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}