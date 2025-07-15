import { useContext, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../CSS/ButtonIncDec.css";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";

function ButtonIncDec({ dishId, initialQuantity, onRemove, onError }) {
  const { incDecItem } = useContext(CartContext);
  const [num, setNum] = useState(initialQuantity);

  const handleClick = async (isIncrease) => {
    try {
      const result = await incDecItem(dishId, isIncrease);
      if (!result?.success) {
        onError(result?.message || "Failed to update item.");
      } else {
        onError(null);
        const newQuantity = isIncrease ? num + 1 : num - 1;
        setNum(newQuantity);

        if (newQuantity <= 0 && onRemove) {
          onRemove();
        }
      }
    } catch {
      onError("An unexpected error occurred.");
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
