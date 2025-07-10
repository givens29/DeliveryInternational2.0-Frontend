import { useState, useEffect, useContext } from "react";
import { Container, Form, Button, FormGroup, Alert } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { authToken, logout } = useContext(AuthContext);

  useEffect(() => {
    fetch(`/api/User/getProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          logout();
        }
        if (!response.ok) {
          const errorMessage = response.text();
          throw new Error(`${errorMessage}`);
        }
        return response.json();
      })
      .then((profile) => {
        const gender = profile.gender?.toLowerCase();
        const formattedDate = profile.birthDate?.split("T")[0];
        setFormData({ ...profile, birthDate: formattedDate, gender });
        localStorage.setItem("CartItems", JSON.stringify(profile.cart));
      })
      .catch((error) => {
        setError("Error fetching profile:", error.message);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/User/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(`${errorMessage}`);
      }

      const result = await response.text();
      setSuccess(result);
    } catch (error) {
      setError("Error update profile", error);
    }
  };
  return (
    <Container>
      <h1>Profile</h1>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="birthDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            value={formData.birthDate}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleSelectChange}
            value={formData.gender}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <FormGroup controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            pattern="[0-9]{12}"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={formData.email || ""} disabled />
        </Form.Group>
        <Button variant="primary" type="submit">
          Edit
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default Profile;
