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

function KasolSarpass() {
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
          <InfoBlock label="Age Group" value="12 to 55 Years" />
          <InfoBlock label="Altitude" value="12,500 ft" />
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
          {['Kasol', 'Ahmedabad', 'Delhi', 'Pathankot'].map((city) => (
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
      title="Reporting at Kasol Campsite"
      shortDesc="Day for acclimatization & preparation"
      fullDesc="Reporting Time: 08:00 AM
Reporting Place: SoulTrekker Kasol BaseCamp

This day is for the participant’s preparation, acclimatization, and team games. After having breakfast, the participants will disperse for a small trek and nearby sightseeing in the beautiful town.



Kasol is known as Mini Israel because a major proportion of people here migrated from Israel. Sar Pass, the name in its dialect means to cross the frozen lake. In all Kasol does leave an impact on minds and souls and rejuvenates and lives the moment fully. The trek is outstanding and almost impossible to say nay when planned. Kasol marks for the best summer exploration.



SoulTrekker have also their own Camper’s Store, where trekkers hire the required Equipment on Rent & Purchase.

"
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Trek to Grahan Village"
      shortDesc="Begin trek to the beautiful Grahan village"
      fullDesc="After adapting at the base camp, we start our first day of trek towards Grahan Village attaining a height of 7700 feet after breakfast. The trek lasts for 4 to 5 hours reaching the base camp before lunch.



Trek time: 4 to 5 hours
Trek distance: 8 kms
Campsite height: 7700 feet

Trek starts from the market of Kasol, crossing the forest along Grahan Nalah. This trail is well made and it is frequently maintained by the villagers. The day is free after the lunch to feel core beauty of the local culture."
     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Trek from Grahan to Min Thach"
      shortDesc="Trek through alpine meadows to Min Thach"
      fullDesc="After enjoying an overnight stay at the village in tents, the next morning is arranged for another trek to Min Thach at an altitude of about 11,150 feet where an Min Thach camp has been set up.

Trek time: 4 to 5 hours
Trek distance: 9 kms

Now, the trail is steep and you have to go through a dark forest. Cross it and the grassland will welcome you which is present on a ridge.


This is Min Thach, you may see some cattle grazing there.

After a long trek of about 4 to 5 hours, hot lunch is served at Campsite."
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Trek from Min Thach to Nagaru"
      shortDesc="Night stay at Nagaru Campsite "
      fullDesc="The trek to Nagaru is important as it has the most arduous Summit point. The trek lasts for 4 to 5 hours to attain a height of 13500 feet, the highest point in the region with the lowest temperature. Start the trek from Min Thach to Nagaru passing through the jungle which takes you to another ridge, from here a blooming meadow can be seen and at the top is the campsite.

Trek time: 5 to 6 hours
Trek distance: 8 kms

The initial trek is well marked, continue trekking and you will see the receding tree line. Some part of the trail gets because of heavy snow which makes the steep slope slippery. After the hard climb reaches Nagaru.

This place offers the mesmerising sight of Chanderkhani, Min Thach, Grahan village, the town of Manikaran, River Beas and Parvati valley. This is the place where the photographers spend hours to shoot some scenic timelapse.



After sunset the weather gets cold and the winds are strong so after setting camps to retire for the night.

"
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Trek from Nagaru to Biskeri Thach"
      shortDesc="Crossing the Frozen Lake Sar Pass "
      fullDesc="After summiting the peak, the trek continues to descend at an altitude to about 10000 feet to Biskeri Thach while crossing the Sarpass. The distance to Sar Pass is long so starting early today, trekking on snow will make the climb challenging. But, the scenic views will not leave your side.
Start the trek towards Biskeri Thach, through a narrow valley. Cross streams on the way and reach the campsite, from here grasslands, pine forests and high mountains are visible.

Cross a steep ascent to reach the top of the hill from where Tosh valley peaks and snow-covered mountains are visible. Just 2 more hours of the hike will lead you to Sar Pass. Again climb a ridge and from there you can see a Trishul with tied flags.

We will have a night hold at Biskeri Thach followed by delicious dinner. You can also have a glance at these villages – Bursheni, Tosh, Nakthan, Pugla and Tugla."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Trek from Biskeri Thach to Bursheni"
      shortDesc="Drive back to Kasol Base Camp & Disperse "
      fullDesc="Early morning trek to Bursheni followed by breakfast back to Kasol Base camp through drive. Hence it is a round trip from Kasol back to Kasol base camp. The descent to Bursheni, the trek is along a stream and then enter a thick forest.

Trek time: 4 to 5 hours
Trek distance: 10 kms

Further is a beautiful grassland with some trees from here, start the steep descent through the forest and reach Pugla. The two twin villages Pugla and Tugla are separated by a stream. Now, from Tugla cross a bridge over Parvati River.
Bursheni is Parvati valley’s last village and a connected road further leads to Kheerganga, Pin Parvati Pass Mantalai Lake and other treks in Tons valley. Now from here get back to Kasol.

This is the end of an amazing expedition.

Sar Pass, the name in its dialect means to cross the frozen lake. In all Kasol does leave an impact on minds and soul and rejuvenates and living the moment fully. The trek is outstanding and almost impossible to say nay when planned. Kasol marks for the best summer exploration."
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

export default KasolSarpass;
