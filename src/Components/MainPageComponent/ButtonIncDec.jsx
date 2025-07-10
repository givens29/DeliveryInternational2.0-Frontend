import { useContext, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../CSS/ButtonIncDec.css";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";

function ButtonIncDec({ dishId, initialQuantity, onRemove }) {
  const { authToken } = useContext(AuthContext);
  const { incDecItem } = useContext(CartContext);
  const [num, setNum] = useState(initialQuantity);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async (isIncrease) => {
    const result = await incDecItem(dishId, isIncrease);
    if (!result.success) {
      setError(result.message);
    } else {
      setError(null);
      setMessage(result.message);

      const newQuantity = isIncrease ? num + 1 : num - 1;
      setNum(newQuantity);

      if (newQuantity <= 0 && onRemove) {
        onRemove();
      }
    }
  };
  return (
    <Container>
      <Row className="rowBut">
        <Col xs="auto" className="indicator" onClick={() => handleClick(true)}>
          {" "}
          +{" "}
        </Col>
        <Col className="text-center">{num}</Col>
        <Col xs="auto" className="indicator" onClick={() => handleClick(false)}>
          {" "}
          -{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default ButtonIncDec;
