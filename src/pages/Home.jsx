/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {
  getProductImage,
  getProducts,
  getProductSize,
} from "../apis/products.js";
import { href, Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const ProductCard = ({ product, price, image }) => (
  <div className="card shadow-sm">
    <img src={image} alt={product.Product_Name} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{product.Product_Name}</h5>
      <p className="card-text">Price: {price}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productImage, setProductImage] = useState([]);

  // api call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      getProducts()
        .then((response) => {
          setProduct(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      getProductSize()
        .then((response) => {
          setProductSize(response);
        })
        .catch((error) => {
          console.error("Error fetching product sizes:", error);
        });

      getProductImage()
        .then((response) => {
          setProductImage(response);
        })
        .catch((error) => {
          console.error("Error fetching product images:", error);
        });
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedProducts = product.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        {/* Product List */}
        <div className="row g-4 mt-3">
          {selectedProducts.map((product, index) => (
            <div key={index} className="col-md-3">
              <Link
                to={`/product/${product.Product_ID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard
                  product={product}
                  price={
                    productSize.filter(
                      (size) =>
                        size.Product_ID === product.Product_ID &&
                        (size.Size === "1kg" || size.Size === "1")
                    )[0]?.Price || "Rs.0.00" /* Default price */
                  }
                  image={
                    productImage.filter(
                      (image) => image.Product_ID === product.Product_ID
                    )[0]?.Image_Link || "images/default.jpg" /* Default image */
                  }
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">
            {" "}
            {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary ms-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
