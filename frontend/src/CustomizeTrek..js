import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function CustomizeTrek(){
     const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };
   const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
  };
    return(<div>
    <div className="container-fluid p-0 position-relative">

                <Navbar expand="lg" style={navbarStyle} variant="dark">
                  <Container>
                      <Nav className="ms-auto">
          
              <Nav.Link href="/" style={navLinkStyle}>Home</Nav.Link>
              </Nav>
        </Container>

      </Navbar>
    </div>

            <Container className="my-5">
      

              <h4 style={{color:'orange',margin:''}}> You Can Customize Your Trek As Per Your Requirement</h4>
              <br></br>
              <h5>Enter The Trek Name :</h5>  
              <input type='text' id='trek' ></input>
              <br></br>
              <h5>Enter The Duration Of The Trek :</h5>
              <select id='duration'>
                <option value={'4 day'}>4 Day/3 Night </option>
                <option value={'8 day'}>8 Day/7 Night</option>
                <option value={'12 day'}>12 Day/11 Night</option>
                
              </select>
              <br></br>
              <h5>Enter The Altitude Of Trek :</h5>  
              <input type='text' id='Altitude' ></input>
        </Container>
        </div>);

}
export default CustomizeTrek;