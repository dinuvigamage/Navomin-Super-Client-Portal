/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardPayment from "./CardPayment";
import {
  addAnOrder,
  addAPreOrder,
  addOrderItem,
  addPreOrderItem,
} from "../apis/order";
import GlobalVars from "../globalVars";
import { disableCart } from "../apis/cart";

const OrderConfirmation = () => {
  const location = useLocation();
  const { finalizedOrder } = location.state || {};

  const [user] = GlobalVars();

  const navigate = useNavigate();

  const normalOrders = finalizedOrder.normalOrders || {};
  const preOrders = finalizedOrder.preOrders || {};
  const cartId = finalizedOrder.cartId || null;

  const [finalPayment, setFinalPayment] = useState(
    (normalOrders.paymentMethod === "online" ? normalOrders.totalAmount : 0) +
      preOrders.totalAmount
  );

  const [paymentOption, setPaymentOption] = useState("full");

  const [paymentTrigger, setPaymentTrigger] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [orderID, setOrderID] = useState(null);
  const [preOrderID, setPreOrderID] = useState(null);

  const [placeOrderItems, setPlaceOrderItems] = useState(false);

  const handlePlaceOrder = async () => {
    let orderIdResponse = null;
    let preOrderIdResponse = null;

    try {
      // Place normal order
      const orderResponse = await addAnOrder({
        User_ID: user.User_ID,
        Pickup_Time: normalOrders.pickupTime,
        Status: "Accepted",
        Total_Amount: normalOrders.totalAmount,
      });
      orderIdResponse = orderResponse.Order_ID;
      setOrderID(orderIdResponse); // Optional if used elsewhere

      // Place pre-order
      const preOrderResponse = await addAPreOrder({
        User_ID: user.User_ID,
        Half_Paid: 0,
        Estimated_Total: preOrders.totalAmount,
        Pickup_Date: preOrders.pickupDate,
        Pickup_Time: preOrders.pickupTime,
      });
      preOrderIdResponse = preOrderResponse.Pre_Order_ID;
      setPreOrderID(preOrderIdResponse); // Optional if used elsewhere

      // Now construct and add order items
      const normalOrderItems = normalOrders.orders.map((item) => ({
        Order_ID: orderIdResponse,
        Product_ID: item.Product_ID,
        Size_ID: item.Size_ID,
        Quantity: item.Quantity,
      }));

      const preOrderItems = preOrders.orders.map((item) => ({
        Pre_Order_ID: preOrderIdResponse,
        Product_ID: item.Product_ID,
        Size_ID: item.Size_ID,
        Quantity: item.Quantity,
      }));

      // Add each item
      for (const item of normalOrderItems) {
        try {
          const res = await addOrderItem(item);
        } catch (error) {
          console.error("Error adding order item:", error);
        }
      }

      // Do the same for pre-order items if needed
      for (const item of preOrderItems) {
        try {
          const res = await addPreOrderItem(item);
        } catch (error) {
          console.error("Error adding pre-order item:", error);
        }
      }

      await disableCart(cartId).catch((error) => {
        console.error("Error disabling cart:", error);
      });
    } catch (error) {
      console.error("Something went wrong while placing the order:", error);
    }
  };

  const handlePayment = () => {
    if (finalPayment > 0) setPaymentTrigger(true);
    else handlePlaceOrder();
  };

  return (
    <>
      <Navbar />
      {!paymentTrigger && (
        <Container className="my-5">
          {/* Order ID */}
          <h4 className="mb-3">Order Summary</h4>
          <div className="border rounded p-4 shadow-sm mb-4">
            <h6>Normal Orders</h6>

            {/* Order Details Table */}
            <Table bordered>
              <thead>
                <tr>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(normalOrders.orders).map(([key, item]) => (
                  <tr key={key}>
                    <td>
                      <img
                        src={item.Image_Link}
                        alt={item.Product_Name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{item.Product_Name}</td>
                    <td>Rs. {item.Price}</td>
                    <td>{item.Size}</td>
                    <td>{item.Quantity}</td>
                    <td>Rs. {item.Price * item.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <p className="text-muted">Pickup Time: {normalOrders.pickupTime}</p>
          </div>

          <div className="border rounded p-4 shadow-sm mb-4">
            <h6>Pre Orders</h6>
            <Table bordered>
              <thead>
                <tr>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(preOrders.orders).map(([key, item]) => (
                  <tr key={key}>
                    <td>
                      <img
                        src={item.Image_Link}
                        alt={item.Product_Name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{item.Product_Name}</td>
                    <td>Rs. {item.Price}</td>
                    <td>{item.Size}</td>
                    <td>{item.Quantity}</td>
                    <td>Rs. {item.Price * item.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <p className="text-muted">Pickup Time: {preOrders.pickupTime}</p>
            <p className="text-muted">Pickup Date: {preOrders.pickupDate}</p>
          </div>

          {/* Order Estimation */}
          <h5>Order Estimation</h5>
          <Row className="mb-3">
            <Col md={6}>
              <p>
                Normal total price is:{" "}
                <strong>Rs. {normalOrders.totalAmount}</strong>
              </p>
              <p>
                Normal Payment Method:{" "}
                {normalOrders.paymentMethod.toUpperCase()}
              </p>
            </Col>
            <Col md={6}>
              <p>
                Pre total price is: <strong>Rs. {preOrders.totalAmount}</strong>
              </p>
              <p>Pre Payment Method: ONLINE</p>
            </Col>
          </Row>
          {/* Payment Summary */}
          {/* <p>
            Order Status: <strong className="text-success">Accepted</strong>
          </p> */}

          <p>
            Online Pay Amount: <strong>Rs. {finalPayment}</strong>
          </p>

          {/* Payment Options */}
          {/* <Form>
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
          </Form> */}

          {/* Pay Button */}
          {paymentSuccess ? (
            <Alert variant="success" className="mt-3 d-flex align-items-center">
              <span className="text-center">
                ✅ Your payment was successful
              </span>
            </Alert>
          ) : (
            <Button
              variant="secondary"
              className="submit-btn"
              onClick={handlePayment}
            >
              Place Order
            </Button>
          )}

          <style>
            {`
      .submit-btn {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #6C63FF;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: #5548d4;
        }
        `}
          </style>
        </Container>
      )}

      {paymentTrigger && (
        <CardPayment
          setPaymentTrigger={setPaymentTrigger}
          setPaymentSuccess={setPaymentSuccess}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}

      <Footer />
    </>
  );
};

export default OrderConfirmation;
