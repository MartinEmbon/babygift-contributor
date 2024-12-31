import React, { useState, useEffect } from "react";
import "../styles/Checkout.css"; // Add the styles here

function CartIcon({ cart }) {
  const itemCount = cart.length; // Number of items in the cart

  return (
    <div className="cart-icon-container">
      <i className="fas fa-shopping-cart cart-icon"></i>
      {itemCount > 0 && (
        <div className="cart-item-count">{itemCount}</div>
      )}
    </div>
  );
}

function Checkout({ cart, setCart }) {
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  const totalAmount = cart.reduce((sum, item) => {
    const contribution = parseFloat(item.contribution) || 0; // Fallback to 0 if contribution is not a valid number
    return sum + contribution;
  }, 0);
  return (
    <div className="checkout">
      <CartIcon cart={cart} /> {/* Display cart icon */}
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Contribution: ${item.contribution}</p>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total Contribution: ${totalAmount.toFixed(2)}</p>
          <p>
            Please transfer the total amount to the following Zelle:
            <strong> zelle@example.com</strong>
          </p>
          <p>Once you've transferred, notify the mum.</p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Checkout;
