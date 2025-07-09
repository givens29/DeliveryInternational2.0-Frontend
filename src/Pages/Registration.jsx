import { Container, Form, Button, FormGroup, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    birthDate: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState();

  const navigation = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
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
      const response = await fetch("/api/User/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
      <h1>Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" required onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="birthDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            onChange={handleSelectChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" required onChange={handleChange} />
        </Form.Group>

        <FormGroup controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            pattern="[0-9]{12}"
            required
            onChange={handleChange}
          />
        </FormGroup>

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
            If you have an account. You can <a href="/login">login</a> yourself.
          </i>
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default Registration;
