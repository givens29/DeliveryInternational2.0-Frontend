import { Container, Nav, Navbar, Stack, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logout from "./Logout";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import Account from "./Account";

function Navigation() {
  const { authToken } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const cartNum = cart?.dishInCarts?.reduce((sum, dish) => sum + dish.count, 0);

  const navigation = useNavigate();

  const handleClick = (link) => {
    navigation(link);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Delivery.Eats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Nav className="me-auto">
                <Nav.Link href="/">Menu</Nav.Link>
                <Nav.Link href="#link">Orders</Nav.Link>
                <Nav.Link href="/cart">
                  Cart{" "}
                  <Badge bg="danger" pill>
                    {cartNum}
                  </Badge>
                </Nav.Link>
              </Nav>
            </div>
            {authToken ? (
              <>
                <div className="p-2 ms-auto">
                  <Account />
                </div>
                <div className="p-2">
                  <Logout />
                </div>
              </>
            ) : (
              <>
                <div className="p-2 ms-auto">
                  <Button
                    variant="primary"
                    onClick={() => handleClick("/login")}
                  >
                    Login
                  </Button>
                </div>
                <div className="vr"></div>
                <div className="p-2">
                  <Button
                    variant="primary"
                    onClick={() => handleClick("/registration")}
                  >
                    Register
                  </Button>
                </div>
              </>
            )}
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
