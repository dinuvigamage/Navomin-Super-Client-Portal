import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const products = [
  { name: "Bananas", price: "Rs.230.00", image: "images/bananas.jpg" },
  { name: "Strawberries", price: "Rs.230.00/pack", image: "images/strawberries.jpg" },
  { name: "Bread", price: "Rs.150.00", image: "images/bread.jpg" },
  { name: "Milk", price: "Rs.500.00/carton", image: "images/milk.jpg" },
  { name: "Bananas", price: "Rs.230.00", image: "images/bananas.jpg" },
  { name: "Strawberries", price: "Rs.230.00/pack", image: "images/strawberries.jpg" },
  { name: "Bread", price: "Rs.150.00", image: "images/bread.jpg" },
  { name: "Milk", price: "Rs.500.00/carton", image: "images/milk.jpg" },
  { name: "Bananas", price: "Rs.230.00", image: "images/bananas.jpg" },
  { name: "Strawberries", price: "Rs.230.00/pack", image: "images/strawberries.jpg" },
  { name: "Bread", price: "Rs.150.00", image: "images/bread.jpg" },
  { name: "Milk", price: "Rs.500.00/carton", image: "images/milk.jpg" },
];

const ITEMS_PER_PAGE = 8;

const ProductCard = ({ product }) => (
  <div className="card shadow-sm">
    <img src={product.image} className="card-img-top" alt={product.name} />
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">Price: {product.price}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="fw-bold">Featured Products</h2>

        {/* Search Bar */}
        <div className="sticky-top bg-white py-3">
          <div className="input-group">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input type="text" className="form-control" placeholder="Search for products..." />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        {/* Product List */}
        <div className="row g-4 mt-3">
          {selectedProducts.map((product, index) => (
            <div key={index} className="col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary me-2" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="align-self-center"> {currentPage} of {totalPages}</span>
          <button className="btn btn-primary ms-2" onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
