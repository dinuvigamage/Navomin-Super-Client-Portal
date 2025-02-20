import React from "react";
import { FiMenu } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleLoginSignup = () => {
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FiMenu className="fs-3" />
        </button>

        <a
          className="navbar-brand fw-bold ms-3 d-flex align-items-center"
          href="#"
        >
          <img
            src="images/Logo.png"
            alt="Logo"
            className="me-2"
            style={{ width: "150px", height: "40px" }}
          />
        </a>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-primary" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pre-Order Bakery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Orders
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <button className="btn btn-primary me-3" onClick={handleLoginSignup}>
            Login/Signup
          </button>
          <FaShoppingCart className="fs-3 text-dark" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
