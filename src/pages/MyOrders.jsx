import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import GlobalVars from "../globalVars.js";
import { getOrderByUserId, getPreOrderByUserId } from "../apis/order.js";

const MyOrders = () => {
  const [user] = GlobalVars();

  const [normalOrders, setNormalOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-3">Normal Orders</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {normalOrders.map((order) => (
                <tr key={order.Order_ID}>
                  <td>{String(order.Order_ID).padStart(3, "0")}</td>
                  <td>{order.Pickup_Time.slice(0, 5)}</td>
                  <td>{order.Status}</td>
                  <td className="text-center">
                    <button className="btn btn-primary">View Receipt</button>
                  </td>
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
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {preOrders.map((order) => (
                <tr key={order.Pre_Order_ID}>
                  <td>{String(order.Pre_Order_ID).padStart(3, "0")}</td>
                  <td>{new Date(order.Pickup_Date).toLocaleDateString()}</td>
                  <td>{order.Pickup_Time.slice(0, 5)}</td>
                  <td>{order.Status || "Accepted"}</td>
                  <td className="text-center">
                    <button className="btn btn-primary">View Receipt</button>
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
      <Footer />
    </>
  );
};

export default MyOrders;
