// src/Team.js
import React from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
const teamMembers = [
  {
    name: "Rahul Joshi",
    role: "Founder & Trek Leader",
    img: require('./team1.jpg'),
  },
  {
    name: "Sneha Patel",
    role: "Operations Manager",
    img: require('./team2.jpg'),
  },
  {
    name: "Amit Sharma",
    role: "Senior Guide",
    img: require('./team3.jpg'),
  },
  {
    name: "Pooja Desai",
    role: "Safety Officer",
    img: require('./team4.jpg'),
  },
  {
    name: "Rohit Mehra",
    role: "Marketing Head",
    img: require('./team5.jpg'),
  },
  {
    name: "Neha Verma",
    role: "Event Coordinator",
    img: require('./team6.jpg'),
  },
];

function Team() {
    const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };
  return (<div>
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>SoulTrekker</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    <div className="team-page">
      <div className="hero-banner">
        <h1 className="text-black">Meet Our Team</h1>
        <p className="text-black lead">Passionate. Experienced. Committed.</p>
      </div>
      <div className="container my-5">
        <div className="row">
          {teamMembers.map((member, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div className="card team-card h-100 text-center shadow-sm">
                <img
                  src={member.img}
                  className="card-img-top"
                  alt={member.name}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-muted">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Team;
