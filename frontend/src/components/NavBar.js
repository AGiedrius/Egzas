import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function NavBar({ vartotojas, onLogout }) {
  if (!vartotojas) return null;
  if (vartotojas.role === 'admin') {
    return (
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Administracinė sritis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#sveciai">Svečiai</Nav.Link>
              <Nav.Link href="#kategorijos">Knygų kategorijos</Nav.Link>
              <Nav.Link href="#knygos">Knygos</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={vartotojas.vardas + ' ' + vartotojas.pavarde} id="user-nav-dropdown">
                <NavDropdown.Item onClick={onLogout}>Atsijungti</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  // Svecias
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand>{vartotojas.vardas + ' ' + vartotojas.pavarde}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#knygos">Knygos</Nav.Link>
            <Nav.Link href="#rezervacijos">Mano rezervacijos</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Veiksmai" id="user-nav-dropdown">
              <NavDropdown.Item onClick={onLogout}>Atsijungti</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
