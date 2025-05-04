/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import GlobalVars from "../globalVars.js";
import {
  getOrderByUserId,
  getPreOrder,
  getPreOrderByUserId,
  updatePreOrderStatus,
} from "../apis/order.js";
import CardPayment from "./CardPayment.jsx";
import { Container } from "react-bootstrap";

const MyOrders = () => {
  const [user] = GlobalVars();

  const [normalOrders, setNormalOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);

  const [paymentTrigger, setPaymentTrigger] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [payingPreOrderID, setPayingPreOrderID] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      getOrderByUserId(user.User_ID)
        .then((response) => {
          setNormalOrders(response);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });

      getPreOrderByUserId(user.User_ID)
        .then((response) => {
          setPreOrders(response);
        })
        .catch((error) => {
          console.error("Error fetching pre-orders:", error);
        });
    };
    fetchOrders();
  }, [user]);

  const handlePayment = (orderID) => {
    setPayingPreOrderID(orderID);
    setPaymentTrigger(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updatePreOrderStatus(orderId, newStatus)
      .then((response) => {

        // Optionally, you can refresh the pre-orders list after updating the status
        getPreOrder()
          .then((response) => {
            setPreOrders(response);
          })
          .catch((error) => {
            console.error("Error fetching pre-orders:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handlePaymentSuccess = () => {
    handleStatusChange(payingPreOrderID, "Payement Done"); // Example: Update the status to "Paid"
  };

  return (
    <>
      <Navbar />
      {!paymentTrigger && (
        <Container className="my-5">
          <div className="container mt-4">
            <h3 className="mb-3">Normal Orders</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Pickup Time</th>
                    <th>Status</th>
                    <th>Tolal</th>
                  </tr>
                </thead>
                <tbody>
                  {normalOrders.map((order) => (
                    <tr key={order.Order_ID}>
                      <td>{String(order.Order_ID).padStart(3, "0")}</td>
                      <td>
                        {
                          // remove seconds from the time string
                          order?.Pickup_Time &&
                            order?.Pickup_Time.split(":")
                              .slice(0, 2)
                              .join(":") +
                              " " +
                              (order?.Pickup_Time.split(":")[0] >= 12
                                ? "PM"
                                : "AM")
                        }
                      </td>
                      <td>{order.Status}</td>
                      <td>Rs. {order.Total_Amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-4 mb-3">Pre Orders</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Pickup Date</th>
                    <th>Pickup Time</th>
                    <th>Status</th>
                    <th>Estimated Total</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {preOrders.map((order) => (
                    <tr key={order.Pre_Order_ID}>
                      <td>{String(order.Pre_Order_ID).padStart(3, "0")}</td>
                      <td>
                        {new Date(order.Pickup_Date).toLocaleDateString()}
                      </td>
                      <td>
                        {
                          // remove seconds from the time string
                          order?.Pickup_Time &&
                            order?.Pickup_Time.split(":")
                              .slice(0, 2)
                              .join(":") +
                              " " +
                              (order?.Pickup_Time.split(":")[0] >= 12
                                ? "PM"
                                : "AM")
                        }
                      </td>
                      <td>{order.Status || "Accepted"}</td>
                      <td>Rs. {order.Estimated_Total}</td>
                      <td>
                        {order.Status === "Confirmed" && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePayment(order.Pre_Order_ID)}
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <style>{`

      .container {
          max-width: 1000px; 
          margin: 0 auto; 
        }

        .table-container {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .table {
          border-collapse: collapse;
          width: 100%;
        }

        .table thead{
           border-bottom: 1px solid #ddd;
        }

        .table th {
          background-color: #f8f9fa;
        }

        .table td, .table th {
          border: none; 
        }

        .table-container::-webkit-scrollbar {
          width: 5px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .table-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .text-center {
          text-align: center;
        }

        .table tbody .text-center{
          display: flex;
          justify-content: center;
        }

        .btn-primary {
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          width: 120px;
        }
      `}</style>
        </Container>
      )}

      {paymentTrigger && (
        <CardPayment
          setPaymentTrigger={setPaymentTrigger}
          setPaymentSuccess={setPaymentSuccess}
          handlePlaceOrder={handlePaymentSuccess}
        />
      )}
      <Footer />
    </>
  );
};

export default MyOrders;
