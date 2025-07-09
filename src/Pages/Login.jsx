import { Container, Form, Button, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState();
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(`Password must be at least 8 characters long, contain letters
        ,numbers and symbols @ $ ! % * ? &`);
      return;
    }

    try {
      const response = await fetch(
        `/api/User/login?email=${formData.email}&password=${formData.password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${errorMessage}`);
      }

      const result = await response.text();
      login(result);
      navigation("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be at least 8 characters long, contain letters
            ,numbers and symbols @ $ ! % * ? &.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>
          <i className="text-muted">
            If you don't have an account. Please{" "}
            <a href="/registration">register</a> yourself.
          </i>
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default Login;
