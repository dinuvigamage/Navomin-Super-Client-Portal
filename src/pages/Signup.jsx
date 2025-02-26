
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

const SignUp = () => {
  return (
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <img
          src="images/Logo.png"  
          alt="Logo"
          className="mx-auto mb-3" 
          style={{ width: "160px", height: "50px" }}
        />
  
      {/* Login Button */}
      <div className="position-absolute top-0 end-0 m-3">
        <Button variant="outline-primary">Login</Button>
      </div>

      {/* Form Title */}
      <h4 className="fw-bold mt-3">Create a new Account!</h4>
      <p className="text-muted">Sign up to access exclusive features.</p>

      {/* Form */}
      <Form className="w-75">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Dinuvi" />
          </Col>
          <Col md={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Nethumila" />
          </Col>
        </Row>
        

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="dinuvinethumila@gmail.com" />
          </Col>
          <Col md={6}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="+94" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Col>
          <Col md={6}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" />
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button variant="primary" size="lg">Create Account</Button>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-3">
          <FaFacebook size={24} className="me-3 text-primary" />
          <FaTwitter size={24} className="me-3 text-info" />
          <FaGoogle size={24} className="text-danger" />
        </div>
      </Form>

      {/* Footer */}
      <p className="text-muted mt-4">Made with <span className="fw-bold">Visily</span></p>
    </Container>
  );
};

export default SignUp;