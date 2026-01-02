import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';

function BookingConfirmation() {
  const { state } = useLocation();

const hasSubmitted = useRef(false);
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
useEffect(() => {
  if (state && !hasSubmitted.current) {
    hasSubmitted.current = true;

    const formDataToSend = {
      ...state,
      idProof: state.idProof?.name || '',
      profilePicture: state.profilePicture?.name || '',
    };
    // axios.post('http://localhost:5000/api/bookings', formDataToSend)
    api.post('/bookings',formDataToSend)
    .then((res) => console.log('Booking saved:', res.data))
    .catch((err) => console.error('Error saving booking:', err));
  }
}, [state]);

  const {
    firstName,
    lastName,
    dob,
    gender,
    height,
    weight,
    email,
    idProof,
    mobile,
    bloodGroup,
    address,
    profilePicture,
    trekName,
    location,
    trekDate,
    travelMode,
    price
  } = state || {};

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <h3 className="mb-4 text-success text-center">Booking Confirmed!</h3>

        <h5 className="mb-3">👤 Personal Details</h5>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Date of Birth:</strong> {dob}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Height:</strong> {height} cm</p>
        <p><strong>Weight:</strong> {weight} kg</p>
        <p><strong>Email:</strong> {email}</p>
        {profilePicture && <p><strong>Profile Picture:</strong> {profilePicture.name}</p>}

        <hr />

        <h5 className="mb-3">🚨 Emergency Details</h5>
        {idProof && <p><strong>ID Proof:</strong> {idProof.name}</p>}
        <p><strong>Mobile:</strong> {mobile}</p>
        <p><strong>Blood Group:</strong> {bloodGroup}</p>
        <p><strong>Address:</strong> {address}</p>

        <hr />

        <h5 className="mb-3">🧭 Trek Booking Details</h5>
        <p><strong>Trek Name:</strong> {trekName}</p>
        <p><strong>Departure City:</strong> {location}</p>
        <p><strong>Date of Trek:</strong> {trekDate ? new Date(trekDate).toLocaleDateString() : ''}</p>
        <p><strong>Travel Mode:</strong> {travelMode}</p>
        <p><strong>Total Price:</strong> ₹{price}</p>
        <p><strong>Payment Method:</strong> Cash Payment Only</p>

        <div className="text-center mt-4">
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}

export default BookingConfirmation;
