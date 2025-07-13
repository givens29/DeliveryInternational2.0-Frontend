import { Container, Row, Col, Image } from "react-bootstrap";

function ItemOrder({ item }) {
  return (
    <Container>
      <Row>
        <Col>
          <Image src={item.image} rounded className="w-100 p-3" />
        </Col>
        <Col>
          <p>{item.name}</p>
          <p>Price: {item.price}$</p>
          <p>Quantity: {item.count}</p>
        </Col>
        <Col>
          <p>
            <span className="fw-bold">Price</span>: {item.totalPrice}$
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemOrder;
