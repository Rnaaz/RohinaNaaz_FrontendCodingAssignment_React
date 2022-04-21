import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <Container className="d-flex" style={{ padding: "10px 0px" }}>
      <Navbar.Brand><FontAwesomeIcon className="me-2" style={{color:"#1E2F97"}} icon={faFilm} />Movies-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to="/movies-in-theaters" as={NavLink}>Movies in Theatre</Nav.Link>
          <Nav.Link to="/movies-coming" as={NavLink}>Coming Soon</Nav.Link>
          <Nav.Link to="top-rated-india" as={NavLink}>Top rated Indian</Nav.Link>
          <Nav.Link to="top-rated-movies" as={NavLink}>Top Rated Movies</Nav.Link>
          <Nav.Link to="/favourite" as={NavLink}>Favourite</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  )
}

export default Navigation