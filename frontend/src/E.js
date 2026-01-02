import React from 'react';
import './App.css';
import ku from './ku.jpg'
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
function E() {
  const story = `
    Kutch, a mesmerizing region in Gujarat, is far more than just the iconic white desert. 
    While the vast salt plains of the Rann of Kutch attract thousands during the Rann Utsav, 
    the region hides a treasure trove of history, culture, and color that extends beyond the desert's edge.

    From the bustling markets of Bhuj to the silent forts of Roha and Lakhpat, Kutch offers a journey 
    through time. The intricate embroidery, mirror work, and crafts crafted by local artisans reflect 
    centuries of tradition. The sunsets at Mandvi beach, the serene temples of Narayan Sarovar, and 
    the panoramic views from Kalo Dungar offer a spiritual and scenic escape.

    The people of Kutch, known for their warmth and hospitality, bring life to the land with their 
    traditional music, vibrant attire, and delicious cuisine like Dabeli and Bajra rotla. It’s a land 
    where culture dances on every dune and stories are stitched into every thread.

    Kutch is not just a destination — it's an experience that stays with you long after the dust has settled.
   
   
   => 1. Adiyogi Statue
Everyone is aware of the Adiyogi Statue, the one in Coimbatore. But not many people know that we do have a replica of this statute. Yes, you heard it correctly. We have the same statue right here in Kutch near Bhuj. 


It’s a road ride of 5-6 km from Bhuj which takes you to this statue. Seeing the mate black Shiva statue will just bring a sense of relief to you. The statue has a natural glow on it which makes you feel as if you are amidst a divine power. The sculpture is crafted in the middle of barren land and thus will appear as if the statue has emerged out of the land. 

If you are a devotee of Lord Shiva then don’t worry, we have got this place covered for you.

=>2. Khari Nadi
Khari Nadi is not like any other river. It has a very unusual bodily appearance that will drive you towards it. The river is captured between flat mountain-like rock structures. You can walk up or inside these cave-like structures and get yourself closer to this amazing creation of the creator. 

=>3. The Road Journey From Dhordo To Dholavira
A new road is being developed for better connectivity to Dholavira. The road goes through the Lake of Kutch covered on both sides. This road journey between the lake gives a very surreal feeling to the traveler. It has a vibe that is unmatchable as on both sides you have the company of white beauty on your way. 



The surreal road!
This route has yet not been on google maps but SoulTrekker has made its way to the road. 


Thus, Kutch is beyond just a desert place, but it narrates stories of an era gone by and has some really scenic visuals to present us and make it unforgettable. 

Not many organizations conduct camping in Kutch and make you visit the places one had never ever heard of. So what are you waiting for?


Get your camp book now to experience the offside of Kutch, exclusively with SoulTrekker! 



  `;
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

    <div className="kutch-container">
         <img src={ku} alt="Kutch landscape" className="kutch-image" />
      <i><h1>Kutch: Beyond the White Desert</h1></i>
      <p>{story}</p>
    </div>
    </div>
  );
}

export default E;
