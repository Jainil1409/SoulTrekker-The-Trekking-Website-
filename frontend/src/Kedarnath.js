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

function Kedarnath() {
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
    if (location === 'Haridwar') return 9999;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 15500 : 13000;
    if (location === 'Delhi') return 11800;
    if (location === 'Pathankot') return 12000;
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
          <i>Kasol Sar Pass Trek</i>
        </h3>
        <h4>Experience the most glamorous trek of the Himalayas!</h4>

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
          <InfoBlock label="Altitude" value="12,073 ft" />
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
        {['Haridwar', 'Ahmedabad', 'Delhi', 'Pathankot'].map((city) => (
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
      title="Departing from Haridwar/Rishikesh to Rampur"
      shortDesc="Night stay will be at Rampur Know more "
      fullDesc="Departure Time: 05:00 AM
Reporting Time: 04:45 AM
Reporting Place: Chandi Chowk, Haridwar

Early morning, the camp will depart from Haridwar stay and will spend the whole day journey to reach Rampur. Meanwhile the journey, you will get a chance to experience the beautiful Panchprayags. We will witness the famous Triveni Sangam, which is a confluence of three rivers namely Kaveri, Bhavani and Amudha. Amudha is invisible and believed to have flowed underground to reach the other two.

Srinagar also is witnessed during the route. Srinagar is the largest town in the Garhwal Himalayas. Situated on the bank of river Alakhnanda, the town has marked its place as the most beautiful town of the Himalayas.

Night will be stayed at Rampur. For rejuvenating and having the stock of energy to accomplish the next day trek, the night falls early for the participants. It is advised to take proper rest to prepare oneself for the next day trek."
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Trek to Kedarnath"
      shortDesc="Night stay at Kedarnath BaseCamp "
      fullDesc="Gaurikund is located 8 km far from the Rampur. We will travel from Rampur to Sonprayag by trek and then Sonprayag to Gaurikund by local taxi. Gurikund is starting point of the trek.

Trek distance: 17 km
Trek time: 8 to 10 hours

During the trek, we get many majestic views of the valley and incredible beauty of Uttarakhand. Everything could be captured raw here, the sky, the valley, the river and many more. After sucessfully reaching, rest of the evening is spent at the Kedarnath Temple

The camp stays at Kedarnath BaseCamp for a night stay and ends it with dinner.

Note:

If our vehicles will not be allowed to go beyond Rampur/Sonprayag then we will start trek from Rampur/Sonprayag. During Peak Season they may not allowed personal Vehicles."     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Temple Visit & Return Journey"
      shortDesc="Trek back to Gaurikund & Night stay at Sitapur"
      fullDesc="Early Morning is heartly devoted to Morning Prayers. The power of the aura created during that time is worth spending. The Temple Aarti at Kedarnath is well recommended to attain. It is a never missing thing to do while spending time.
After spending time at Kedarnath Temple, we will start trekking back to Gaurikund. It takes almost 6-7 hours to reach at Roadhead. After reaching Gaurikund we will travel back to Sitapur.

Then we will travel to Chopta. It will take 2.5-3 hours to reach Chopta. The Night stay will be at Sitapur"
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Trek to Tungnath & Return"
      shortDesc="Night Stay at Chopta"
      fullDesc="We will start trek toward Tungnath Temple in the Early Morning.

Tungnath is the hightest temple of Loard Shiva. Tungnath is the highest of the five Panch Kedar temples located in the Rudraprayag district, in Uttarakhand. It is located at an altitude of 3,680 m (12,073 ft).

After visiting the Tungnath Temple we will return back to Chopta. Night stay will be at Chopta.


"
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Journey back to Haridwar"
      shortDesc="Day for Return Journey "
      fullDesc="The whole day is spent driving back to Haridwar.

The night stay will be in Hardiwar Hotel."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Rishikesh Sightseeing & Return Journey"
      shortDesc="
Morning at Rishikesh for Adventure Activities & Sightseeing "
      fullDesc="For Option: 1
Rishikesh Sightseeing & Adventure Activities
Afternoon Depart for Hometown
Overnight Train Journey
Major Attractions in Rishikesh (22 Kms from Haridwar)

Laxman Jhula
Ram Jhula
River Rafting
Bungee Jumping (Advance Booking is mandatory on jumpingheights.com)
The Train will depart from Haridwar to Ahmedabad.

Train Name: Rishikesh-Ahmedabad Yoga Express (19032)
Departure Time: 04:00 PM
Reporting Time: 03:00 PM
Reporting Place: Haridwar Junction

For Option: 2
The Train will depart from Haridwar to New Delhi.

Train Name: NDLS JANSHTABDI (12056)
Departure Time: 06:30 AM
Reporting Time: 06:00 AM
Reporting Place: Haridwar Junction
Arrival at New Delhi: 11:05 AM

After Arrival at New Delhi Railway Station, you have to reach Old Delhi Junction by 02:30 PM. The train will depart from Old Delhi Junction.

Train Name: Delhi-Ahmedabad Ashram Express (12916)
Departure Time: 03:20 PM
Reporting Time: 02:30 PM
Reporting Place: Delhi Railway Station

Note: Participnats have to go from Hotel to Railway Station on there own."
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

export default Kedarnath;
