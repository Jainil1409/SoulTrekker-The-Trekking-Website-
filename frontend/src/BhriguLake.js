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

import q1 from './k1.jpg';
import q2 from './k2.jpg';
import q3 from './k3.jpg';

function BhriguLake() {
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
    if (location === 'Manali') return 5600;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 15500 : 13000;
    if (location === 'Delhi') return 10000;
   
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
              src={q1}
              alt="First slide"
              style={{ height: '75vh', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={q2}
              alt="Second slide"
              style={{ height: '75vh', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={q3}
              alt="Third slide"
              style={{ height: '75vh', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="my-5">
        <h3 style={{ color: 'orange' }}>
          <i>Bhrigu Lake Trek</i>
        </h3>
        <h4>Lost Yourself In The God's Own Valley</h4>

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
          <InfoBlock label="Duration" value="4 days / 3 nights" />
          <InfoBlock label="Difficulty" value="Moderate" />
          <InfoBlock label="Age Group" value="12 to 35 Years" />
          <InfoBlock label="Altitude" value="14,100 ft" />
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
          <Modal.Title>Book Your Trek</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    {step === 1 && (
      <>
        <h6 className="text-danger mb-3">
          Available trek months: May, June, August to October
        </h6>
        <h5>Select Departure City</h5>
        <div className="d-flex flex-wrap justify-content-around">
          {['Manali', 'Ahmedabad', 'Delhi'].map((city) => (
            <div
              key={city}
              onClick={() => {
                setSelectedLocation(city);
                if (city === 'Ahmedabad') {
                  setStep(2);
                } else {
                  const travel =
                    city === 'Kasol'
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
          filterDate={(date) => {
            const month = date.getMonth(); // 0-indexed: Jan=0, May=4, Jun=5, Jul=6, Aug=7...
            return (
              (month === 4 || month === 5 || month === 7 || month === 8 || month === 9)
            );
          }}
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
      title="Arrival at SoulTrekker Campsite"
      shortDesc="Arriving at Manali campsite and free day for acclimatization and sightseeing"
      fullDesc="SoulTrekker campsite is located at Naggar Village which is known as former capital of Manali. Day 1 is free for sightseeing of the town, a little trek to nearby stream, team games and acclimatization to adapt to weather. There are many attractions to cite in the down."
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Trek to Raoli Kholi Advanced Base Camp"
      shortDesc="Trek to Raoli Kholi Advanced Base Camp"
      fullDesc="After breakfast, the team drives approximately 3 hours to Gulaba and heads to Raoli Kholi where advanced base camp has been located. The trek lasts for almost 3 to 4 hours. There is a night stay in Raokholi Base camp."// image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Trek to Bhrigu Lake"
      shortDesc="Trek to Bhrigu Lake"
      fullDesc="Day 3 is the day for summit. Summit point is at Brighu located at approximately 9000 feet above the sea level. The trek takes almost 4 to 5 hours to reach to an ultimately beautiful location. After flag wavering, the team heads back to Raokholi and spends a night there."     //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Return trek to Gulaba"
      shortDesc="Return trek to Gulaba"
      fullDesc="At this day, the team leads back to Gulaba by early morning trek. Participants have their pack lunch at Gulaba. Frome here the team goes for an exciting sport River Rafting. After an amazing experience, return to campsite and have a night hold at the campsite."
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
function ScheduleCard({ day, title, shortDesc, fullDesc}) {
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

export default BhriguLake;
