import { useContext, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../CSS/ButtonIncDec.css";
import { AuthContext } from "../../AuthContext";

function ButtonIncDec({ dishId, initialQuantity, onRemove }) {
  const { authToken } = useContext(AuthContext);
  const [num, setNum] = useState(initialQuantity);

  const handleClick = async (isIncrease) => {
    try {
      const response = await fetch(
        `/api/Cart/increaseOrDecreaseDish?idDish=${dishId}&isIncrease=${isIncrease}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const result = await response.text();
      if (!response.ok) {
        throw new Error(result);
      }

      if (result === "Dish increased!") {
        setNum(num + 1);
      } else if (result === "Dish decreased!") {
        setNum(num - 1);
      } else if (result === "Dish removed!") {
        onRemove?.();
      }
    } catch (error) {
      console.error(error.message);
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
