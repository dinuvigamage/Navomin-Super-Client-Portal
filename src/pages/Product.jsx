import { useState } from "react";
import { Row, Col, Button, Dropdown, Card, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("/images/noodles3.jfif");
  const [selectedSize, setSelectedSize] = useState("Choose size");

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">    
      <Row>
        {/* Left Side - Product Images */}
        <Col md={5}>
          <Row>
            <Col xs={3} className="d-flex flex-column align-items-center">
              {["/images/noodles.png", "/images/noodles1.png", "/images/noodles2.png"].map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  className="mb-2 cursor-pointer"
                  thumbnail
                  onClick={() => setMainImage(img)}
                />
              ))}
            </Col>
            <Col xs={9}>
              <Image src={mainImage} width="800" height="820" alt="Main Product" className="img-fluid" />
            </Col>
          </Row>
        </Col>

        {/* Right Side - Product Details */}
        <Col md={7}>
          <h3>Maggi Noodles</h3>
          <p>Category: Instant food</p>
          <h4 className="text-primary">Rs 410.00</h4>

          {/* Choose Size Dropdown */}
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary">{selectedSize}</Dropdown.Toggle>
            <Dropdown.Menu>
              {["100g", "200g", "300g"].map((size) => (
                <Dropdown.Item key={size} onClick={() => setSelectedSize(size)}>{size}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Quantity Controls */}
          <div className="mb-3">
            <Button variant="outline-secondary" onClick={() => handleQuantityChange("decrease")}>
              -
            </Button>
            <span className="mx-2">{quantity}</span>
            <Button variant="outline-secondary" onClick={() => handleQuantityChange("increase")}>
              +
            </Button>
          </div>

          {/* Description */}
          <p>
            Description: This is a placeholder description for the product. Replace this with the actual description.
          </p>

          {/* Add to Cart Button */}
          <Button variant="primary" className="w-100">
            Add to cart
          </Button>
        </Col>
      </Row>

      {/* Related Products */}
      <h5 className="mt-5 mb-4">Related products</h5>
      <Row>
        {["/images/egg bun.jfif", "/images/pasta.jfif", "/images/potato.jfif", "/images/onion.jfif"].map((img, index) => (
          <Col sm={3} key={index}>
            <Card>
              <Card.Img variant="top" src={img} width="250" height="280" />
              <Card.Body>
                <Card.Title>Product {index + 1}</Card.Title>
                <Card.Text>Rs.50.00</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
