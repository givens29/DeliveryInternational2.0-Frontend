import { Card, Button, Alert, Row, Col } from "react-bootstrap";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import ButtonIncDec from "./ButtonIncDec";
import { useNavigate } from "react-router-dom";
import "..//../CSS/Dish.css";

function Dish({ dish }) {
  const [addDish, setAddDish] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { cart, addItem } = useContext(CartContext);

  const existingDish = cart?.dishInCarts?.find((d) => d.id === dish.id);
  const isInCart = !!existingDish;
  const initialQuantity = existingDish?.count || 1;

  const ratings = dish.ratings || [];
  const total = ratings.reduce((sum, r) => sum + r.value, 0);
  const averageRating = ratings.length ? total / ratings.length : 0;

  useEffect(() => {
    setAddDish(isInCart);
  }, [isInCart]);

  const handleClick = async () => {
    try {
      const result = await addItem(dish.id);
      if (!result?.success) {
        setError(result?.message || "Failed to add item.");
      } else {
        setError(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  const handleRemove = async () => {
    setAddDish(false);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <Card
      className="dish-card"
      onClick={() => navigate(`/detail-dish/${dish.id}`)}
    >
      <Card.Img variant="top" src={dish.image} />
      <Card.Body>
        <Card.Title>{dish.name}</Card.Title>
        <p>Category - {dish.category}</p>
        <Rating
          initialRating={averageRating}
          emptySymbol={<FaRegStar color="gray" />}
          fullSymbol={<FaStar color="gold" />}
          onChange={(value) => console.log("Rated:", value)}
        />
        <Card.Text>{dish.description}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <p className="mb-0 fw-bold">{dish.price}$</p>
          {isInCart || addDish ? (
            <ButtonIncDec
              dishId={dish.id}
              initialQuantity={initialQuantity}
              onRemove={handleRemove}
              onError={handleError}
            />
          ) : (
            <Button variant="primary" onClick={handleClick}>
              Add To Cart
            </Button>
          )}
        </div>
      </Card.Body>

      {error && <Alert variant="danger">{error}</Alert>}
    </Card>
  );
}

export default Dish;
