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

function ExploreHimalaya() {
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
    if (location === 'Manali') return 12000;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 16500 : 14200;
    if (location === 'Delhi') return 16000;
    if (location === 'Pathankot') return 13000;
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
          <i>Explore Himalayas </i>
        </h3>
        <h4>Exploring The Untouched Beauty Of Himalayas</h4>

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
          <InfoBlock label="Duration" value="7 Days / 8 Nights" />
          <InfoBlock label="Difficulty" value="Easy to Moderate" />
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
      <p className="text-danger mb-3" style={{ fontSize: '0.9rem' }}>
        *Trek is only available from June to September.
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
                  city === 'Manali'
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
          <strong>₹16,500</strong>
        </div>
        <div
          onClick={() => {
            setTravelMode('Non-AC');
            setStep(3);
          }}
          style={getCardStyle(travelMode === 'Non-AC')}
        >
          <p>Non-AC</p>
          <strong>₹14,200</strong>
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
          return month >= 5 && month <= 8;
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
      title="Day for Dalhousie Sightseeing"
      shortDesc="Visit Dalhousie Town & Night Stay at Kalatop"
      fullDesc="The team will be headed to nearby attractions Gandhi chowk, Dalhousie market, St. Francis Catholic Church, Panchpula, chamera lake, rock garden and many more. There are local vehicles that charging some fees provides you maximum places for sightseeing.

After that there will be a drive to Kalatop campsite. The majestic views of the mountain makes the drive motivating and easier to cover. There comes one maggie point where the participants get a halt to enjoy tea and maggi.



Kalatop Advance base camp is managed by the locals and is situated providing the views of the greatest peaks of Dalhousie. The campsite also offers adventure activities which can be enjoyed by the participants during the evening. Dinner will be provided at the campsite.

"
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Visit Daikund Peak & Khajjiar"
      shortDesc="Adventure Activities & Depart for Manali"
      fullDesc="The team after having breakfast gets set for the highest peak of Dalhousie camp. The drive covers the valley line and looks at the snow-clad mountains. Dainkund peak is a spectator to many more famous peaks of Himalayan ranges. The 360 degree panoramic views of the mountains is incredible.



After summiting the peak, the team has a photography session with the tricolour flag. From here the team leads to Khajjiar. The participants are driven to the famous spot of Dalhousie Khajjiar which is also known as mini Switzerland of India.



The Khajjiar ground is full of lush green floras and many adventure activities. The place also has food stalls to have lunch. After spending the whole day in Khajjiar, the team gets ready to depart for Manali in the late evening. This will be an overnight journey to reach Manali.

"     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Arrival at Manali Campsite"
      shortDesc="Day for Acclimatisation & Prepartion "
      fullDesc="Arrival at Manali Campsite
SoulTrekker Manali campsite is located at Ghud Daur Village, Near Naggar Town (Former capital of Manali)

Arrival at Manali Campsite: 08:00 AM

You will arrive at the SoulTrekker’s Basecamp in the morning.

The Campsite Manager will meet you for a briefing after Breakfast. He will introduce you with the team members, guides and volunteers. The day is planned for acclimatisation and settling up. You will enjoy a lot of team building games and activities with our senior instructors.

The Camp Leader and Senior Guide will brief you about the packing for the upcoming days and you will be asked to deposit the remaining luggage to a room.

Sleep well as the previous night was on road, and to have full energy for the first day of the trek."
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Trekking towards Advanced Base Camp"
      shortDesc="Travel to Gulaba & Trek to Raoli Kholi Camp"
      fullDesc="After breakfast, the team drives approximately 3 hours towards Gulaba and heads to Raoli Kholi where advanced base camp has been located.


Trek time: 4 to 5 hours
Drive time: Around 3 hours to Gulaba

Your night stay will be at Raoli Kholi Advanced Base Camp.

Important Note:
During March & April Month, Trekking route will be Rani Sui Lake"
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Trek to Bhrigu Lake, Visit & Back"
      shortDesc="Night Halt at Raoli Kholi ABC"
      fullDesc="Summit point is at Brighu Lake, located at approximately 14000 feet above the sea level. The trek takes almost 3 to 4 hours to reach to an ultimately beautiful location."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Return Trek to Gulaba & River Rafting"
      shortDesc="Travel Back to Manali & River Rafting"
      fullDesc="At this day, the team leads back to Gulaba by early morning trek. Participants have their pack lunch at Gulaba.

Trek time: around 4 to 5 hours

From here the team goes for an exciting sport River Rafting. After an amazing experience, return to campsite and have a night stay at the campsite.

Note: Adventure Activities & Water Sports will be closed during 15 July to 15 September in Himachal Pradesh."
     // image={day1}
    />
    <ScheduleCard
      day="Day 7"
      title="Day for Manali Sightseeing & Paragliding"
      shortDesc="Travel Back to Manali & River Rafting"
      fullDesc="At this day, the team leads back to Gulaba by early morning trek. Participants have their pack lunch at Gulaba.



Trek time: around 4 to 5 hours

From here the team goes for an exciting sport River Rafting. After an amazing experience, return to campsite and have a night stay at the campsite.

Note: Adventure Activities & Water Sports will be closed during 15 July to 15 September in Himachal Pradesh."
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

export default ExploreHimalaya;
