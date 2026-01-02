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

function HamtaPass() {
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
    if (location === 'Manali') return 8000;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 16000 : 13750;
    if (location === 'Delhi') return 14500;
    if (location === 'Pathankot') return 12500;
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
          <i>Hampta Pass Trek</i>
        </h3>
        <h4>Treating The Eyes With Serene View Of Snow</h4>
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
          <InfoBlock label="Difficulty" value="Easy to Moderate" />
          <InfoBlock label="Age Group" value="16 to 35 Years" />
          <InfoBlock label="Altitude" value="14,011 ft" />
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
        *Trek is only available from May to September.
      </p>
      <h5>Select Departure City</h5>
      <div className="d-flex flex-wrap justify-content-around">
        {['Manali', 'Ahmedabad', 'Delhi', 'Pathankot'].map((city) => (
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
          <strong>₹16,000</strong>
        </div>
        <div
          onClick={() => {
            setTravelMode('Non-AC');
            setStep(3);
          }}
          style={getCardStyle(travelMode === 'Non-AC')}
        >
          <p>Non-AC</p>
          <strong>₹13,750</strong>
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
          return month >= 4 && month <= 8; 
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
      title="Reporting at Manali Campsite"
      shortDesc="Day for acclimatization & preparation"
      fullDesc="Reporting at Manali Campsite
SoulTrekker Manali Campsite is located at Ghud Daur Village, Near Naggar Town (Former capital of Manali)

Reporting at Manali Campsite: 09:00 AM

After reporting at Campsite, the Campsite Manager will meet you for a briefing after Breakfast. He will introduce you with the team members & instructors. The day is planned for acclimatisation and settling up. You will enjoy a lot of team building games and activities with our senior instructors.



The Camp Leader and Senior Guide will brief you about the packing for the upcoming days and you will be asked to deposit the remaining luggage to a room.

Sleep well as the previous night was on road, and to have full energy for the first day of the trek."
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Trek from Jobri to Chikka"
      shortDesc="Drive to Jobri & night stay at Chikka"
      fullDesc="Jobri is located at an altitude of 9800 feet above sea level. There is a 2 hours drive from Campsite to Jobri. The team then leads to the higher altitude campsite at Chikka.

Chikka campsite is located at an altitude of 10000 feet. The trek constitutes an easy to moderate level of trek. It would take almost 3 hours to reach the campsite by elevating. The trail goes around the banks of river Hampta. There are many waterfalls to encounter in the middle of the trek. During summers the place gets crowded by a number of shepherds.

We reach the campsite at noon. Lunch and dinner are provided at the campsite. The rest of the day is set free to interact with other participants. Night will be stayed at Chikka."
     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Trek to Balu ka Ghera"
      shortDesc="Night stay at Balu ka Ghera"
      fullDesc="Trek to Balu ka Ghera
After breakfast the team gets lined up for the trek to Balu ka Ghera. The trek is a moderate level of trek and it ascends from the altitude of 10000 feet to 12000 feet. The trek is 8.5 kms and will take almost 6 hours to complete.

The trail consists of majestic views of rivers, valleys and Pir Panjal mountain ranges. The trail takes us from a boulder walk. That is the most fascinating thing about the trek.

The participants enjoy their pack lunch at a spot in the middle of the trek. The rest of the day is spent on the trek. Dinner will be served at night."
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Trek to Shea Goru"
      shortDesc="Crossing Hampta Pass third Day"
      fullDesc="This is the most coolest place of the trek. The trek starts from Balu ka Ghera and takes almost 8 hours to complete the trek. The trek first ascends from 12000 feet to 14000 feet and then it descends to 12000 while crossing the Hampta Pass. Hampta is a beautiful pass located in kullu district of Himachal Pradesh.

Lunch will be done in the middle of the trek. The trail may include traces of snow but it will surely include majestic views of snow clad mountains. You will also spot Spiti from this point. In an hour and a half you will reach the base of the valley that will lead you to Shea Goru."
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Trek to Chhatru & Visit Chandra Taal"
      shortDesc="Drive back to the Manali Campsite"
      fullDesc="You will cover Shea goru to Chatru by foot and it will take approx 4 hours of easy downhill trek. Shea Goru is placed at an altitude of 12,900ft and Chatru at 11,000ft. It is a gentle trek downhill from Shea Goru. The trail here again is by the side of the river valley between mountain ranges.

Chatru is a small village on the way to Kaza. It serves as a tea/refreshment stop for vehicles going to/ coming from Kaza side in Spiti valley. No vegetations can be seen in the barren mountains.

A camper and trekker’s paradise, Chandratal Lake is often referred to as one of the most beautiful lakes located at an altitude of about 4300 m in the mighty Himalayas. The stunning lake is situated on the Samudra Tapu plateau which overlooks the Chandra River. Despite the rugged and inhospitable surroundings, it is in a protected niche with some flowers and wildlife in summer.

After visiting Chandra Taal, full of mellow reminisces of the hills, we will reach Manali Campsite by 10 PM.

Dinner will be served at the campsite."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Trek to Chhatru & Visit Chandra Taal"
      shortDesc="Drive back to the Manali Campsite"
      fullDesc="You will cover Shea goru to Chatru by foot and it will take approx 4 hours of easy downhill trek. Shea Goru is placed at an altitude of 12,900ft and Chatru at 11,000ft. It is a gentle trek downhill from Shea Goru. The trail here again is by the side of the river valley between mountain ranges.

Chatru is a small village on the way to Kaza. It serves as a tea/refreshment stop for vehicles going to/ coming from Kaza side in Spiti valley. No vegetations can be seen in the barren mountains.

A camper and trekker’s paradise, Chandratal Lake is often referred to as one of the most beautiful lakes located at an altitude of about 4300 m in the mighty Himalayas. The stunning lake is situated on the Samudra Tapu plateau which overlooks the Chandra River. Despite the rugged and inhospitable surroundings, it is in a protected niche with some flowers and wildlife in summer.

After visiting Chandra Taal, full of mellow reminisces of the hills, we will reach Manali Campsite by 10 PM.

Dinner will be served at the campsite."
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

export default HamtaPass;
