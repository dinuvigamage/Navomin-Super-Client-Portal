
import { Container, Table, Row, Col, Image } from "react-bootstrap";

const OrderConfirmation = () => {
  return (
    <Container className="my-5 p-4 shadow bg-white rounded">
      {/* Order ID */}
      <h5 className="mb-4">Order ID: 2132</h5>

      {/* Order Table */}
      <Table bordered hover responsive>
        <thead className="bg-light">
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
              <Image src="/images/egg bun.jfif" alt="Egg Bun" width="50" height="50" rounded />
            </td>
            <td>Egg Bun</td>
            <td>Rs.20</td>
            <td>5</td>
            <td>Rs.100</td>
          </tr>
          <tr>
            <td>
              <Image src="/images/veg bun.jfif" alt="Vege Bun" width="50" height="50" rounded />
            </td>
            <td>Vege Bun</td>
            <td>Rs.430</td>
            <td>500g</td>
            <td>Rs.2150</td>
          </tr>
        </tbody>
      </Table>

      {/* Order Details */}
      <Row className="mt-4">
        <Col md={6}>
          <p><strong>Pickup Date:</strong> 2021/03/04</p>
        </Col>
        <Col md={6}>
          <p><strong>Pickup Time:</strong> 10:00 a.m.</p>
        </Col>
        <Col md={6}>
          <p><strong>Payment Type:</strong> Half Payment</p>
        </Col>
        <Col md={6}>
          <p><strong>Total:</strong> Rs.3750.00</p>
        </Col>
        <Col md={6}>
          <p><strong>Paid Amount:</strong> Rs.1875.00</p>
        </Col>
        <Col md={6}>
          <p><strong>Balance to Pay:</strong> Rs.1875.00</p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
