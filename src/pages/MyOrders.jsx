import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MyOrders = () => {
  const normalOrders = [
    { id: "001", date: "2023-10-01", status: "Completed" },
    { id: "002", date: "2023-10-02", status: "Completed" },
    { id: "003", date: "2023-10-04", status: "Declined" },
    { id: "004", date: "2023-10-07", status: "Preparing" },
    { id: "005", date: "2023-10-07", status: "Ready for Pickup" },
    { id: "006", date: "2023-10-10", status: "Shipped" },
    { id: "007", date: "2023-10-12", status: "Delivered" },
  ];

  const preOrders = [
    { id: "001", date: "2023-10-01", status: "Completed" },
    { id: "003", date: "2023-10-04", status: "Declined by owner" },
    { id: "004", date: "2023-10-07", status: "Accepted by owner" },
    { id: "005", date: "2023-10-07", status: "Pending" },
    { id: "006", date: "2023-10-10", status: "Paid" },
    { id: "007", date: "2023-10-12", status: "Processing" },
    { id: "008", date: "2023-10-14", status: "Confirmed" },
  ];

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
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {normalOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
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
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {preOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
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
