import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Form, Button, Row, Col, Alert } from "react-bootstrap";

const OrderConfirmation = () => {
  const [paymentOption, setPaymentOption] = useState("half");

  return (
    <Container className="my-5">
      {/* Order ID */}
      <h5 className="mb-3">Order ID: 2132</h5>

      {/* Order Details Table */}
      <Table bordered>
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Item Name</th>
            <th>Price/1</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="images\egg bun.jfif" alt="Egg Bun" width="50" height="50" />
            </td>
            <td>Egg Bun</td>
            <td>Rs.20</td>
            <td>5</td>
            <td>Rs.100</td>
          </tr>
          <tr>
            <td>
              <img src="/images/veg bun.jfif" alt="Veg Bun" width="50" height="50" />
            </td>
            <td>Veg Bun</td>
            <td>Rs.430</td>
            <td>500g</td>
            <td>Rs.2150</td>
          </tr>
        </tbody>
      </Table>

      {/* Pickup Details */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Pickup Date</Form.Label>
          <Form.Control type="date" defaultValue="2024-10-06" />
        </Col>
        <Col md={6}>
          <Form.Label>Pickup Time</Form.Label>
          <Form.Select>
            <option>10:00 a.m.</option>
            <option>12:00 p.m.</option>
            <option>2:00 p.m.</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Order Estimation */}
      <h5>Order Estimation</h5>
      <p>Your estimated total price is: <strong>Rs.3420.00</strong></p>
      <p>Order Status: <strong className="text-success">Accepted</strong></p>

      {/* Payment Section */}
      <hr />
      <h5>Pay to Confirm your Order</h5>
      <p>Additional Charge: Rs.100.00</p>
      <p>Your total price is: <strong>Rs.3520.00</strong></p>

      {/* Payment Options */}
      <Form>
        <Form.Check
          type="radio"
          label="Half Payment : Rs.1710.00"
          name="payment"
          checked={paymentOption === "half"}
          onChange={() => setPaymentOption("half")}
        />
        <Form.Check
          type="radio"
          label="Full Payment : Rs.3520.00"
          name="payment"
          checked={paymentOption === "full"}
          onChange={() => setPaymentOption("full")}
        />
      </Form>

      {/* Pay Button */}
      <Button variant="secondary" className="mt-3">Pay</Button>

      {/* Payment Success Message */}
      <Alert variant="success" className="mt-3 d-flex align-items-center">
        <span>✅ Your payment was successful — </span>
        <a href="#" className="ms-2">View Order</a>
      </Alert>

      {/* Footer */}
      <p className="text-muted text-center mt-4">Made with <strong>Visily</strong></p>
    </Container>
  );
};

export default OrderConfirmation;
