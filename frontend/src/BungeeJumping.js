import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Carousel,
  Modal,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css'; 

import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import b1 from'./bj.jpg';
import q1 from './k1.jpg';
import q2 from './k2.jpg';
import q3 from './k3.jpg';

function BungeeJumping() {
  const [showBooking, setShowBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowBooking(false);
    setStep(1);
    setSelectedLocation('');
    setTravelMode('');
    setSelectedDate(null);
  };
 const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };
  const getPrice = (location, mode) => {
    if (location === 'Rishikesh') return 3700;
    return 0;
  };

  const handleBookingRedirect = () => {
    const price = getPrice(selectedLocation, travelMode);
    navigate('/login', {
      state: {
        location: selectedLocation,
        travelMode,
        trekDate: selectedDate,
        price,
      },
    });
    handleClose();
  };

  return (
    <div className="container-fluid p-0">
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoulTrekker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
                     <Nav.Link as={Link} to="/about" style={navLinkStyle}>About</Nav.Link>
       
            <Nav.Link href="#contact-section" style={navLinkStyle}>Contact</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ marginTop: '56px' }}>
        <Carousel interval={2000} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={b1}
              alt="First slide"
              style={{ height: '75vh', objectFit: 'cover' }}
            />
          </Carousel.Item>
          
        </Carousel>
      </div>

      <Container className="my-5">
        <h3 style={{ color: 'orange' }}>
          <i>Bungee Jumping</i>
        </h3>
        <h4>Jump for Joy and Feel the Thrill!</h4>

        {/* Trek Info Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f7f7f7',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            flexWrap: 'wrap',
          }}
        >
          <InfoBlock label="Duration" value="1 Day" />
          <InfoBlock label="Difficulty" value="Easy" />
          <InfoBlock label="Age Group" value="12 to 40 Years" />
          <InfoBlock label="Altitude" value="273 ft" />
        </div>

        <div className="text-center mt-4">
          <Button variant="danger" onClick={() => setShowBooking(true)}>
            Book Now
          </Button>
        </div>
      </Container>

      {/* Booking modal */}
      <Modal show={showBooking} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Your Jump From Rishikesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h5></h5>
              <div className="d-flex flex-wrap justify-content-around">
                {['Rishikesh'].map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      setSelectedLocation(city);
                      if (city === 'Ahmedabad') {
                        setStep(2);
                      } else {
                        const travel =
                          city === 'Rishikesh'
                            ? 'None'
                            : city === 'Delhi'
                            ? 'AC Volvo Bus'
                            : 'Bus';
                        setTravelMode(travel);
                        setStep(3);
                      }
                    }}
                    style={getCardStyle(selectedLocation === city)}
                  >
                    <h6>{city}</h6>
                    <p>{getTravelDesc(city)}</p>
                    <strong>₹{getPrice(city, '3-Tier AC')}</strong>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && selectedLocation === 'Ahmedabad' && (
            <>
              <h5>Select Travel Type (Ahmedabad)</h5>
              <div className="d-flex justify-content-around">
                <div
                  onClick={() => {
                    setTravelMode('3-Tier AC');
                    setStep(3);
                  }}
                  style={getCardStyle(travelMode === '3-Tier AC')}
                >
                  <p>3-Tier AC</p>
                  <strong>₹15,500</strong>
                </div>
                <div
                  onClick={() => {
                    setTravelMode('Non-AC');
                    setStep(3);
                  }}
                  style={getCardStyle(travelMode === 'Non-AC')}
                >
                  <p>Non-AC</p>
                  <strong>₹13,000</strong>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h5>Select Date</h5>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control mt-2"
                minDate={new Date()}
              />
              <Button
                className="mt-4 w-100"
                variant="success"
                disabled={!selectedDate}
                onClick={handleBookingRedirect}
              >
                Continue to Login
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <Container className="mt-5">
  <h3 style={{ color: '#e67e22' }}>Schedule</h3>

  <div className="my-4">
    <ScheduleCard
      day="Day 1"
      title="Reporting at Rishikesh Campsite"
      shortDesc="Report at Rishikesh Jump Point"
      fullDesc="Reporting at Rishikesh Bungy Jump Point.
Safety:

Owned and run by Ex-Army officers.
Jump Masters trained by New Zealand experts.
Follows Australia & New Zealand Safety standards.
Certified by the Ministry of Tourism, Govt. of India.
What to Expect:
Once at the Jump Zone

Attend a briefing on bungee and safety procedures.
Sign disclaimer forms acknowledging terms and conditions.
Store belongings at the reception for a clutter-free jump.
Get harnessed with a minimum of 3 safety checks.
Take the plunge with rubber chords tied to your ankles.
Receive a Got-Guts badge and a Dared-to-Jump certificate.
Walk back to the cafeteria with a 15-minute trek.
Note:

Arrange your own transportation.
Guests accompanying the jumper pay an additional entry fee of ₹100/-.
"
     // image={day1}
    />
   
  </div>

</Container>
<footer className="bg-dark text-light pt-5 pb-3 mt-5"id="contact-section">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase">About SoulTrekker</h5>
        <p style={{ fontSize: '0.9rem' }}>
          SoulTrekker is a Non-Government Organization, run by young students committed to social reformation and building the nation with strong moral values and ethics.
        </p>
      </div>
      <div className="col-md-4 mb-4 text-center d-flex align-items-center justify-content-center">
        <img
          src={require('./st.jpg')}
          alt="SoulTrekker Logo"
          style={{ maxWidth: '100px', height: 'auto' }}
        />
      </div>
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase">Contact</h5>
        <p style={{ fontSize: '0.9rem' }}>
          <strong>Ahmedabad (Head Office)</strong><br />
          308, University Plaza, Above Chocolate Room,<br />
          Vijay Cross Roads, Navrangpura,<br />
          Ahmedabad, Gujarat 380009<br />
          <br />
          <strong>Office Timings:</strong> 11AM to 8PM<br />
          <strong>Phone:</strong> +91 9099 400 699, +91 9913 800 699<br />
          <em>Contact for Rajkot, Baroda, Surat Office ➜</em>
        </p>
      </div>
    </div>

    <hr className="border-secondary" />
    <div className="text-center" style={{ fontSize: '0.85rem' }}>
      © 2013-2025 SoulTrekker • <Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link> • <Link to="/terms" className="text-light text-decoration-none">Terms and Conditions</Link>
    </div>
  </div>
</footer>



    </div>
  );
}
function ScheduleCard({ day, title, shortDesc, fullDesc }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        marginBottom: '30px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      
      <div style={{ padding: '15px' }}>
        <h5 style={{ color: '#d35400' }}>
          {day} - <span style={{ color: '#2c3e50' }}>{title}</span>
        </h5>
        <p style={{ marginTop: '5px', color: '#555' }}>
          {expanded ? fullDesc : shortDesc}
        </p>
        <button
          className="btn btn-link p-0"
          style={{ color: '#2980b9', fontWeight: 'bold' }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Know more →'}
        </button>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div
      style={{
        textAlign: 'center',
        minWidth: '150px',
        marginBottom: '10px',
      }}
    >
      <h6 style={{ color: '#e67e22', fontWeight: '600' }}>{label}</h6>
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}

const getTravelDesc = (city) => {
  if (city === 'Kasol') return 'No travel';
  if (city === 'Ahmedabad') return 'Train (3AC / Non-AC)';
  if (city === 'Delhi') return 'AC Volvo Bus';
  if (city === 'Pathankot') return 'Bus';
};

const getCardStyle = (isSelected) => ({
  border: isSelected ? '2px solid #e74c3c' : '1px solid #ccc',
  borderRadius: '10px',
  padding: '15px',
  margin: '10px',
  width: '40%',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
});

export default BungeeJumping;
