import React from "react";
import { Navbar as BSNavbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <BSNavbar bg="light" expand="lg">
      <Container>
        <BSNavbar.Brand href="/">SOMAKODE</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.rol === "Cliente" && <Nav.Link onClick={() => navigate("/cliente")}>Cliente</Nav.Link>}
            {user?.rol === "Admin" && <Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>}
          </Nav>
          {user ? (
            <Button variant="outline-danger" onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-primary" onClick={() => navigate("/login")}>Login</Button>
            </>
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
