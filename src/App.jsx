
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import MyOrdersPage from "./pages/MyOrders.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import PreOrderBakery from "./pages/PreOrderBakery.jsx";
import CardPayment from "./pages/CardPayment.jsx";
import Signup from "./pages/signup.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import OrderConfirmation1 from "./pages/OderConfirmation1.jsx";
import Product from "./pages/Product.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/myorders" element={<MyOrdersPage />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/preorderbakery" element={<PreOrderBakery />} />
        <Route path="/CardPayment" element={<CardPayment />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="/OrderConfirmation1" element={<OrderConfirmation1/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
