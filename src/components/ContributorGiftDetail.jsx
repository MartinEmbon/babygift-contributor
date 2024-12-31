import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Checkout from "./ContributorCheckout";
import SendCongratulations from "./SendCongratulations"; // Import the new component
import "../styles/GiftDetail.css"; // Import the CSS file

const GiftDetail = ({ cart, setCart }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [gift, setGift] = useState(state?.gift || null);
  const [gifts, setGifts] = useState([]);
  const [contribution, setContribution] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

 
  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cart");
    if (cartFromStorage) {
      setCart(JSON.parse(cartFromStorage)); // Sync cart with localStorage on component load
    }
  }, [setCart]);
 
//   useEffect(() => {
//     const cartFromStorage = localStorage.getItem("cart");
//     if (cartFromStorage) {
//       setCart(JSON.parse(cartFromStorage));
//     }
//   }, [setCart]);

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
      contribution: contribution || gift.price, // Ensure contribution has a fallback value
    };
  
    // Update cart state
    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
  
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // Show checkout after adding to cart
    setShowCheckout(true);
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
      {/* Navbar with Gifts */}
      <div className="navbar">
        <div className="navbar-title">Gift Shop</div>
        <div className="navbar-gifts">
          {gifts.map((giftItem) => (
            <div
              key={giftItem.id}
              className="navbar-gift"
              onClick={() => handleSelectGift(giftItem)}
            >
              <img
                src={giftItem.imageUrl}
                alt={giftItem.name}
                className="navbar-gift-image"
              />
              <div className="navbar-gift-name">{giftItem.name}</div>
            </div>
          ))}
        </div>
        <button className="navbar-button" onClick={() => navigate("/contribute")}>
          Back to Wishlist
        </button>
      </div>

      {/* Left Side */}
      <div className="left-side">
        <div className="gift-info">
          {/* Gift Image */}
          <img
            src={gift.imageUrl}
            alt={gift.name}
            className="gift-image"
          />
          {/* Gift Info */}
          <div>
            <div className="gift-name">{gift.name}</div>
            <div className="gift-description">{gift.description}</div>
            <div className="gift-price">Price: ${gift.price}</div>
            <div className="gift-category">Category: {gift.category}</div>
            <input
              type="number"
              placeholder={`Enter amount (max $${gift.price})`}
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="gift-input"
            />
            <button className="button" onClick={handleAddToCart}>Add to Cart</button>
            <button className="button" onClick={() => navigate("/contribute")}>Go Back to Wishlist</button>
          </div>
        </div>
      </div>

      {/* Right Side - Checkout Navbar */}
      <div className="checkout-navbar">
        {showCheckout ? (
          <Checkout cart={cart} setCart={setCart} />
        ) : (
          <div>
            <div className="checkout-navbar-title">Cart</div>
            <p>Your cart is empty. Add items to proceed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftDetail;
