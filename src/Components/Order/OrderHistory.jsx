import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function OrderHistory({ order }) {
  const [error, setError] = useState();
  const { authToken } = useContext(AuthContext);
  const date = new Date(order.deliveryTime);
  const navigate = useNavigate();

  const orderDate = `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getFullYear()).slice(-2)}`;

  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  const deliveryTime = `${orderDate} ${time}`;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/Order/confirmDelivery?idOrder=${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch orders.");
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container onClick={() => navigate(`/detail-order/${order.id}`)}>
      <Row className="d-flex justify-content-between align-items-center">
        <Col xs="auto">
          <p className="fw-bold">Order from {orderDate}</p>
          <p>Delivery status - {order.status}</p>
          <p>Delivery time: {deliveryTime}</p>
        </Col>
        <Col xs="auto" className="text-end">
          {order.status === "InProcess" && (
            <Button variant="outline-success" onClick={handleClick}>
              Confirm Delivery
            </Button>
          )}

          <p className="mt-2">
            <span className="fw-bold">Total order cost</span>: {order.price}$
          </p>
        </Col>
        {error && <Alert variant="danger">{error}</Alert>}
      </Row>
    </Container>
  );
}

export default OrderHistory;
