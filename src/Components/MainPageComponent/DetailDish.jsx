import { useContext, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Alert, Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Rating from "react-rating";
import "..//..//CSS//DetailDish.css";

function DetailDish() {
  const [dish, setDish] = useState();
  const [error, setError] = useState();
  const [ratingError, setRatingError] = useState();
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { authToken } = useContext(AuthContext);
  const { idDish } = useParams();

  const calculateRating = (rating) => {
    const ratings = rating || [];
    const total = ratings.reduce((sum, r) => sum + r.value, 0);
    const averageRating = ratings.length ? total / ratings.length : 0;

    return averageRating;
  };

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(`/api/Dish/getDish?idDish=${idDish}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setIsVegetarian(result.isVegetarian);
        const averageRating = calculateRating(result.ratings);

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
      setRatingError(`Error: ${error.message}`);
    }
  };

  if (error) {
    return (
      <div
        variant="danger"
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Alert variant="danger">
          <p className="text-muted fs-4">{error}</p>
        </Alert>
      </div>
    );
  }

  if (!dish) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{dish.name}</h1>
      <Container className="detail-dish text-center">
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
        {ratingError && <Alert variant="danger">{ratingError}</Alert>}
        <p>Price: {dish.price}</p>
      </Container>
    </>
  );
}

export default DetailDish;
