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

function HarKiDun() {
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
    if (location === 'Sankri') return 8000;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 14750 : 12750;
    if (location === 'Delhi') return 13000;
    if (location === 'Dehradun') return 10750;
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
          <i>Har Ki Dun Trek</i>
        </h3>
        <h4>Discover the Hidden Beauty of the Western Himalayas</h4>

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
          <InfoBlock label="Duration" value="6 Days / 5 Nights" />
          <InfoBlock label="Difficulty" value="Moderate" />
          <InfoBlock label="Age Group" value="15 to 35 Years" />
          <InfoBlock label="Altitude" value="11,800 ft" />
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
      <p className="text-danger mb-3" style={{ fontSize: '0.9rem' }}>
        *Trek is only available from June to October.
      </p>
      <h5>Select Departure City</h5>
      <div className="d-flex flex-wrap justify-content-around">
        {['Sankri', 'Ahmedabad', 'Delhi'].map((city) => (
          <div
            key={city}
            onClick={() => {
              setSelectedLocation(city);
              if (city === 'Ahmedabad') {
                setStep(2);
              } else {
                const travel =
                  city === 'Haridwar'
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
          <strong>₹14,750</strong>
        </div>
        <div
          onClick={() => {
            setTravelMode('Non-AC');
            setStep(3);
          }}
          style={getCardStyle(travelMode === 'Non-AC')}
        >
          <p>Non-AC</p>
          <strong>₹12,750</strong>
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
          const month = date.getMonth();
          return month >= 5 && month <= 9; // June (5) to October (9)
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
      title="Reporting at Kotgaon Campsite"
      shortDesc="Arrival at Campsite , Brifing & Acclimatization"
      fullDesc="Reporting at Kotgaon Campsite near Sankri.
Briefing and Rentalgear allotment.
Night stay at BaseCamp.
Reporting Time: 05:30 PM
Location: Kotgaon Campsite"
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Trek from Taluka to Gangaad"
      shortDesc="Drive to Taluka from Kotgaon and Trek to Gangaad "
      fullDesc="Morning warm up session and team building activities
After Breakfast than Pack Lunch will be provided.
Drive from kotgaon to Taluka.
Drive Distance: 11-12 kms
Drive Duration: 1.5-2 hours

Start trek to Gangaad from Taluka
Night camping at Gangaad Campsite.
Trek Distance: 8.5 kms
Trek Duration: 5-6 hours
Altitude: 6,400 to 7,667 ft

The trek starts from Taluka and passes through the dense forests of the region, offering beautiful views of the surrounding mountains and valleys. As you trek deeper into the forest, you will come across the streams and waterfalls that flow through the region.

You will also pass through the traditional villages of the area, where you will have the opportunity to interact with the local people and learn about their culture and way of life."
     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Trek from Gangaad to Kalkatiyadhar"
      shortDesc="Night Stay at Kalkatiyadhar Campsite"
      fullDesc="Morning breakfast & warm up
Trek to kalkatiyadhar
Arrival at kalkatiyadhar and refresh-ment
Early dinner and early sleeping
Trek Distance: 7.5 kms
Trek Duration: 5-6 hours
Altitude: 7,667 ft to 9,960 ft

In comparison to other parts of the trail, the route from Gangaad to Kalkatiyadhar is comparatively more rockier. There are sections of the trail that are covered in large boulders, and it is simple to sprain your ankle in these areas. The trick is to descend by softly stepping on each foot to lessen the stress on your knees and advance by using the edge of the pebbles as a foothold. You will eventually arrive at the Kalkatiyadhar campground, which offers views of the Har ki Dun and Ruinsara valleys, the Hatta peaks, and the Black peak, after a few turns and a bridge."
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Trek to Har ki Dun"
      shortDesc="Summit & Trek back to Kalkatiyadhar "
      fullDesc="Early morning Breakfast
Start Trek towards Har Ki Dun
Reaching summit & Group photo with TriColour
Return trek to Kalkatiyadhar Campsite
Night stay at Kalkatiyadhar campsite.
Trek Distance: 10 kms
Trek Duration: 6-7 hours
Altitude: 9,960 ft to 10,800 ft"
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Trek Back to Gangaad"
      shortDesc="Night stay at Gangaad Campsite"
      fullDesc="Morning warm up session & Breakfast
Start trek to Gangaad from Kalkatiyadhar.
Night camping at Gangaad Campsite.
Trek Distance: 7.5 kms
Trek Duration: 6-7 hours
Altitude: 9,960 ft to 7,667 ft"
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Trek Back to Taluka & Drive Back to Kotgaon"
      shortDesc="Drive Back to Kotgaon & Disperse "
      fullDesc="Morning Breakfast & Activities
Start trek to Taluka from Gangaad
Drive from Taluka to Kotgaon
Disperse
Trek Distance: 8.5 kms
Trek Duration: 5-6 hours
Altitude: 7,667 ft to 6,400 ft"
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

export default HarKiDun;
