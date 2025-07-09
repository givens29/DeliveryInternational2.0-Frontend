import { Container, Row, Image, Col } from "react-bootstrap";

function Item({ item }) {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Row>
            <Col>
              <Image src={item.image} rounded className="w-100 p-3" />
            </Col>
            <Col>
              <h6>{item.name}</h6>
              <p>Price: {item.price} $</p>
              <p>Quantity: {item.count}</p>
            </Col>
          </Row>
        </Col>
        <Col sm={8}>
          <p>Price: {item.totalPrice} $</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
