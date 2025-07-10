import { Card, Button, Alert } from "react-bootstrap";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import ButtonIncDec from "./ButtonIncDec";

function Dish({ dish }) {
  const [addDish, setAddDish] = useState(false);
  const [error, setError] = useState();
  const { authToken } = useContext(AuthContext);
  const { cart, addItem, removeItem } = useContext(CartContext);

  const existingDish = cart?.dishInCarts?.find((d) => d.id === dish.id);
  const isInCart = !!existingDish;
  const initialQuantity = existingDish?.count || 1;

  useEffect(() => {
    setAddDish(isInCart);
  }, [isInCart]);

  const handleClick = async () => {
    const result = await addItem(dish.id);

    if (!result.success) {
      setError(result.message);
    } else {
      setError(null);
    }
  };

  const handleRemove = async () => {
    setAddDish(false);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={dish.image} />
      <Card.Body>
        <Card.Title>{dish.name}</Card.Title>
        <p>Category - {dish.category}</p>
        <Rating
          initialRating={dish.rating}
          emptySymbol={<FaRegStar color="gray" />}
          fullSymbol={<FaStar color="gold" />}
          onChange={(value) => console.log("Rated:", value)}
        />
        <Card.Text>{dish.description}</Card.Text>
        <p>{dish.price}$</p>
        {isInCart || addDish ? (
          <ButtonIncDec
            dishId={dish.id}
            initialQuantity={initialQuantity}
            onRemove={handleRemove}
          />
        ) : (
          <Button variant="primary" onClick={handleClick}>
            Add To Cart
          </Button>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </Card.Body>
    </Card>
  );
}

export default Dish;
