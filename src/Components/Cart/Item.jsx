import { Container, Row, Image, Col, Button, Alert } from "react-bootstrap";
import ButtonIncDec from "../MainPageComponent/ButtonIncDec";
import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";

function Item({ item }) {
  const { removeItem } = useContext(CartContext);
  const [error, setError] = useState();
  const handleRemove = async () => {
    const result = await removeItem(item.id);

    if (!result.success) {
      setError(result.message);
    } else {
      setError(null);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col>
          <Image src={item.image} rounded className="w-100 p-3" />
        </Col>
        <Col>
          <Row>
            <Col sm={12} lg={6}>
              <h6>{item.name}</h6>
              <p>Price: {item.price} $</p>
            </Col>
            <Col sm={12} lg={6}>
              <ButtonIncDec dishId={item.id} initialQuantity={item.count} />
            </Col>
          </Row>
        </Col>
        <Col className="text-end">
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
          {error && (
            <Alert className="mt-5" variant="danger">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
