import React from 'react';
import './App.css';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
import './ch.jpg'
function Q1() {
    const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };
  const treks = [
    {
      title: '1. Chandrakhani Pass',
      image: require('./ch.jpg'),
      description: `A scenic and less-explored trail, Chandrakhani Pass offers breathtaking views of the Deo Tibba and Pir Panjal ranges.
      It is known for its rich mythology and panoramic landscapes, ideal for beginners and nature lovers.`,
    },
    {
      title: '2. Bhrigu Lake',
      image: require('./bh1.jpg'),
      description: `This trek leads to a high-altitude glacial lake, said to have been visited by sage Bhrigu.
      The lake changes color and shape with seasons, and the trail offers sweeping views of snow-capped peaks and meadows.`,
    },
    {
      title: '3. Beas Kund',
      image: require('./bk.jpg'),
      description: `A short yet stunning trek, Beas Kund is the origin of the Beas River. Surrounded by towering peaks like Hanuman Tibba,
      it's a spiritually significant site and offers views of glaciers and alpine terrain.`,
    },
    {
      title: '4. Hampta Pass',
      image: require('./hp.jpg'),
      description: `One of the most dramatic crossover treks, Hampta Pass connects Kullu Valley to Spiti. The landscape changes
      from green meadows to barren mountains. It’s popular among trekkers for its contrast and adventure.`,
    }
  ];

  return (<div>
    <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SoulTrekker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className="trek-container">
      <i><h1>Trekking Adventures Around Manali</h1></i>
      <div className="trek-list">
        {treks.map((trek, index) => (
          <div key={index} className="trek-item">
            <img src={trek.image} alt={trek.title} />
            <h2>{trek.title}</h2>
            <p>{trek.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Q1;
