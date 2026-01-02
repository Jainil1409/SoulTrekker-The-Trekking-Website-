import React, { useState } from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

function MyProfile() {
  const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };

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
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoulTrekker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/" style={navLinkStyle}>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-5 pt-5">
        <h2 className="mb-4 text-center">My Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <fieldset className="mb-4">
            <legend>Personal Details</legend>

            <div className="mb-3">
              <label>Profile Picture</label>
              <input type="file" name="profilePicture" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input name="firstName" placeholder="First Name" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input name="lastName" placeholder="Last Name" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input type="date" name="dob" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <select name="gender" onChange={handleChange} className="form-select">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-3">
              <input name="height" placeholder="Height (cm)" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input name="weight" placeholder="Weight (kg)" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control" />
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend>Emergency Details</legend>

            <div className="mb-3">
              <label>ID Proof</label>
              <input type="file" name="idProof" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <input name="mobile" placeholder="Mobile" onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <select name="bloodGroup" onChange={handleChange} className="form-select">
                <option>I don't know</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>
            </div>

            <div className="mb-3">
              <textarea name="address" placeholder="Address" onChange={handleChange} className="form-control" />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
