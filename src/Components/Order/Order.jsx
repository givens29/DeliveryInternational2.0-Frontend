import { useContext, useEffect, useState } from "react";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import OrderHistory from "./OrderHistory";

function Order() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/Order/getListOrders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to fetch orders.");
        }

        const result = await response.json();
        setOrders(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [authToken]);

  const handleClick = () => {
    navigate("/create-order");
  };

  return (
    <Container className="mt-2 order">
      <Row>
        <Col>
          <p>An order can be created with the items in the cart</p>
        </Col>
        <Col>
          <Button variant="success" onClick={handleClick}>
            Create Order
          </Button>
        </Col>
      </Row>
      <h1>Previous Orders</h1>
      {orders?.length > 0 ? (
        orders?.map((order) => (
          <ListGroup key={order.id}>
            <ListGroup.Item>
              <OrderHistory order={order} />
            </ListGroup.Item>
          </ListGroup>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center info">
          <p className="text-muted fs-4"> No Order history.</p>
        </div>
      )}
    </Container>
  );
}

export default Order;
