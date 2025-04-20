/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import {
  getCategory,
  getCategoryById,
  getProductById,
  getProductCategory,
  getProductCategoryById,
  getProductImage,
  getProductImageById,
  getProducts,
  getProductSize,
  getProductSizeById,
} from "../apis/products.js";
import { addACart, addToCartItem, getCartById } from "../apis/cart.js";
import GlobalVars from "../globalVars.js";

const PreOrderBakery = () => {
  const [user] = GlobalVars();

  const [product, setProduct] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productCategory, setProductCategory] = useState();
  const [category, setCategory] = useState();

  const [cart, setCart] = useState([]);
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
    const fetchProductCategory = async () => {
      getProductCategory(product.ProductCategory_ID)
        .then((response) => {
          setProductCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching product category:", error);
        });
    };
    fetchProductCategory();
  }, []);

  //api call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!productCategory || !category) return; // Ensure productCategory and category are defined
      getProducts()
        .then((response) => {
          const filteredProducts = response.filter((product) => {
            const eachProductCategory = productCategory.find(
              (pCategory) =>
                pCategory.ProductCategory_ID === product.ProductCategory_ID
            );
            const eachCategory = category.find(
              (cat) =>
                cat.Category_ID === eachProductCategory.Category_ID &&
                cat.Category_Name === "Pre Order"
            );
            return eachProductCategory && eachCategory;
          });
          setProduct(filteredProducts);
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
  }, [productCategory, category]);

  useEffect(() => {
    const fetchCart = async () => {
      getCartById(user.User_ID)
        .then((response) => {
          if (response === null) {
            addACart({
              User_ID: user.User_ID,
            })
              .then((response) => {
                setCart(response);
              })
              .catch((error) => {
                console.error("Error adding cart:", error);
              });
          } else {
            setCart(response);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    };
    fetchCart();
  }, []);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (product.length > 0) {
      const initialQuantities = product.reduce((acc, item) => {
        acc[item.Product_ID] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [product]);

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, prevQuantities[id] + change),
    }));
  };

  const handleAddToCart = (item) => {
    if (user) {
      const cartItem = {
        Cart_ID: cart.Cart_ID,
        Product_ID: item.Product_ID,
        Size_ID: productSize.find((size) => size.Product_ID === item.Product_ID)
          ?.Size_ID,
        Quantity: quantities[item.Product_ID],
        Category_ID: category.find((cat) => {
          const eachProductCategory = productCategory.find(
            (pCategory) =>
              pCategory.ProductCategory_ID === item.ProductCategory_ID
          );
          return (
            eachProductCategory &&
            cat.Category_ID === eachProductCategory.Category_ID
          );
        }).Category_ID,
      };
      addToCartItem(cartItem)
        .then((response) => {})
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    } else {
      alert("User not logged in. Cannot add to cart.");
    }
  };

  return (
    <>
      <Navbar />

      <h2 className="m-4 fw-bold">Pre Order Bakery Products</h2>

      <div className="border rounded p-4 shadow-sm m-2 mx-4">
        <div className="container m-2">
          <div className="row g-4">
            {Array.isArray(product) &&
              Array.isArray(productSize) &&
              Array.isArray(productImage) &&
              product.map((item) => (
                <div key={item.id} className="col-md-6">
                  <div className="card shadow-sm border-0">
                    <div className="row g-0 align-items-center">
                      <div className="col-4 text-center">
                        <img
                          src={
                            productImage.find(
                              (img) => img.Product_ID === item.Product_ID
                            )?.Image_Link
                          }
                          alt={item.Product_Name}
                          className="img-fluid rounded"
                          style={{ width: "180px", height: "130px" }}
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.Product_Name}</h5>
                          <p className="card-text text-muted">
                            {item.Product_Description}
                          </p>
                          <p className="card-text fw-semibold">
                            Price: Rs.
                            {
                              productSize.find(
                                (size) => size.Product_ID === item.Product_ID
                              )?.Price
                            }
                          </p>
                          <div className="d-flex align-items-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.Product_ID, -1)
                              }
                              className="btn btn-primary btn-sm"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control text-center mx-2"
                              style={{ width: "50px" }}
                              value={quantities[item.Product_ID]}
                              readOnly
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(item.Product_ID, 1)
                              }
                              className="btn btn-primary btn-sm"
                            >
                              +
                            </button>
                            {user && cart && (
                              <button
                                className="btn btn-primary btn-sm ms-3"
                                style={{ whiteSpace: "nowrap" }}
                                onClick={() => handleAddToCart(item)}
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreOrderBakery;
