/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Card, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import {
  getCategoryById,
  getProductById,
  getProductCategoryById,
  getProductImage,
  getProductImageById,
  getProducts,
  getProductSize,
  getProductSizeById,
} from "../apis/products.js";
import { addACart, addToCartItem, getCartById } from "../apis/cart.js";
import GlobalVars from "../globalVars.js";

const ProductPage = () => {
  const { id } = useParams();

  const [user] = GlobalVars();

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(undefined);
  const [selectedSize, setSelectedSize] = useState("Choose size");

  const [product, setProduct] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productCategory, setProductCategory] = useState();
  const [category, setCategory] = useState();

  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarProductSize, setSimilarProductSize] = useState([]);
  const [similarProductImage, setSimilarProductImage] = useState([]);

  const [cart, setCart] = useState([]);

  //api call to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      getProductById(id)
        .then((response) => {
          setProduct(response);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      getProductSizeById(id)
        .then((response) => {
          setProductSize(response);
        })
        .catch((error) => {
          console.error("Error fetching product sizes:", error);
        });

      getProductImageById(id)
        .then((response) => {
          setProductImage(response);
        })
        .catch((error) => {
          console.error("Error fetching product images:", error);
        });
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductCategory = async () => {
      if (!product) return; // Ensure product is defined
      getProductCategoryById(product.ProductCategory_ID)
        .then((response) => {
          setProductCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching product category:", error);
        });
    };
    fetchProductCategory();
  }, [product]);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!productCategory) return; // Ensure productCategory is defined
      getCategoryById(productCategory.Category_ID)
        .then((response) => {
          setCategory(response);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    };
    fetchCategory();
  }, [productCategory]);

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

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (user) {
      const cartItem = {
        Cart_ID: cart.Cart_ID,
        Product_ID: product.Product_ID,
        Size_ID: selectedSize.Size_ID || productSize[0]?.Size_ID,
        Quantity: quantity,
        Category_ID: category.Category_ID,
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

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!productCategory) return; // Ensure productCategory is defined
      getProducts()
        .then((response) => {
          // Filter products based on the same category
          const filteredProducts = response.filter(
            (item) =>
              item.ProductCategory_ID === productCategory.ProductCategory_ID
          );
          setSimilarProducts(filteredProducts);
        })
        .catch((error) => {
          console.error("Error fetching similar products:", error);
        });

      getProductSize()
        .then((response) => {
          setSimilarProductSize(response);
        })
        .catch((error) => {
          console.error("Error fetching product sizes:", error);
        });

      getProductImage()
        .then((response) => {
          setSimilarProductImage(response);
        })
        .catch((error) => {
          console.error("Error fetching product images:", error);
        });
    };
    fetchSimilarProducts();
  }, [productCategory]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Row>
          {/* Left Side - Product Images */}
          <Col md={5}>
            <Row>
              <Col xs={3} className="d-flex flex-column align-items-center">
                {Array.isArray(productImage) &&
                  productImage.map((img, index) => (
                    <Image
                      key={index}
                      src={img.Image_Link}
                      className="mb-2 cursor-pointer"
                      thumbnail
                      onClick={() => setMainImage(img.Image_Link)}
                    />
                  ))}
              </Col>
              <Col xs={9}>
                <Image
                  src={mainImage || productImage[0]?.Image_Link}
                  width="800"
                  height="820"
                  alt="Main Product"
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Col>

          {/* Right Side - Product Details */}
          <Col md={7}>
            <h3>{product.Product_Name}</h3>
            <p>Category: {category && category.Category_Name}</p>
            {/* <p>Category: {category.Category_Name}</p> */}
            <h4 className="text-primary">
              Rs {selectedSize.Price || productSize[0]?.Price}
            </h4>

            {/* Choose Size Dropdown */}
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="secondary">
                {selectedSize.Size || productSize[0]?.Size || "Choose size"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Array.isArray(productSize) &&
                  productSize.map((size, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.Size}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Quantity Controls */}
            <div className="mb-3">
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </Button>
            </div>

            {/* Description */}
            <p>{product.Product_Description || "Product description."}</p>

            {/* Add to Cart Button */}
            {user && cart && (
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                Add to Cart
              </Button>
            )}
          </Col>
        </Row>

        {/* Related Products */}
        <h5 className="mt-5 mb-4">Related products</h5>
        <Row>
          {Array.isArray(similarProducts) &&
            Array.isArray(similarProductSize) &&
            Array.isArray(similarProductImage) &&
            similarProducts.map((item, index) => (
              <Col sm={3} key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      similarProductImage.find(
                        (img) => img.Product_ID === item.Product_ID
                      )?.Image_Link
                    }
                    width="250"
                    height="280"
                  />
                  <Card.Body>
                    <Card.Title>{item.Product_Name}</Card.Title>
                    <Card.Text>
                      {
                        similarProductSize.find(
                          (size) => size.Product_ID === item.Product_ID
                        )?.Size
                      }
                    </Card.Text>
                    <Card.Text>
                      Rs:{" "}
                      {similarProductSize.find(
                        (size) => size.Product_ID === item.Product_ID
                      )?.Price || "Rs.0.00"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
