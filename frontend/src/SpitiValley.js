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

function SpitiValley() {
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
    if (location === 'Manali') return 10000;
    if (location === 'Ahmedabad') return mode === '3-Tier AC' ? 20000 : 18000;
    if (location === 'Delhi') return 14000;
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
          <i>Excursion to Spiti Valley</i>
        </h3>
        <h4>Memories of the Middle Land</h4>

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
          <InfoBlock label="Duration" value="12 Days / 11 Nights" />
          <InfoBlock label="Difficulty" value="Easy to Moderate" />
          <InfoBlock label="Age Group" value="12 to 35 Years" />
          <InfoBlock label="Altitude" value="15,020 ft" />
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
          <strong>₹20,000</strong>
        </div>
        <div
          onClick={() => {
            setTravelMode('Non-AC');
            setStep(3);
          }}
          style={getCardStyle(travelMode === 'Non-AC')}
        >
          <p>Non-AC</p>
          <strong>₹18,000</strong>
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
      title="Departure from Ahmedabad"
      shortDesc="Start your Journey from Ahmedabad"
      fullDesc="Departure from Ahmedabad is scheduled from Gandhinagar Capital in Daulatpur Express. It takes almost 22 hours to reach Chandigarh station.

Train Name: Daulatpur Express (19411)
Departure Time: 09:45 AM
Reporting Time: 08:45 AM
Reporting Place: Gandhinagar Capital Railway Station

The tickets will be shared on your Dashboard in Website before 3 hours of Departure. The contact details of the person & all other necessary information will be shared with you through an SMS/Call before a day of Departure.

The day will be memorable for you as you will spend the day and night on the same train. You can bring books to read or cards or any other games to pass the time. You can also play dumb charades or Antakshari!!
We will be providing you food after you reach the Shimla Hotel. So please try to bring food for this day or you can order
Food at the Abu Road Station and Jodhpur Junction is quite good. You can taste Rabdi at the Abu road and eat Pudi Sabji/Veg Biryani at Jodhpur. You can order food online using the IRCTC APP and your PNR no (displayed on your ticket)"
     // image={day1}
    />
    <ScheduleCard
      day="Day 2"
      title="Arrival at Chandigarh & Depart for Shimla"
      shortDesc="Night Stay at Shimla"
      fullDesc="Arrival at Chandigarh, the capital city of both Punjab and Haryana.
Chandigarh is known for its well-planned architecture and green spaces, with the famous Rock Garden and Sukhna Lake being two prominent attractions.
For Chandigarh to Chandigarh Package:
Reporting Time: 07:30 AM
Reporting Place: Chandigarh Railway Station Parking

After reaching, you’ll start your scenic road journey to Shimla, a charming town in Himachal Pradesh.
Travel Distance: 113 KMs
Travel Duration: Approx 3-4 hours

Check in to your hotel and relax in the afternoon.

In the evening, go for a walk in Mall Road and enjoy the stunning views of the Himalayas."
     // image={day2}
    />
    <ScheduleCard
      day="Day 3"
      title="Drive to Narkanda via Kufri"
      shortDesc="Shimla Sightseeing till Afternoon"
      fullDesc="Start your day by visiting the Jakhu Temple, located atop Jakhu Hill. This iconic temple is dedicated to Lord Hanuman and offers breathtaking views of Shimla and the surrounding mountains.

Begin your road journey from Shimla to Narkanda, passing through the picturesque hill station of Kufri, known for its adventure activities, panoramic views, and lush green surroundings.

En Route Attractions in Kufri

Visit the Kufri Fun World, offering activities like zip-lining, go-karting, and horse riding.
Stop by the Green Valley, a stunning viewpoint perfect for photography.
In Evening, take a leisurely walk through the apple orchards or explore the local market for some souvenirs at Narkanda."
      //image={day3}
    />
     <ScheduleCard
      day="Day 4"
      title="Towards Chitkul via Sangla"
      shortDesc="Night Stay at Chitkul "
      fullDesc="Towards Chitkul via Sangla
Start your journey early from Narkanda, driving through scenic mountain roads lined with pine forests and apple orchards. Your first stop can be Rampur, a small town along the Satluj River, where you can enjoy breakfast and admire the tranquil river views.

Rampur: A serene town by the Satluj River, perfect for a quick breakfast stop.

As you continue, take a short detour to Sarahan, home to the Bhimakali Temple. This wooden temple is an architectural gem with intricate carvings and offers panoramic views of the mountains.

Bhimakali Temple, Sarahan: A stunning wooden temple with breathtaking Himalayan views.
Driving further into the Kinnaur region, you’ll pass through Sangla, a charming valley known for its terraced fields and traditional wooden houses. The road offers mesmerizing views of the Baspa River.

Sangla Valley: A picturesque valley with terraced fields and scenic landscapes.

Upon reaching Chitkul, the last inhabited village near the Indo-Tibetan border, immerse yourself in its untouched beauty. Stroll through the village, visit the sacred Mathi Temple, and walk along the Baspa River for serene views.

Chitkul Village: The last inhabited village near the Indo-Tibetan border, known for its tranquil atmosphere.
Mathi Temple: A sacred temple dedicated to the local goddess, located in Chitkul.
Baspa River: A peaceful river offering stunning views and a perfect spot for a relaxing walk.

End your day by exploring Chitkul or relaxing at a local café before deciding to return to Sangla or stay overnight to enjoy the peaceful mountain environment."
     // image={day1}
    />
     <ScheduleCard
      day="Day 5"
      title="Depart for Tabo/Nako"
      shortDesc="Visit Kinnaur Gate, Nako & Khab Bridge "
      fullDesc="Begin your journey early from Chitkul, driving through the beautiful Baspa Valley as you make your way toward Tabo. The route is filled with stunning landscapes, rugged mountains, and serene rivers, offering numerous opportunities to pause and soak in the Himalayan beauty.

Drive past Sangla and head toward Kalpa, a picturesque village offering panoramic views of the Kinnaur Kailash range. Take a short break here to visit the ancient Narayan-Nagini Temple and enjoy the serene surroundings.

Kalpa: A scenic village with breathtaking views of the Kinnaur Kailash range and the Narayan-Nagini Temple.

Continue your journey toward Nako, a quaint village nestled in the Spiti Valley. Here, visit the serene Nako Lake and the ancient Nako Monastery, both of which offer a peaceful ambiance and an insight into the region’s Buddhist heritage.

Nako Lake: A tranquil lake surrounded by mountains, perfect for a peaceful stop.
Nako Monastery: A historic monastery reflecting the spiritual and cultural richness of the region.

As you proceed further, the terrain becomes more rugged and dramatic, offering mesmerizing views of barren mountains and deep gorges. Arrive in Tabo by late afternoon, where you can explore the iconic Tabo Monastery, often referred to as the “Ajanta of the Himalayas” for its stunning ancient murals and intricate artwork.

Tabo Monastery: A UNESCO World Heritage site, known for its ancient murals and rich cultural history.

End your day in Tabo/Nako by relaxing and enjoying the serene environment of this historic village nestled in the heart of the Spiti Valley."
     // image={day1}
    />
     <ScheduleCard
      day="Day 6"
      title="Day for Dhankar & Kaza Visit"
      shortDesc="Visit Dhankar Lake, Monastery & Kaza Market"
      fullDesc="Start your day early from Tabo, heading toward Kaza, and enjoy the stunning drive through the Spiti Valley, with its rugged landscapes and dramatic mountain views.

Your first stop is Dhankar Monastery, located high on a cliff, offering breathtaking views of the Spiti River and surrounding mountains. This ancient monastery, over 1,000 years old, is a significant site for Buddhist monks. The monastery is known for its unique architecture, with its buildings built into the side of the mountain, and its serene atmosphere. You can explore the monastery complex, which includes prayer halls and stupas, while taking in the scenic beauty around.

Dhankar Monastery: A 1,000-year-old monastery perched on a cliff, offering panoramic views of the Spiti River and valley. The unique architecture and spiritual ambiance make it a must-visit.

Afterward, continue your drive to Kaza, the largest town in Spiti Valley. Upon reaching Kaza, explore the local market, where you can find woolen clothes, handmade crafts, and other local products that reflect the culture of the region. It’s a perfect spot to experience the local way of life and pick up souvenirs.

Kaza Market: A lively market offering local handicrafts, woolens, and souvenirs, perfect for experiencing the culture of Spiti.

End your day in Kaza, enjoying the peaceful atmosphere of this remote town, surrounded by stunning mountains and the charm of the Spiti Valley."
     // image={day1}
    />
     <ScheduleCard
      day="Day 7"
      title="Visit Koumik village, Langza, Hikkim & Key monastery"
      shortDesc="Day for Local Sightseeing "
      fullDesc="Start your day with a scenic drive from Kaza towards some of the highest villages in the world—Komic Village. Situated at an altitude of 4,513 meters, Komic is the highest motorable village in the world. It offers panoramic views of snow-capped peaks, rugged valleys, and expansive landscapes. The village has a peaceful and remote atmosphere, with traditional mud-brick houses and narrow lanes. It’s a great spot to experience the isolation and charm of the Spiti Valley.

Komic Village: At 4,513 meters, Komic is the highest motorable village in the world, known for its stunning views of snow-capped peaks, traditional mud-brick houses, and tranquil atmosphere.

Continue your journey to Langza, a charming village known for its incredible landscape and rich fossil history. The village is home to a large Buddha statue, which sits atop a hill, overlooking the entire village and valley. This statue provides a peaceful and spiritual presence, while the surrounding area offers a rich source of ancient fossils, including ammonites and marine fossils, due to the region’s geological past. Langza is also a great spot for photography, with the magnificent views of the mountains in the backdrop.

Langza: Known for its large Buddha statue, Langza is a picturesque village surrounded by fossil-rich mountains. It offers panoramic views of Spiti Valley and is a hub for fossil hunting, where visitors can explore ancient fossils scattered across the landscape.

Next, head to Hikkim, a small village renowned for hosting the world’s highest post office at an altitude of 4,400 meters. Hikkim offers a quiet and serene experience, with wide open spaces and striking views of the surrounding valleys. It’s a unique stop where you can send a postcard from the highest post office in the world, and marvel at the contrast of its remote location against the busy world beyond.

Hikkim: Famous for the world’s highest post office, Hikkim is a peaceful village offering wide-open spaces, dramatic views, and a rare opportunity to send postcards from one of the most isolated spots on earth.

Finally, conclude your day at Key Monastery, one of the most important and picturesque monasteries in Spiti. Perched on a hilltop at an altitude of 4,166 meters, Key Monastery offers breathtaking views of the valley below. The monastery is a hub for learning and meditation, with a rich history that dates back over 1,000 years. Inside, you’ll find ancient murals, intricate sculptures, and vibrant prayer halls that reflect the spiritual life of the region. The surrounding landscape adds to the serene and spiritual ambiance of the place.

Key Monastery: An ancient hilltop monastery at 4,166 meters, known for its stunning views of the valley, rich murals, and vibrant prayer halls. It’s a center for Buddhist learning and meditation, offering a tranquil and spiritual experience amidst the beautiful Spiti Valley.

After visiting Key Monastery, return to Kaza in the evening for your night’s stay. Relax and reflect on the beauty and tranquility of the Spiti Valley before resting for the night in this charming town."
     // image={day1}
    />
     <ScheduleCard
      day="Day 8"
      title="Visit Chandra Taal"
      shortDesc="Night Stay at Chandra Taal "
      fullDesc="Start your day early with a scenic drive from Kaza to Chandra Taal, a stunning high-altitude lake at 4,300 meters. The journey offers breathtaking views of the Spiti Valley, remote villages, and the surrounding Himalayan mountains. As you approach, the landscape becomes even more dramatic.

Chandra Taal Lake: Known as “Moon Lake” for its crescent shape, Chandra Taal is surrounded by barren mountains and lush meadows. The lake’s blue waters reflect the peaks, creating a peaceful, surreal atmosphere.

Upon arrival, take time to explore the lake and enjoy the serene surroundings. You can walk around the lake, take in the views, and click photos. Afterward, head to the nearby campsite for an unforgettable night under the stars.

Night Stay at Camp: Experience camping near Chandra Taal, surrounded by mountains and a shimmering lake, offering a serene and peaceful night under the stars.

End your day in this remote, breathtaking location, creating lasting memories of Chandra Taal’s beauty."
     // image={day1}
    />
     <ScheduleCard
      day="Day 9"
      title="Drive towards Manali via Atal Tunnel"
      shortDesc="Night Stay at SoulTrekker Manali BaseCamp "
      fullDesc="Start your day early and drive towards Naggar in Manali, taking the scenic route via the Atal Tunnel. The drive will take you through stunning landscapes, including towering mountains, lush valleys, and winding roads. As you approach the Atal Tunnel, you’ll be amazed by the engineering marvel that allows you to bypass the Rohtang Pass and its traffic.

Atal Tunnel: A 9.02 km tunnel beneath the Rohtang Pass, it’s the longest highway tunnel in India. The tunnel connects the Solang Valley to the Lahul-Spiti Valley, offering a smooth and scenic journey through the mountains.

After passing through the tunnel, continue your drive towards Naggar, a charming town near Manali. Naggar is known for its scenic beauty, historic castles, and temples, offering a quiet and peaceful escape from the hustle and bustle of Manali.

Naggar: A picturesque town known for its historic Naggar Castle, beautiful temples, and panoramic views of the Himalayas. It’s a perfect spot for a peaceful retreat.

Upon reaching Naggar, you can explore the local attractions or simply relax and enjoy the serene surroundings before settling in for the night."
     // image={day1}
    />
     <ScheduleCard
      day="Day 10"
      title="Day for Manali Sightseeing"
      shortDesc="Departure for Chandigarh/Delhi in the evening"
      fullDesc="This day is kept free for participants to have a spending time at seeing the most amazing attractions of the town.

This day is a cluster of various activities like paragliding, river rafting and Manali sightseeing. The day ends at Manali campsite following the dinner. It is recommended to all the participants to have an experience of adventurous activities. If not, there are many other options to spend at Manali while wandering through the local market, temples, waterfalls and much more.

Start your day early with an exciting paragliding session at Dobhi, a popular spot just outside Manali. Experience the thrill of flying over the lush valleys and snow-capped peaks, offering you an unforgettable bird’s-eye view of the beautiful landscape.

Paragliding in Dobhi: Soar high in the sky for a thrilling experience while enjoying panoramic views of the Manali valley, rivers, and surrounding mountains.

After your adventurous morning, head towards Manali to begin your sightseeing.

Places to Visit:

Hadimba Temple: A wooden temple in a cedar forest, dedicated to Goddess Hadimba, offering serenity and stunning natural surroundings.
Manu Temple: A peaceful temple dedicated to Sage Manu, surrounded by beautiful views of the mountains.
Vashisht Hot Springs: Natural hot springs offering relaxation and rejuvenation, located in the serene Vashisht village.
Mall Road: A bustling street in the center of Manali, filled with shops, cafes, and markets—perfect for shopping and experiencing the local culture.
There will be an overnight journey to reach Chandigarh/Delhi the next morning.

Water & Aero Sports will Remain Banned in Himachal Pradesh from July 15 to September 15, as Monsoon Rains & Swelling Rivers make the Adventure Sports Risky."
     // image={day1}
    />
     <ScheduleCard
      day="Day 11"
      title="Return Train Journey towards Ahmedabad"
      shortDesc="Free Time for Chandigarh Sightseeing "
      fullDesc="You will reach Chandigarh and free to explore the city at your own. You can use the restroom available at Station to keep your luggage. Prefer local transport to visit the nearby attractions:

Rock Garden: A one-of-a-kind garden made from recycled materials, showcasing creative sculptures and installations.
Sukhna Lake: A serene lake offering boating opportunities and a peaceful environment with views of the nearby hills.
Zakir Hussain Rose Garden: A vibrant rose garden with a wide variety of flowers, perfect for a relaxing stroll.
Elante Mall: A large mall with various shops, cafes, and eateries—perfect for some shopping and relaxing.
Chandigarh Haat: A local market offering handmade crafts and souvenirs, perfect for shopping and experiencing the city’s culture.

Train name: Daulatpur Chandigarh Express (19412)
Departure time: 05:55 PM
Departure place: Chandigarh Junction

The camp disperse for hometown."
     // image={day1}
    />
     <ScheduleCard
      day="Day 12"
      title="Arrival at Ahmedabad"
      shortDesc="End of the Expedition "
      fullDesc="Arrive Gandhinagar Capital Junction by 03:00 PM!

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

export default SpitiValley;
