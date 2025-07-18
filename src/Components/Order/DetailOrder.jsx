import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import ItemOrder from "./ItemOrder";

function DetailOrder() {
  const { authToken } = useContext(AuthContext);
  const [order, setOrder] = useState();
  const { idOrder } = useParams();
  const [createdTime, setCreatedTime] = useState();
  const [deliveryTime, setDeliveryTime] = useState();
  const [items, setItems] = useState([]);
  const [error, setError] = useState();

  const formatDate = (date) => {
    const dateFormat = new Date(date);

    const formatDate = `${String(dateFormat.getDate()).padStart(
      2,
      "0"
    )}.${String(dateFormat.getMonth() + 1).padStart(2, "0")}.${String(
      dateFormat.getFullYear()
    ).slice(-2)}`;

    const formatTime = `${String(dateFormat.getHours()).padStart(
      2,
      "0"
    )}:${String(dateFormat.getMinutes()).padStart(2, "0")}`;

    const formatDateTime = `${formatDate} ${formatTime}`;

    return formatDateTime;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `/api/Order/getConcreateOrder?idOrder=${idOrder}`,
          {
            method: "GET",
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

        const result = await response.json();
        setOrder(result);
        setDeliveryTime(formatDate(result.deliveryTime));
        setCreatedTime(formatDate(result.orderTime));
        setItems(result.dishInCart);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrder();
  }, [authToken]);

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
    <Container>
      {!order ? (
        <p>Loading order...</p>
      ) : (
        <>
          <Row>
            <Col>
              <h5>Order #{order.id}</h5>
            </Col>
            {order.status === "InProcess" && (
              <Col>
                <Button variant="outline-success" onClick={handleClick}>
                  Confirm Delivery
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            <p>Created at: {createdTime}</p>
            <p>Delivery time: {deliveryTime}</p>
            <p>Delivery address: {order.address}</p>
            <p>Order status - {order.status}</p>
          </Row>
          <Row>
            <p>Item list: </p>
            {items?.length > 0 ? (
              items?.map((item) => (
                <ListGroup key={item.id}>
                  <ListGroup.Item>
                    <ItemOrder item={item} />
                  </ListGroup.Item>
                </ListGroup>
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center info">
                <p className="text-muted fs-4"> No Order history.</p>
              </div>
            )}
          </Row>
          <p>
            <span className="fw-bold">Total</span>: {order.price}$
          </p>
        </>
      )}
    </Container>
  );
}

export default DetailOrder;
