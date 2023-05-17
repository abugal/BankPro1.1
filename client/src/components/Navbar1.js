import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BankPro</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#deposit">Deposit</Nav.Link>
            <Nav.Link href="#withdraw">Withdraw</Nav.Link>
            <Nav.Link href="#balance">Balance</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;