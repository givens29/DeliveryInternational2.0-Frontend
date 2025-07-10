import { Container, Row, Image, Col, Button } from "react-bootstrap";
import ButtonIncDec from "../MainPageComponent/ButtonIncDec";

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
              <Col>
                <h6>{item.name}</h6>
                <p>Price: {item.price} $</p>
              </Col>
              <Col>
                <ButtonIncDec dishId={item.id} initialQuantity={item.count} />
              </Col>
            </Col>
            <Col>
              <Button variant="danger">Remove</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
