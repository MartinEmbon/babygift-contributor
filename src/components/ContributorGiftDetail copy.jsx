import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Checkout from "./ContributorCheckout";
import SendCongratulations from "./SendCongratulations"; // Import the new component

import "../styles/GiftDetail.css";

function GiftDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [gift, setGift] = useState(state?.gift || null);
  const [gifts, setGifts] = useState([]);
  const [contribution, setContribution] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Fetch Wishlist (Gifts)
  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      axios
        .get("https://us-central1-baby-gift-project.cloudfunctions.net/get-wishlist", {
          params: { email },
        })
        .then((response) => {
          if (response.data && response.data[0] && response.data[0].items) {
            setGifts(response.data[0].items);
          } else {
            setGifts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
          setGifts([]);
        });
    } else {
      setGifts([]);
    }
  }, []);

  const handleAddToCart = () => {
    const cartItem = {
      ...gift,
      contribution: contribution || gift.price,
    };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added to cart!");
  };

  const handleSelectGift = (selectedGift) => {
    setGift(selectedGift);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (!gift) return <div>Loading...</div>;

  return (
    <div className="gift-detail-container">
  <nav className="navbar">
  <h1 className="navbar-title">Gift Shop</h1>
  <div className="navbar-gifts">
    {gifts.map((giftItem) => (
      <div
        key={giftItem.id}
        className="navbar-gift"
        onClick={() => handleSelectGift(giftItem)}
      >
        <img src={giftItem.imageUrl} alt={giftItem.name} className="navbar-gift-image" />
        <p className="navbar-gift-name">{giftItem.name}</p>
      </div>
    ))}
  </div>
  <button className="navbar-button" onClick={() => navigate("/cart")}>
    View Cart
  </button>
</nav>



     {/* Left Side */}
<div className="gift-detail-left">
  <div className="gift-detail-info">
    {/* Gift Image on the left */}
    <div className="gift-detail-image-container">
      <img src={gift.imageUrl} alt={gift.name} className="gift-detail-image" />
    </div>

    {/* Gift Info on the right */}
    <div className="gift-detail-text">
      <h2 className="gift-detail-name">{gift.name}</h2>
      <p className="gift-detail-description">{gift.description}</p>
      <p className="gift-detail-price">Price: ${gift.price}</p>
      <p className="gift-detail-category">Category: {gift.category}</p>
      <input
        type="number"
        placeholder={`Enter amount (max $${gift.price})`}
        value={contribution}
        className="gift-detail-input"
        onChange={(e) => setContribution(e.target.value)}
      />
      <button className="gift-detail-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button className="gift-detail-button primary" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  </div>

  {/* Send Congratulations Component */}
  {/* <div className="send-congratulations-container">
    <SendCongratulations />
  </div> */}
</div>
      
      {/* Right Side - Vertical Navbar */}
      <div className="checkout-navbar">
        {showCheckout ? (
          <Checkout cart={cart} setCart={setCart} />
        ) : (
          <div>
            <h3>Cart</h3>
            <p>Your cart is empty. Add items to proceed.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GiftDetail;
