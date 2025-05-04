/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCartById, getCartItemById } from "../apis/cart.js";
import GlobalVars from "../globalVars.js";
import {
  getCategory,
  getProductById,
  getProductImage,
  getProductImageById,
  getProducts,
  getProductSize,
  getProductSizeById,
  getProductSizeBySizeId,
} from "../apis/products.js";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("normal");

  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  const [product, setProduct] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productImage, setProductImage] = useState([]);

  const [category, setCategory] = useState([]);

  const [normalOrders, setNormalOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);

  const [normalOrderPickupTime, setNormalOrderPickupTime] = useState("");
  const [preOrderPickupDate, setPreOrderPickupDate] = useState(
    // today's date in YYYY-MM-DD format
    new Date().toISOString().split("T")[0]
  );
  const [preOrderPickupTime, setPreOrderPickupTime] = useState("");

  const [normalOrderPaymentMethod, setNormalOrderPaymentMethod] =
    useState("online");

  const normalOrdersTotalAmount = normalOrders.reduce(
    (acc, item) => acc + item.Price * item.Quantity,
    0
  );
  const preOrdersTotalAmount = preOrders.reduce(
    (acc, item) => acc + item.Price * item.Quantity,
    0
  );
  const totalAmount = normalOrdersTotalAmount; // + preOrdersTotalAmount;

  const normalOrdersRemoveItem = (id) => {
    const updatedCart = normalOrders.filter((item) => item.Cart_Item_ID !== id);
    setNormalOrders(updatedCart);
  };

  const preOrdersRemoveItem = (id) => {
    const updatedCart = preOrders.filter((item) => item.Cart_Item_ID !== id);
    setPreOrders(updatedCart);
  };

  const [user] = GlobalVars();

  useEffect(() => {
    const fetchCart = async () => {
      getCartById(user.User_ID)
        .then((response) => {
          setCart(response);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCartItem = async () => {
      if (!cart) return;
      getCartItemById(cart.Cart_ID)
        .then((response) => {
          setCartItem(response);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    };
    fetchCartItem();
  }, [cart]);

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
  }, [cartItem]);

  useEffect(() => {
    const fetchCategory = async () => {
      getCategory()
        .then((response) => {
          setCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const sortTheCartItems = async () => {
      if (!cartItem || !product || !category || !productSize || !productImage)
        return;

      const normalOrders = cartItem.filter((item) => {
        const eachProduct = product.find(
          (product) => product.Product_ID === item.Product_ID
        );
        const eachCategory = category.find(
          (cat) =>
            cat.Category_ID === item.Category_ID &&
            cat.Category_Name !== "Pre Order"
        );
        return eachProduct && eachCategory;
      }); // Normal Orders

      // how to include the product size and image in the normalOrders array
      const normalOrdersWithDetails = normalOrders.map((item) => {
        const eachProduct = product.find(
          (product) => product.Product_ID === item.Product_ID
        );
        const eachProductSize = productSize.find(
          (size) => size.Size_ID === item.Size_ID
        );
        const eachProductImage = productImage.find(
          (image) => image.Product_ID === item.Product_ID
        );
        return {
          Cart_Item_ID: item.Cart_Item_ID,
          Cart_ID: item.Cart_ID,
          Product_ID: item.Product_ID,
          Size_ID: item.Size_ID,
          Size: eachProductSize.Size,
          Quantity: item.Quantity,
          Product_Name: eachProduct.Product_Name,
          Price: eachProductSize.Price,
          Image_Link: eachProductImage.Image_Link,
        };
      });
      setNormalOrders(normalOrdersWithDetails);
    };
    sortTheCartItems();
  }, [cartItem, product, category, productSize, productImage]);

  useEffect(() => {
    const sortThePreOrders = async () => {
      if (!cartItem || !product || !category || !productSize || !productImage)
        return;

      const preOrders = cartItem.filter((item) => {
        const eachProduct = product.find(
          (product) => product.Product_ID === item.Product_ID
        );
        const eachCategory = category.find(
          (cat) =>
            cat.Category_ID === item.Category_ID &&
            cat.Category_Name === "Pre Order"
        );
        return eachProduct && eachCategory;
      }); // Pre Orders

      // how to include the product size and image in the preOrders array
      const preOrdersWithDetails = preOrders.map((item) => {
        const eachProduct = product.find(
          (product) => product.Product_ID === item.Product_ID
        );
        const eachProductSize = productSize.find(
          (size) => size.Size_ID === item.Size_ID
        );
        const eachProductImage = productImage.find(
          (image) => image.Product_ID === item.Product_ID
        );
        return {
          Cart_Item_ID: item.Cart_Item_ID,
          Cart_ID: item.Cart_ID,
          Product_ID: item.Product_ID,
          Size_ID: item.Size_ID,
          Quantity: item.Quantity,
          Product_Name: eachProduct.Product_Name,
          Price: eachProductSize.Price,
          Image_Link: eachProductImage.Image_Link,
        };
      });
      setPreOrders(preOrdersWithDetails);
    };
    sortThePreOrders();
  }, [cartItem, product, category, productSize, productImage]);

  const handleFinalizeOrder = () => {
    const finalizedOrder = {
      cartId: cart.Cart_ID,
      normalOrders: {
        orders: normalOrders,
        totalAmount: normalOrdersTotalAmount,
        paymentMethod: normalOrderPaymentMethod,
        pickupTime: normalOrderPickupTime,
      },
      preOrders: {
        orders: preOrders,
        totalAmount: preOrdersTotalAmount,
        pickupDate: preOrderPickupDate,
        pickupTime: preOrderPickupTime,
      },
    };
    navigate("/orderConfirmation", {
      state: { finalizedOrder },
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn mx-2 ${
              activeTab === "normal"
                ? "btn-primary fw-bold"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("normal")}
          >
            Normal Orders
          </button>
          <button
            className={`btn mx-2 ${
              activeTab === "pre"
                ? "btn-primary fw-bold"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("pre")}
          >
            Pre Orders
          </button>
        </div>

        <div className="container" style={{ maxWidth: "900px" }}>
          {activeTab === "normal" && (
            <div>
              <h2 className="title">Normal Orders Shopping Cart</h2>

              <div className="table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Item Image</th>
                      <th>Item Name</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(normalOrders) &&
                      normalOrders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.Image_Link}
                              alt={item.Product_Name}
                              className="cart-image"
                            />
                          </td>
                          <td>{item.Product_Name}</td>
                          <td>{item.Size}</td>
                          <td>Rs.{item.Price}</td>
                          <td>{item.Quantity}</td>
                          <td>
                            Rs.
                            {item.Price * item.Quantity}
                          </td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() =>
                                normalOrdersRemoveItem(item.Cart_Item_ID)
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="pickup-section">
                <label className="fw-bold">Pickup Time:</label>
                <input
                  type="time"
                  className="time-input"
                  value={normalOrderPickupTime}
                  onChange={(e) => setNormalOrderPickupTime(e.target.value)}
                />
              </div>

              <div className="payment-section">
                <p className="fw-bold">Payment Options:</p>
                <label>
                  <input
                    type="radio"
                    value="online"
                    checked={normalOrderPaymentMethod === "online"}
                    onChange={() => setNormalOrderPaymentMethod("online")}
                  />
                  Online Payment{" "}
                  <span className="info-text">
                    Ensure a smooth and secure transaction.
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="pickup"
                    checked={normalOrderPaymentMethod === "pickup"}
                    onChange={() => setNormalOrderPaymentMethod("pickup")}
                  />
                  Pay at Pickup
                </label>
              </div>

              {/* <button className="submit-btn">Submit</button> */}
            </div>
          )}

          {activeTab === "pre" && (
            <div>
              <h2 className="title">Pre-Orders Shopping Cart</h2>

              <div className="table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Item Image</th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(preOrders) &&
                      preOrders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.Image_Link}
                              alt={item.Product_Name}
                              className="cart-image"
                            />
                          </td>
                          <td>{item.Product_Name}</td>
                          <td>Rs.{item.Price}</td>
                          <td>{item.Quantity}</td>
                          <td>
                            Rs.
                            {item.Price * item.Quantity}
                          </td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() =>
                                preOrdersRemoveItem(item.Cart_Item_ID)
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="pickup-section">
                <label className="fw-bold">Pickup Date:</label>
                <input
                  type="date"
                  className="time-input"
                  value={preOrderPickupDate}
                  // defaultValue={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPreOrderPickupDate(e.target.value)}
                />
              </div>

              <div className="pickup-section">
                <label className="fw-bold">Pickup Time:</label>
                <input
                  type="time"
                  className="time-input"
                  value={preOrderPickupTime}
                  onChange={(e) => setPreOrderPickupTime(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="total-amount">
            Total Normal Order Amount: Rs.{normalOrdersTotalAmount.toFixed(2)}
          </div>
          <div className="total-amount">
            {" "}
            Total Pre Order Estimated Amount: Rs.
            {preOrdersTotalAmount.toFixed(2)}
          </div>
          <div className="total-amount">
            Total Amount: Rs.{totalAmount.toFixed(2)}
            <br />
            <h6>(Without Pre Order Estimation)</h6>
          </div>
          <button className="submit-btn" onClick={handleFinalizeOrder}>
            Finalize Order
          </button>
        </div>
      </div>

      <Footer />

      <style>{`
        .container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .table-container {
          max-height: 300px; 
          overflow-y: auto;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .cart-table th, .cart-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }

        .cart-table th {
          background-color: #f5f5f5;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .cart-image {
          width: 90px;
          height: 60px;
          object-fit: cover;
          border-radius: 5px;
        }

        .remove-btn {
          background-color: #6C63FF;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .remove-btn:hover {
          background-color: #5548d4;
        }

        .pickup-section {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .time-input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .payment-section {
          margin-top: 20px;
        }

        .payment-section label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .info-text {
          font-size: 12px;
          color: gray;
        }

        .total-amount {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          text-align: right;
        }

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

        .table-container::-webkit-scrollbar {
          width: 5px;
        }

        .table-container::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 10px;
        }

        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>
    </>
  );
};

export default ShoppingCart;
