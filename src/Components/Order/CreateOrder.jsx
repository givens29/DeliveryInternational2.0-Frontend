import { useContext, useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  ListGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import ItemOrder from "./ItemOrder";

function CreateOrder() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    dateTimeDelivery: "",
    address: "",
  });
  const { authToken } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/User/getProfile`, {
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
      setUserData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData.email && userData.phoneNumber) {
      setFormData((prev) => ({
        ...prev,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/Order/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch orders.");
      }

      navigate("/order");
    } catch (err) {
      setError(err.message);
    }
  };

  if (cart?.dishInCarts.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <p className="text-muted fs-4">No items in the cart.</p>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="fw-bold">Create Order</h2>
      <h6 className="fw-bold">User Data</h6>
      <Row>
        <Col>
          <FloatingLabel
            controlId="phoneNumber"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              value={userData.phoneNumber || "-"}
              disabled
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="email" label="Email" className="mb-3">
            <Form.Control
              value={userData.email || "-"}
              disabled
              onChange={handleChange}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <h6 className="fw-bold">Delivery Data</h6>
      <Row>
        <Col>
          <Form.Group controlId="address">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control type="text" required onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dateTimeDelivery">
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control
              type="datetime-local"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <p>Item list:</p>
        {cart?.dishInCarts?.map((item) => (
          <ListGroup key={item.id}>
            <ListGroup.Item>
              <ItemOrder item={item} />
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Row>
      <p>
        <span className="fw-bold">Total</span>: {cart.amount}
      </p>
      <Button variant="success" type="submit">
        Confirm Order
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default CreateOrder;
