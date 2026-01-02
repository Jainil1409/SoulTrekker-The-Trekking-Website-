
import React from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
function About() {
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
    <div className="about-container">
      <div className="hero-section">
        <h1 className="display-4 fw-bold text-black">About SoulTrekker</h1>
        <p className="lead text-black">Vision • Mission • Objectives</p>
      </div>

      <div className="container my-5">
        <section className="mb-5">
          <h2 className="section-title">🌄 Vision</h2>
          <p className="section-text">
            To inspire a generation of explorers who reconnect with nature, embrace challenges, and build strong values through immersive trekking and camping experiences.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="section-title">🚀 Mission</h2>
          <p className="section-text">
            Our mission is to organize safe, educational, and thrilling adventure programs that nurture leadership, sustainability, and personal growth—especially for the youth of India.
          </p>
        </section>

        <section>
          <h2 className="section-title">🎯 Objectives</h2>
          <ul className="section-text">
            <li>To promote eco-friendly adventure tourism.</li>
            <li>To offer affordable trekking experiences for all age groups.</li>
            <li>To build mental and physical strength through nature-based programs.</li>
            <li>To develop leadership skills, discipline, and team spirit.</li>
            <li>To create awareness about the environment and conservation.</li>
          </ul>
        </section>
      </div>
    </div>
    </div>
  );
}

export default About;

 