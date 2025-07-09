import { Button, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";

function Logout() {
  const { logout } = useContext(AuthContext);
  const [error, setError] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/User/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          logout(token);
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      }
      logout(token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleClick}>
        Logout
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}

export default Logout;
