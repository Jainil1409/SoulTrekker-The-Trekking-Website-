import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Navbar, Nav } from 'react-bootstrap';

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { location, travelMode, trekDate, price } = state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    height: '',
    weight: '',
    email: '',
    idProof: null,
    mobile: '',
    bloodGroup: '',
    address: '',
    profilePicture: null,
    trekName: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'firstName',
      'lastName',
      'dob',
      'gender',
      'height',
      'weight',
      'email',
      'mobile',
      'bloodGroup',
      'address',
      'trekName',
      'profilePicture',
      'idProof',
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        !formData[field] ||
        formData[field] === 'Select Gender' ||
        formData[field] === "I don't know"
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n\n${missingFields.join(', ')}`);
      return;
    }

    alert('Booking Confirmed!\n\n' + JSON.stringify(formData, null, 2));

    navigate('/confirmation', {
      state: {
        ...formData,
        location,
        trekDate,
        travelMode,
        price,
      },
    });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoulTrekker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5" style={{ marginTop: '90px' }}>
        <Card className="p-4">
          <h3 className="mb-4 text-center">Complete Your Booking</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <fieldset className="mb-4">
              <legend>Personal Details</legend>

              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="profilePicture" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control name="firstName" placeholder="First Name" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control name="lastName" placeholder="Last Name" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="date" name="dob" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select name="gender" onChange={handleChange} required>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control name="height" placeholder="Height (cm)" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
              </Form.Group>
            </fieldset>

            <fieldset className="mb-4">
              <legend>Emergency Details</legend>

              <Form.Group className="mb-3">
                <Form.Label>ID Proof</Form.Label>
                <Form.Control type="file" name="idProof" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control name="mobile" placeholder="Mobile" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select name="bloodGroup" onChange={handleChange} required>
                  <option>I don't know</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </fieldset>

            <fieldset className="mb-4">
              <legend>Booking Details</legend>

              <Form.Group className="mb-3">
                <Form.Label>Trek Name/Special Events</Form.Label>
                <Form.Control
                  type="text"
                  name="trekName"
                  placeholder="e.g. Hamta Pass"
                  value={formData.trekName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Departure City</Form.Label>
                <Form.Control type="text" value={location || ''} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Trek</Form.Label>
                <Form.Control
                  type="text"
                  value={trekDate ? trekDate.toLocaleDateString() : ''}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Travel Mode</Form.Label>
                <Form.Control type="text" value={travelMode || ''} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control type="text" value={price || ''} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control type="text" value="Cash Payment Only" readOnly />
              </Form.Group>
            </fieldset>

            <Button variant="primary" type="submit" className="w-100">
              Confirm Booking
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
