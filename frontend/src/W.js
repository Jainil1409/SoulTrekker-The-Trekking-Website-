import React from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
import i from './sc.jpg'
function W() {
  return (<div>
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoulTrekker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className="camping-page">
      <img
        src={i}
        alt="School kids camping"
        className="camping-hero"
      />
      <h1>Why Every School Must Consider ‘Free Camping’</h1>
      <div className="camping-content">
        <p>
          In today’s fast-paced digital world, it’s essential for children to reconnect with nature and experience learning beyond the classroom. Free camping offers a low-cost yet powerful way to build life skills, confidence, and resilience in students.
        </p>
        <p>
          <strong>1. Builds Confidence and Independence:</strong> Camping helps students learn how to set up tents, cook basic meals, and take responsibility for themselves and others — skills not often taught in textbooks.
        </p>
        <p>
          <strong>2. Enhances Teamwork and Communication:</strong> Away from screens and classrooms, children engage in real-time collaboration, develop leadership, and learn the value of teamwork through shared outdoor activities.
        </p>
        <p>
          <strong>3. Promotes Mental Wellbeing:</strong> Nature provides a refreshing break from academic pressure. Time spent outdoors reduces stress and improves focus, positivity, and emotional balance.
        </p>
        <p>
          <strong>4. Cost-effective Learning:</strong> Free camping requires minimal gear and can be conducted in local parks or school grounds, making it affordable and accessible for all schools.
        </p>
        <p>
          <strong>5. Instills Environmental Awareness:</strong> Living amidst nature inspires students to appreciate, respect, and protect the environment — lessons best learned through direct experience.
        </p>
        <p>
          Every school, regardless of location or budget, should consider organizing free camping to create lasting memories and shape well-rounded individuals.
        </p>
      </div>
    </div>
    </div>
  );
}

export default W;
