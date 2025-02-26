import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import MyOrdersPage from "./pages/MyOrders.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import PreOrderBakery from "./pages/PreOrderBakery.jsx";
import CardPayment from "./pages/CardPayment.jsx";

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
      </Routes>
    </Router>
  );
}

export default App;
