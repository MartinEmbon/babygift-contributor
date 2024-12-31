import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// New contributor components
import ContributorLogin from "./components/ContributorLogin";
import ContributorWishlist from "./components/ContributorWishlist";
import GiftDetail from "./components/ContributorGiftDetail";
import Checkout from "./components/ContributorCheckout";
import Navbar from "./components/Navbar";

function App() {
  const [isContributorLoggedIn, setIsContributorLoggedIn] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCheckout, setShowCheckout] = useState(false); // Manage showCheckout here

  // Check login status on component mount (e.g., page reload)
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isContributorLoggedIn");
    if (savedLoginStatus === "true") {
      setIsContributorLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all pages */}
      <Routes>
        <Route
          path="/contributor-login"
          element={isContributorLoggedIn ? <Navigate to="/contribute" /> : <ContributorLogin setIsContributorLoggedIn={setIsContributorLoggedIn} />}
        />
        <Route
          path="/contribute"
          element={isContributorLoggedIn ? <ContributorWishlist cart={cart} setCart={setCart} setShowCheckout={setShowCheckout} /> : <Navigate to="/contributor-login" />}
        />
        <Route
          path="/gift/:id"
          element={<GiftDetail cart={cart} setCart={setCart} setShowCheckout={setShowCheckout} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
