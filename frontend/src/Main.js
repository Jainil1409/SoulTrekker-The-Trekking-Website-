import React from 'react';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import i1 from './a1.jpg';
import i2 from './b1.jpg';
import i3 from './c1.jpg';
import i4 from './d1.jpg';
import i5 from './e1.jpg';
import i6 from './f1.jpg';
//import i7 from './s1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function Main() {
  const imageStyle = {
    width: '100%',
    height: '75vh',
    objectFit: 'cover',
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };

  const brandStyle = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '28px',
    transition: 'color 0.3s ease',
  };

  const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };

  return (
    <div className="container-fluid p-0 position-relative">
      <Navbar expand="lg" style={navbarStyle} variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={brandStyle}>
            SoulTrekker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" style={navLinkStyle}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={navLinkStyle}>About</Nav.Link>
              <Nav.Link href="#contact-section" style={navLinkStyle}>Contact</Nav.Link>
              {/* <Nav.Link as={Link} to="/login" style={navLinkStyle}>Login</Nav.Link> */}
              <Nav.Link as={Link} to="/team" style={navLinkStyle}>Team</Nav.Link>
              <Nav.Link as={Link} to="/customize" style={navLinkStyle}>customize</Nav.Link> 
               {/* <Nav.Link as={Link} to="/myprofile" style={navLinkStyle}>MyProfile</Nav.Link>  */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel interval={2000} pause={false}>
        {[i1, i2, i3, i4, i5, i6].map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img}
              alt={`Slide ${index + 1}`}
              style={imageStyle}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="container my-5">

       <i> <h3 style={{color:"orange"}}>Highlighted Events</h3></i>

<h4>Recommended camps by our Instructors</h4>
      </div>
<div className="container my-5">
  <div className="row">
    {[
      {
        title: 'Kasol-Sarpass',
        text: 'Explore thrilling adventures with SoulTrekker!',
        img: require('./s1.jpg'),
        path: '/KasolSarpass',
      },
      {
        title: 'BhriguLake',
        text: 'Dive into the rich cultures around the world.',
        img: require('./bh1.jpg'),
        path: '/BhriguLake',
      },
      {
        title: 'Zanskar',
        text: 'Experience the serenity of nature’s beauty.',
        img: require('./z1.jpg'),
        path: '/Zanskar',
      },
      {
        title: 'Spiti-Valley',
        text: 'Unwind and relax at the world’s most peaceful places.',
        img: require('./sv.jpg'),
        path: '/SpitiValley',
      },
    ].map((card, idx) => (
      <div className="col-md-6 col-lg-3 mb-4" key={idx}>
        <Link to={card.path} className="text-decoration-none text-dark">
          <div className="card h-100 text-center shadow-sm">
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
 <div className="container my-5">

       <i> <h3 style={{color:"orange"}}>Summer Events</h3></i>

      </div>
      <div className="container my-5">
  <div className="row">
    {[
      {
        title: 'Explore Himalayas',
        text: 'Find yourself in the mountains. Lose yourself with SoulTrekker.',
        img: require('./hi.jpg'),
        path: '/ExploreHimalaya',
      },
      {
        title: 'Hamta Pass',
        text: 'Embark on epic journeys with SoulTrekker',
        img: require('./hp.jpg'),
        path: '/HamtaPass',
      },
      {
        title: 'Kedarnath',
        text: 'Answer the mountains’ call with SoulTrekker – your gateway to wild and wonderful escapes..',
        img: require('./k.jpg'),
        path: '/Kedarnath',
      },
      {
        title: 'Har Ki Dun',
        text: ' Pack your bags, tie your boots – SoulTrekker’s calling!',
        img: require('./hkd.jpg'),
        path: '/HarKiDun',
      },
    ].map((card, idx) => (
      <div className="col-md-6 col-lg-3 mb-4" key={idx}>
        <Link to={card.path} className="text-decoration-none text-dark">
          <div className="card h-100 text-center shadow-sm">
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
<div className="container my-5">

       <i> <h3 style={{color:"orange"}}>Special Events</h3></i>

      </div>
      <div className="container my-5">
  <div className="row">
    {[
      {
        title: 'Bungee Jumping',
        img: require('./bj.jpg'),
        path: '/BungeeJumping',
      },
      {
        title: 'StarParty - Lyrid Meteor Shower',
        img: require('./sp.jpg'),
        path: '/StarParty',
      },
      // {
      // //   title: 'Training Camp',
      // //   img: require('./t.jpg'),
      // //   path: '/Training',
      // // },
    ].map((card, idx) => (
      <div className="col-md-6 col-lg-3 mb-4" key={idx}>
        <Link to={card.path} className="text-decoration-none text-dark">
          <div className="card h-100 text-center shadow-sm">
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
<div className="container my-5">
  <i><h3 style={{ color: "orange" }}>Why People Love SoulTrekker!!</h3></i>
  <h4>Experience the best with us</h4>
  <div className="row mt-4">
    {[
      {
        name: "Aarav Mehta",
        review:
          "The Kasol-Sarpass trek was absolutely magical. SoulTrekker handled everything smoothly and the guides were so friendly!",
        location: "Mumbai",
      },
      {
        name: "Nisha Sharma",
        review:
          "I had an amazing experience during the Hamta Pass adventure. It was well organized and full of breathtaking moments.",
        location: "Delhi",
      },
      {
        name: "Ravi Kumar",
        review:
          "Kedarnath trek through SoulTrekker was my best decision this year. Highly recommended for solo and group travelers.",
        location: "Bangalore",
      },
      {
        name: "Simran Kaur",
        review:
          "Loved every moment of the Zanskar Valley trek. The SoulTrekker team made us feel safe, excited, and cared for!",
        location: "Chandigarh",
      },
    ].map((review, idx) => (
      <div className="col-md-6 col-lg-3 mb-4" key={idx}>
        <div className="p-3 bg-light h-100" style={{ borderRadius: '8px' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            "{review.review}"
          </p>
          <strong>{review.name}</strong>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>
            {review.location}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
<div className="container my-5">

       <i> <h3 style={{color:"orange"}}>Stories</h3></i>

      </div>
      <div className="container my-5">
  <div className="row">
    {[
      {
        title: 'Treks To Do In Manali',
        img: require('./m.jpg'),
        path: '/Q1',
      },
      {
        title: 'Why Every School Must Consider ‘Free Camping’?',
        img: require('./s.jpg'),
        path: '/W',
      },
      {
        title: 'Kutch Beyond The White Desert',
        img: require('./kt.jpg'),
        path: '/E',
      },
    ].map((card, idx) => (
      <div className="col-md-6 col-lg-3 mb-4" key={idx}>
        <Link to={card.path} className="text-decoration-none text-dark">
          <div className="card h-100 text-center shadow-sm">
            <img
              src={card.img}
              className="card-img-top"
              alt={card.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
<footer className="bg-dark text-light pt-5 pb-3 mt-5" id="contact-section">
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
          <em>Contact for Rajkot, Baroda, Surat Office </em>
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

export default Main;
