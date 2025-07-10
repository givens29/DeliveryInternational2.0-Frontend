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
      <Row>
        <Col sm={4}>
          <Row>
            <Col>
              <Image src={item.image} rounded className="w-100 p-3" />
            </Col>
            <Col>
              <Col>
                <h6>{item.name}</h6>
                <p>Price: {item.price} $</p>
              </Col>
              <Col>
                <ButtonIncDec dishId={item.id} initialQuantity={item.count} />
              </Col>
            </Col>
            <Col>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
