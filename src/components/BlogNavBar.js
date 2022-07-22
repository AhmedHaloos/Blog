import { Nav, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from "../DatabaseHandler/UserAuth";

export default function BlogNavBar() {



    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="d-flex ">
                    <LinkContainer to={'/home'}>
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={'/about'}>
                        <Nav.Link >About</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={'/'}>
                        <Nav.Link >Login</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={'/signup'}>
                        <Nav.Link >SignUp</Nav.Link>
                    </LinkContainer>

                    <Nav.Link onClick={() => { logout() }} style={{ alignSelf: 'flex-end' }} >logout</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    )
}