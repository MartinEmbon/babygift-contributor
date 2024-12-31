import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css"; // Import the CSS file

function Wishlist() {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

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

  const handleGiftClick = (gift) => {
    navigate(`/gift/${gift.id}`, { state: { gift } });
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">
        {gifts.length > 0 ? "Gift Wishlist" : "No Gifts in Wishlist"}
      </h2>
      <div className="gift-grid">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="gift-card"
            onClick={() => handleGiftClick(gift)}
          >
            <img src={gift.imageUrl} alt={gift.name} className="gift-image" />
            <div className="gift-details">
              <h3 className="gift-name">{gift.name}</h3>
              <p className="gift-description">{gift.description}</p>
              <p className="gift-price">${gift.price}</p>
              <p className="gift-category">Category: {gift.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
