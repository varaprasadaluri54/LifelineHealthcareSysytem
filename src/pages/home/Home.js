import "./home.css";

import NavBar from "../../components/navbar/Navbar";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <NavBar />
      <Container id="hero" className="d-flex align-items-center">
        <div className="container text-center position-relative">
          <h1>24/7 care is Availble</h1>
          <h2>Welcome everyone</h2>
        </div>
      </Container>
    </>
  );
}
