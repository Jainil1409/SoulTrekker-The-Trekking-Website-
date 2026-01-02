import logo from './logo.svg';
import './App.css'
import Main from "./Main.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KasolSarpass from './KasolSarpass.js'; 
import BhriguLake from './BhriguLake.js';
import Zanskar from './Zanskar.js';
import SpitiValley from './SpitiValley.js';
import ExploreHimalaya from './ExploreHimalaya.js'
import HamtaPass from './HamtaPass.js'
import Kedarnath from './Kedarnath.js'
import HarKiDun from './HarKiDun.js'
import BungeeJumping from './BungeeJumping.js'
import StarParty from './StarParty.js'
import BookingConfirmation from './BookingConfirmation';

//import Training from './Training.js'
import W from './W.js'
import E from './E.js'
import Q1 from './Q1.js'
import Login from './Login';
import About from './About';
import Team from './Team.js' 
// import CustomizeTrek from './CustomizeTrek..js';
//import MyProfile from './MyProfile.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/KasolSarpass" element={<KasolSarpass />} />
         <Route path="/login" element={<Login />} />
        <Route path="/BhriguLake" element={<BhriguLake />} />
        <Route path="/Zanskar" element={<Zanskar />} />
        <Route path="/SpitiValley" element={<SpitiValley />} />
        <Route path="/ExploreHimalaya" element={<ExploreHimalaya />} />
        <Route path="/HamtaPass" element={<HamtaPass />} />
        <Route path="/Kedarnath" element={<Kedarnath />} />
        <Route path="/HarKiDun" element={<HarKiDun />} />
        <Route path="/BungeeJumping" element={<BungeeJumping />} />
        <Route path="/StarParty" element={<StarParty />} />
        {/* <Route path="/customize" element={<CustomizeTrek />} /> */}

        {/* <Route path="/Training" element={<Training />} /> */}
        <Route path="/Q1" element={<Q1 />} />
        <Route path="/W" element={<W />} />
        <Route path="/E" element={<E />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} /> 
        {/* <Route path="/myprofile" element={<MyProfile />} /> */}
        <Route path="/confirmation" element={<BookingConfirmation />} />

      </Routes>
    </Router>
  );
}

export default App;
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass  