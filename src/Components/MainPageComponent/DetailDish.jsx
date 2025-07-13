import { useContext, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Rating from "react-rating";

function DetailDish() {
  const [dish, setDish] = useState();
  const [error, setError] = useState();
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { authToken } = useContext(AuthContext);
  const { idDish } = useParams();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`/api/Dish/getDish?idDish=${idDish}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setIsVegetarian(result.isVegetarian);

        const ratings = result.ratings || [];
        const total = ratings.reduce((sum, r) => sum + r.value, 0);
        const averageRating = ratings.length ? total / ratings.length : 0;

        setDish({ ...result, averageRating });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDish();
  }, [authToken, idDish]);

  const handleRating = async (rating) => {
    try {
      const response = await fetch(
        `/api/Dish/addRating?idDish=${idDish}&rating=${rating}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!dish) {
    return <p>Loading dish...</p>;
  }

  return (
    <Container>
      <h1>{dish.name}</h1>
      <Image src={dish.image} className="img-fluid" />
      <p>Dish category: {dish.category}</p>
      {isVegetarian ? <p>Vegetarian</p> : <p>Not vegetarian</p>}
      <p>{dish.description}</p>
      <Rating
        initialRating={dish.averageRating}
        emptySymbol={<FaRegStar color="gray" />}
        fullSymbol={<FaStar color="gold" />}
        onChange={handleRating}
      />
      <p>Price: {dish.price}</p>
    </Container>
  );
}

export default DetailDish;
