import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const bakeryItems = [
  {
    id: 1,
    name: "Fish Bun",
    description: "Crispy and golden brown.",
    price: 130.0,
    image: "images/fishbun.jpg",
  },
  {
    id: 2,
    name: "Fish Pastry",
    description: "Crispy and golden brown.",
    price: 150.0,
    image: "images/fishpastry.jpg",
  },
  {
    id: 3,
    name: "Egg Bun",
    description: "Soft and airy with a delightful aroma.",
    price: 100.0,
    image: "images/eggbun.jpg",
  },
  {
    id: 4,
    name: "Chocolate Doghnut",
    description: "Hearty and flavorful, ideal for any meal.",
    price: 220.0,
    image: "images/chocolatedoghnut.jpg",
  },
  {
    id: 5,
    name: "Chicken Sabmarine",
    description: "Freshly baked, soft and delicious.",
    price: 550.0,
    image: "images/submarine.jpg",
  },
];

const PreOrderBakery = () => {
  const [quantities, setQuantities] = useState(
    bakeryItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] + change),
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row g-4">
          {bakeryItems.map((item) => (
            <div key={item.id} className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-4 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: "180px", height: "130px" }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="card-text fw-semibold">
                        Price: Rs.{item.price.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="btn btn-primary btn-sm"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center mx-2"
                          style={{ width: "50px" }}
                          value={quantities[item.id]}
                          readOnly
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="btn btn-primary btn-sm"
                        >
                          +
                        </button>
                        <button
                          className="btn btn-primary btn-sm ms-3"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreOrderBakery;
