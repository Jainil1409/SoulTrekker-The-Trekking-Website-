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

function Zanskar() {
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
    if (location === 'Kasol') return 8000;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 15500 : 13000;
    if (location === 'Delhi') return 10000;
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
          <i>Zanskar</i>
        </h3>
        <h4>Experience the Untouched Beauty of Ladakh!</h4>

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
          <InfoBlock label="Duration" value="10 days / 9 nights" />
          <InfoBlock label="Difficulty" value="Easy" />
          <InfoBlock label="Age Group" value="12 to 35 Years" />
          <InfoBlock label="Altitude" value="16,580 ft" />
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
        {['Ahmedabad', 'Delhi', 'Pathankot'].map((city) => (
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
      title="Departure from Ahmedabad"
      shortDesc="Departure from Ahmedabad"
      fullDesc="Departure from Ahmedabad is scheduled from Sabarmati BG Junction in Ahmedabad Jammu Tawi Express. It takes almost 28 hours to reach Pathankot station.

Train Name: Ahmedabad Jammu Tawi Express (19223)
Departure Time: 11:05 AM
Reporting Time: 10:00 AM
Reporting Place: Sabarmati BG Station (Near Torrent Power, Dharamnagar)

The tickets will be shared on your Dashboard in Website before 3 hours of Departure. The contact details of the person & all other necessary information will be shared with you through an SMS/Call before a day of Departure.

The day will be memorable for you as you will spend the day and night on the same train. You can bring books to read or cards or any other games to pass the time. You can also play dumb charades or Antakshari!!
We will be providing you food after you reach the Basecamp in Manali. So please try to bring food for this day or you can order
Food at the Abu Road Station and Jodhpur Junction is quite good. You can taste Rabdi at the Abu road and eat Pudi Sabji/Veg Biryani at Jodhpur. You can order food online using the IRCTC APP and your PNR no (displayed on your ticket)
"
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Arrival at Pathankot & Depart to Manali"
      shortDesc="Arrival at Pathankot & Depart to Manali"
      fullDesc="The morning will be pleasant and picturesque as you will be in Punjab by then. The endless wheat fields and striking cold will make you feel differently energised.

The train will change the direction at Firozpur Jn and you might reach Pathankot Jn by 3:00 PM if the train is running on time.

Arrival at Pathankot: 03:00 PM
Departure for Manali: 08:00 PM
Arrival at Manali: Around 8:00 AM, on next day

After reaching Pathankot, you will be asked to put your luggage into a tempo traveller and you will get free time to visit the town till 8 PM. Your vehicles will leave from the Pathankot Station Parking at sharp 8:00 PM.

We will travel overnight on the roads towards Manali. The vehicles will take frequent halts during the night for safe and comfortable journey." // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Arrival at Manali Campsite"
      shortDesc="Arrival at Manali Campsite
SoulTrekker Manali campsite is located at Ghud Daur Village, Near Naggar Town (Former capital of Manali)"
      fullDesc="Arrival at Manali Campsite: 08:00 AM

You will arrive at the SoulTrekker’s Basecamp in the morning.

The Campsite Manager will meet you for a briefing. He will introduce you with the team members, guides and volunteers. The day is planned for acclimatisation and settling up. You will enjoy a lot of team building games and activities with our senior instructors.


The Camp Leader and Senior Guide will brief you about the packing for the upcoming days and you will be asked to deposit the remaining luggage to a room.

Sleep well as the previous night was on road, and to have full energy for the first day of the exploration."  //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Depart for Zanskar Valley"
      shortDesc="Participants will start their day early in the morning, traveling towards Zanskar Valley."
      fullDesc="Pass through the Atal Tunnel, the world’s longest single-tube highway tunnel at an altitude above 10,000 ft.

Enjoy the beauty of Lahaul Valley, reach the Shinkula Pass at 16,580 ft, which connects Himachal Pradesh to the Zanskar valley of Ladakh’s Kargil district. Also, witness the most beautiful mountain of the valley – the Gombo Ranjan, considered as auspicious as Mt Kailash.

After crossing multiple hairpin bends and the Kurgiakh River, the road until Chah is greeted with stunning vistas featuring towering peaks, meadows, barren landscapes, and grazing yaks.

Night Stay will be at Purne or Chah village as per weather conditions."
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Visit Phugtal Monastery"
      shortDesc="Visit Phugtal Monastery"
      fullDesc="The day is kept to visit a place nearly 2500 years old, Phugtal Monastery, situated at an altitude of approximately 12,630 ft. We will reach the monastery with a short 2-3 hours hike.

Phugtal Monastic School offers a modern circicullam with traditional teaching of Buddhism and philosophy, making a beautiful fusion.

After a memerizing experience, we will trek back to Chah and travel to Padum. Night Stay will be at Padum village."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Day for Sightseeing at Padum"
      shortDesc="Visit Karsha Monastery and more"
      fullDesc="This day is kept free for participants to have a spending time at seeing the most amazing attractions of the Padum.

Padum is a village in Leh, surrounded by beautiful mountains. It’s a calm place where people live a simple life. The village is known for its peaceful atmosphere and is a good stop for those exploring the scenic Ladakh region. Padum offers a glimpse into the local way of life and is a great place to experience the tranquility of the mountains.

We will visit:
Karsha Monastery: The biggest monastery in Zanskar Valley, a special place for monks and visitors.
Sani Gompa and Lake: A calm scene with a monastery near a peaceful lake, offering a quiet place for thinking.
Dzongkhul Monastery: A special place with cultural importance.
Sheela Village and Waterfall: Charming village with a beautiful waterfall, adding to the region’s beauty.
Zangla Palace: A historic palace contributing to the area’s history and architecture.
Stongdey Monastery: A tall monastery blending spirituality with the beauty of nature in Zanskar Valley.

Night Stay will Padum Village."
     // image={day1}
    />
     <ScheduleCard
      day="Day 7"
      title="Journey Back to Manali"
      shortDesc="Passing through Shinkula Pass"
      fullDesc="After breakfast, the participants will be led back to Manali in travellers through road trip.

While returning, there are many stay to look through varied attractions. Experience the majestic Gombo Ranjan Mountain, Kurgiakh Chu (River), Shinkula Pass, Darcha Bridge, Jispa, Bhaga & Chandra River, Lahaul Valley & Atal Tunnel. Dinner is been served at the Manali campsite.

You will arrive back to Manali Campsite late night."
     // image={day1}
    />
    <ScheduleCard
      day="Day 8"
      title="Manali Visit & Night Travel to Pathankot"
      shortDesc="Day for Paragliding, Rafting & Sightseeing in Manali"
      fullDesc="This day is a cluster of various activities like paragliding, river rafting and Manali sightseeing. The day ends at Manali campsite following the last dinner. It is recommended to all the participants to have an experience of adventurous activities. If not, there are many other options to spend at Manali while wandering through the local market, temples, waterfalls and much more.

Dispersing for Activities: Morning around 8 AM
Departing for Pathankot: Around 9 PM

We will return back to pathankot after having dinner at the campsite. There will be an overnight journey to reach Pathankot the next morning."
     // image={day1}
    />
    <ScheduleCard
      day="Day 9"
      title="Return Journey towards Ahmedabad"
      shortDesc="Overnight Train Journey with Experience Sharing "
      fullDesc="Train Name: Ahmedabad Jammu Tawi Express (09222)
Departure Time: 10:35 AM
Departure Place: Pathankot Junction

Jammu tawi arrives at 10:00 AM and the camp disperse for hometown. The end of the trip is the most hardest thing to welcome after being to Zanskar."
     // image={day1}
    />
    <ScheduleCard
      day="Day 10"
      title="Arrival at Ahmedabad"
      shortDesc="The end of the camp "
      fullDesc="Arrival Time: 01:45 PM
Arrival Place: Sabarmati BG Junction

The camp returns at Ahmedabad taking 27 hours approx. Meanwhile, there are many food savours to taste at different stations as suggested by the Camp Leader. The camp dispersed after arriving at Ahmedabad Junction.

Time to disperse with a lot of memories and lots of photographs."
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

export default Zanskar;
