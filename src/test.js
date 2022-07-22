import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Badge from './components/Badge'
import MailIcon from '@mui/icons-material/Mail';

import { LinkContainer } from 'react-router-bootstrap';
import { logout } from './DatabaseHandler/UserAuth';
import { useContext } from 'react';
import DataContext from './DataContext';


export default function Test({ currPage }) {

  const contextData = useContext(DataContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant="dark"
      style={{ position: 'fixed', top: contextData.navVisible ? '0' : '-20rem', width: '100%', transition: 'top 0.5s' }}>
      <Container>
        <LinkContainer to={'/home'}>
          <div>
            <img className='blog-logo'
              src={currPage == 'profilePage' ? "../blog-logo.png" : currPage == 'bigPost' ? '../blog-logo.png' : 'blog-logo.png'} alt="No image found" />
          </div>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={'/home'}>

              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={contextData.isLoggedIn ? '/profile' : '/signin'}>
              <Nav.Link >Me</Nav.Link>
            </LinkContainer>

            <LinkContainer to={'/about'}>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {/* <Badge  /> */}
          <div style={{width:'2rem'}}></div>
          <Nav>
            <LinkContainer to={'/signin'}>
              <Nav.Link >Sign In</Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/signup'}>
              <Nav.Link >Sign Up </Nav.Link>
            </LinkContainer>
            <Nav.Link href="/"></Nav.Link>
            <LinkContainer to={currPage == 'profile' ? '/signin' : ''}>
              <Nav.Link onClick={() => { logout() }} style={{ alignSelf: 'flex-end' }} >logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
     
      </Container>
    </Navbar>
  )
}